#!/usr/bin/env python3
"""Add Zoho DKIM and DMARC TXT records to farmsandextracts.com via the Namecheap API.

WHY THIS IS WRITTEN THE WAY IT IS
---------------------------------
Namecheap's `namecheap.domains.dns.setHosts` call is REPLACE-ALL: it overwrites
the domain's entire host-record set with whatever you submit. Submitting only the
two new records would therefore DELETE every existing record (MX, website A/CNAME,
the Zoho verification TXT, etc.) and break mail + the site.

To stay safe, this script:
  1. Reads the current records with `getHosts`.
  2. Merges in the DKIM + DMARC TXT records (idempotent: updates a matching
     host/type in place, or appends if absent; skips if already identical).
  3. Writes the FULL set back with `setHosts`, preserving the account EmailType.

It never issues a standalone delete and, in --dry-run, makes no changes at all.

REQUIRED ENVIRONMENT VARIABLES
------------------------------
  NC_API_USER      Namecheap API user (your account username)
  NC_API_KEY       Namecheap API key  (Profile -> Tools -> Namecheap API Access)
  NC_USERNAME      Namecheap account username (usually same as NC_API_USER)
  NC_CLIENT_IP     The PUBLIC IPv4 you have whitelisted in Namecheap API settings
  ZOHO_DKIM_VALUE  The DKIM TXT value Zoho gives you. Either the full value
                     "v=DKIM1; k=rsa; p=MIGfMA0GCSq..."
                   or just the bare public key starting with "MIG..." (the script
                   will wrap it as v=DKIM1; k=rsa; p=<key>).

OPTIONAL
--------
  NC_API_BASE   API endpoint. Default: https://api.namecheap.com/xml.response
                For testing use: https://api.sandbox.namecheap.com/xml.response
  DRY_RUN=1     Preview the merged record set; do NOT write anything.

USAGE
-----
  DRY_RUN=1 python3 scripts/add-email-dns-records.py     # preview only
  python3 scripts/add-email-dns-records.py               # apply changes

NOTE: Namecheap API access requires an eligible account (e.g. 20+ domains, or
$50+ balance / spend) and that NC_CLIENT_IP is whitelisted. See:
https://www.namecheap.com/support/api/intro/
"""

from __future__ import annotations

import os
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

# --- target domain / records -------------------------------------------------

DOMAIN = "farmsandextracts.com"
SLD, TLD = DOMAIN.split(".", 1)  # "farmsandextracts", "com"

DMARC_HOST = "_dmarc"
DMARC_VALUE = (
    "v=DMARC1; p=quarantine; pct=100; rua=mailto:affo@farmsandextracts.com"
)

DKIM_HOST = "zoho._domainkey"

DEFAULT_API_BASE = "https://api.namecheap.com/xml.response"
NC_NS = "{http://api.namecheap.com/xml.response}"  # Namecheap XML namespace


# --- small helpers -----------------------------------------------------------

def die(msg: str, code: int = 1) -> "None":
    print(f"ERROR: {msg}", file=sys.stderr)
    sys.exit(code)


def require_env() -> dict:
    """Collect and validate required configuration from the environment."""
    cfg = {
        "api_user": os.environ.get("NC_API_USER", "").strip(),
        "api_key": os.environ.get("NC_API_KEY", "").strip(),
        "username": os.environ.get("NC_USERNAME", "").strip(),
        "client_ip": os.environ.get("NC_CLIENT_IP", "").strip(),
        "dkim_value": os.environ.get("ZOHO_DKIM_VALUE", "").strip(),
        "api_base": os.environ.get("NC_API_BASE", DEFAULT_API_BASE).strip(),
        "dry_run": os.environ.get("DRY_RUN", "").strip() not in ("", "0", "false", "False"),
    }
    missing = [
        name
        for name, key in (
            ("NC_API_USER", "api_user"),
            ("NC_API_KEY", "api_key"),
            ("NC_USERNAME", "username"),
            ("NC_CLIENT_IP", "client_ip"),
            ("ZOHO_DKIM_VALUE", "dkim_value"),
        )
        if not cfg[key]
    ]
    if missing:
        die(
            "missing required environment variable(s): "
            + ", ".join(missing)
            + "\nSee the docstring at the top of this file for details.",
            code=2,
        )

    # Accept either the full DKIM value or a bare public key.
    if not cfg["dkim_value"].lower().startswith("v=dkim1"):
        cfg["dkim_value"] = "v=DKIM1; k=rsa; p=" + cfg["dkim_value"]

    return cfg


def strip_ns(tag: str) -> str:
    return tag[len(NC_NS):] if tag.startswith(NC_NS) else tag


def nc_call(cfg: dict, command: str, extra: dict) -> ET.Element:
    """Make a Namecheap API GET call; return the parsed root element or die."""
    params = {
        "ApiUser": cfg["api_user"],
        "ApiKey": cfg["api_key"],
        "UserName": cfg["username"],
        "ClientIp": cfg["client_ip"],
        "Command": command,
    }
    params.update(extra)
    url = cfg["api_base"] + "?" + urllib.parse.urlencode(params)
    try:
        with urllib.request.urlopen(url, timeout=30) as resp:
            raw = resp.read()
    except Exception as exc:  # network / HTTP error
        die(f"{command}: request failed: {exc}")

    try:
        root = ET.fromstring(raw)
    except ET.ParseError as exc:
        die(f"{command}: could not parse API response: {exc}\n{raw[:500]!r}")

    if root.attrib.get("Status") != "OK":
        errs = root.find(f"{NC_NS}Errors")
        detail = "; ".join(
            (e.text or "").strip() for e in (errs or [])
        ) or "unknown error"
        die(f"{command}: API returned an error: {detail}")
    return root


def get_hosts(cfg: dict):
    """Return (records, email_type). records: list of dicts with the keys
    HostName, RecordType, Address, MXPref, TTL."""
    root = nc_call(
        cfg,
        "namecheap.domains.dns.getHosts",
        {"SLD": SLD, "TLD": TLD},
    )
    result = root.find(f"{NC_NS}CommandResponse/{NC_NS}DomainDNSGetHostsResult")
    if result is None:
        die("getHosts: unexpected response shape (no DomainDNSGetHostsResult)")

    email_type = result.attrib.get("EmailType", "MX")
    records = []
    for host in result:
        if strip_ns(host.tag) != "host":
            continue
        records.append(
            {
                "HostName": host.attrib.get("Name", ""),
                "RecordType": host.attrib.get("Type", ""),
                "Address": host.attrib.get("Address", ""),
                "MXPref": host.attrib.get("MXPref", "10"),
                "TTL": host.attrib.get("TTL", "1800"),
            }
        )
    return records, email_type


def upsert(records: list, host: str, value: str) -> str:
    """Insert or update a TXT record. Returns 'added' | 'updated' | 'unchanged'."""
    for r in records:
        if r["RecordType"].upper() == "TXT" and r["HostName"].lower() == host.lower():
            if r["Address"] == value:
                return "unchanged"
            r["Address"] = value
            return "updated"
    records.append(
        {"HostName": host, "RecordType": "TXT", "Address": value, "MXPref": "10", "TTL": "1800"}
    )
    return "added"


def set_hosts(cfg: dict, records: list, email_type: str) -> None:
    extra = {"SLD": SLD, "TLD": TLD, "EmailType": email_type}
    for i, r in enumerate(records, start=1):
        extra[f"HostName{i}"] = r["HostName"]
        extra[f"RecordType{i}"] = r["RecordType"]
        extra[f"Address{i}"] = r["Address"]
        extra[f"MXPref{i}"] = r["MXPref"]
        extra[f"TTL{i}"] = r["TTL"]
    root = nc_call(cfg, "namecheap.domains.dns.setHosts", extra)
    result = root.find(f"{NC_NS}CommandResponse/{NC_NS}DomainDNSSetHostsResult")
    ok = result is not None and result.attrib.get("IsSuccess", "").lower() == "true"
    if not ok:
        die("setHosts: API did not report success")


def main() -> None:
    cfg = require_env()

    print(f"Fetching current DNS records for {DOMAIN} ...")
    records, email_type = get_hosts(cfg)
    print(f"  found {len(records)} existing record(s); EmailType={email_type}")

    actions = {
        DKIM_HOST: upsert(records, DKIM_HOST, cfg["dkim_value"]),
        DMARC_HOST: upsert(records, DMARC_HOST, DMARC_VALUE),
    }
    for host, action in actions.items():
        print(f"  {host}: {action}")

    print(f"\nFinal record set ({len(records)} records):")
    for r in records:
        addr = r["Address"]
        shown = addr if len(addr) <= 70 else addr[:67] + "..."
        print(f"  {r['RecordType']:>6}  {r['HostName']:<22}  {shown}")

    if all(a == "unchanged" for a in actions.values()):
        print("\nNothing to do — both records already present and identical.")
        return

    if cfg["dry_run"]:
        print("\nDRY_RUN set — no changes written. Re-run without DRY_RUN to apply.")
        return

    print("\nWriting full record set back to Namecheap (setHosts) ...")
    set_hosts(cfg, records, email_type)
    print("Done. Allow time for DNS propagation, then verify with:")
    print(f"  dig +short TXT {DKIM_HOST}.{DOMAIN}")
    print(f"  dig +short TXT {DMARC_HOST}.{DOMAIN}")


if __name__ == "__main__":
    main()
