import { useState } from 'react'
import { sendContactMessage, isContactConfigured } from './lib/contact'

// ---------------------------------------------------------------------------
// Site content. Everything a non-developer might want to edit lives in these
// arrays/constants — copy, products, capabilities, publications, links.
// Replace placeholder values (marked "replace") with real company records.
// ---------------------------------------------------------------------------

const COMPANY = {
  name: 'Farms & Extracts 46',
  short: 'F&E 46',
  tagline: 'Ghanaian phytochemical extraction & natural products',
  email: 'affo@farmsandextracts.com',
  phone: '+233 53042 4351',
  address: 'W443 Venus Street, Shai Hills',
  location: 'Accra, Ghana, West Africa',
}

const NAV_LINKS = [
  { label: 'Products', href: '#products' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Quality', href: '#quality' },
  { label: 'About', href: '#about' },
  { label: 'Science', href: '#science' },
  { label: 'Contact', href: '#contact' },
]

// Headline trust metrics shown under the hero. Replace numbers with real ones.
const STATS = [
  { value: 'Farm → Extract', label: 'Fully vertically integrated supply' },
  { value: 'Traceable', label: 'Lot-level traceability to source farms' },
  { value: 'Science-led', label: 'PhD-led extraction & analytical chemistry' },
  { value: 'Ghana', label: 'Rooted in West African botanicals' },
]

// The four stages of the farm-to-extract pipeline.
const PIPELINE = [
  {
    step: '01',
    title: 'Cultivation',
    body: 'Cultivation and ethical wild-collection of West African botanicals — including Thaumatococcus daniellii and Synsepalum dulcificum — with managed grower networks and agronomic support.',
    icon: 'sprout',
  },
  {
    step: '02',
    title: 'Extraction & Processing',
    body: 'Optimised, food-grade extraction and downstream processing that converts raw plant material into stable, high-purity actives at consistent yield.',
    icon: 'flask',
  },
  {
    step: '03',
    title: 'Bulk Extracts',
    body: 'Standardised bulk botanical extracts and ingredients supplied to formulators and manufacturers, with specifications and certificates of analysis.',
    icon: 'drum',
  },
  {
    step: '04',
    title: 'Finished Products',
    body: 'Finished natural products — sweeteners, taste modifiers and wellness ingredients — taken from extract to market-ready format.',
    icon: 'package',
  },
]

// Product / ingredient catalogue. Replace specs and statuses with real data.
const PRODUCTS = [
  {
    name: 'Miracle Berry Extract',
    source: 'Synsepalum dulcificum',
    tag: 'Bulk extract',
    status: 'Available',
    wide: true,
    sideImages: [
      { src: '/images/s-dulcificum-fruits.jpeg', alt: 'Synsepalum dulcificum fruits on the branch', caption: 'S. dulcificum fruits' },
      { src: '/images/s-dulcificum-fresh-berries.jpeg', alt: 'Freshly harvested miracle berries', caption: 'Fresh miracle berries' },
      { src: '/images/miraculin-powder.jpeg', alt: 'Miraculin powder extracted from the fruit', caption: 'Miraculin powder' },
    ],
    body: [
      'Miraculin is a taste-modifying glycoprotein — a homodimeric, glycosylated protein of 191 amino acid residues — extracted exclusively from the pulp of Synsepalum dulcificum (Miracle Berry). Virtually tasteless at neutral pH, it acts as a highly specific, pH-dependent taste modifier: under acidic conditions it activates the human sweet taste receptors (T1R2/T1R3), temporarily converting sour and acidic flavours into intense sweetness for up to 90 minutes — without adding any sugar or calories.',
      'The fruit powder is also rich in antioxidants, polyphenols and flavonoids, with demonstrated benefits in reducing oxidative stress and increasing insulin sensitivity — making it a candidate ingredient for diabetes management formulations.',
      {
        heading: 'Oncology support — chemotherapy dysgeusia',
        text: 'Miraculin has attracted clinical interest from leading institutions including the American Society of Clinical Oncology (ASCO) and Memorial Sloan Kettering Cancer Center for the management of chemotherapy-induced dysgeusia. By masking aversive sourness and clearing the persistent metallic taste (“metal-mouth”) reported during treatment, it restores the palatability of everyday meals — supporting food intake and weight stability in patients prone to food aversion and malnutrition. In a triple-blind, placebo-controlled pilot trial, localised supplementation with dried miracle berry pulp produced noticeable taste improvements in over 30% of chemotherapy patients within two weeks, with several reporting the complete disappearance of metallic tastes.',
      },
      {
        heading: 'Natural sugar reduction',
        text: 'With public health bodies such as the WHO advising that free sugars be kept below 10% of daily energy intake, miraculin offers a natural alternative to synthetic non-nutritive sweeteners and their associated aftertastes and metabolic concerns. As a natural hypo-palatable diet enhancer, it raises consumer acceptance of nutrient-dense but sharp, bitter or acidic foods — tart fruits, dark leafy vegetables and unsweetened yoghurts — by converting their native organic acids into localised sweetness with no glycaemic load.',
      },
      {
        heading: 'Pharmaceutical & beverage masking',
        text: 'The same mechanism makes miraculin a natural masking agent for oral pharmaceuticals and functional beverages. Once the tongue is coated, acidic or bitter active ingredients within an optimal pH window of roughly 4.8–6.5 are perceived as sweet rather than aversive — valuable for paediatric suspensions, sour liquid medicines and chewable tablets.',
      },
      {
        heading: 'Formulation & stability',
        text: 'Miraculin is highly thermolabile, denaturing above 100°C, and is inactivated at extreme pH (below 3 or above 12). It is therefore best suited to raw, cold-processed, freeze-dried or chitosan-coated protective delivery systems rather than baked goods or heavily pasteurised processes.',
      },
      {
        heading: 'Regulatory status',
        text: 'In the United States, cultivating, selling and consuming raw miracle berries is legal, but concentrated miraculin extract has been treated as an unapproved food additive since the late 1970s and is not Generally Recognised as Safe (GRAS) — commercial use as a food ingredient requires a Food Additive Petition. In the European Union, the European Commission authorised Dried Miracle Berries (the freeze-dried fruit pulp) as a Novel Food in December 2021 under Regulation (EU) 2015/2283, with defined maximum-use limits for food supplements.',
      },
    ],
    applications:
      'Natural taste modification, sugar-reduction reformulation, nutraceuticals, oncology nutritional support, anti-diabetic formulations, pharmaceutical taste-masking, functional foods and beverages.',
  },
  {
    name: 'Thaumatin',
    source: 'Thaumatococcus daniellii (Asowa)',
    tag: 'Bulk extract',
    status: 'Available',
    body: [
      'Thaumatin is an ultra-high-intensity, low-glycaemic natural sweetening protein extracted from the fruit aril of Thaumatococcus daniellii (Asowa, also known as katemfe). At up to 2,000–3,000 times sweeter than sucrose, it is among the most potent natural sweeteners known — yet contributes negligible calories and has minimal impact on blood glucose.',
      {
        heading: 'Multi-functional sensory profile',
        text: 'Beyond sweetness, thaumatin is a highly versatile sensory ingredient that works at parts-per-million levels: it acts as a potent masking agent for bitterness and off-notes, a flavour modifier that lifts and rounds existing profiles, and a mouthfeel enhancer that restores body lost when sugar or fat is removed.',
      },
      {
        heading: 'Thermal & chemical stability',
        text: 'A rigid molecular architecture — 16 conserved cysteine residues forming 8 internal disulfide bonds — gives thaumatin exceptional thermal and chemical stability. It withstands heat and pH extremes that denature most other sweet proteins, making it well suited to industrial baking and other hot-processed applications.',
      },
      {
        heading: 'Sodium & MSG reduction',
        text: 'In savoury formulations thaumatin dramatically lowers the monosodium glutamate (MSG) required to achieve a target umami intensity, and it masks the sharp metallic aftertaste of potassium chloride (KCl) — a key enabler for clean-label, low-sodium reformulation.',
      },
      {
        heading: 'Industrial production',
        text: 'To overcome the supply constraints of wild katemfe fruit, production is shifting toward precision fermentation platforms using microbial hosts such as Pichia pastoris and Saccharomyces cerevisiae, providing a scalable, consistent and animal-free route to food-grade thaumatin.',
      },
    ],
    applications: [
      'Dairy and non-dairy products',
      'Confectionery — hard candies, chocolates, and gummies (enhances mint, berry, and citrus flavours)',
      'Combines with polyols and high-intensity sweeteners to deliver a sugar-like taste profile',
      'Reduces salt perception in savoury products',
      'Masks astringency and bitterness in low-fat yoghurt and soya-based desserts',
    ],
    photos: [
      { src: '/images/t-danielli-fruits.jpeg', alt: 'Freshly harvested Asowa (Thaumatococcus daniellii) fruits', caption: 'Whole fruits' },
      { src: '/images/t-danielli-arils.jpeg', alt: 'Asowa arils', caption: 'Arils' },
      { src: '/images/t-danielli-seed-with-aril.jpeg', alt: 'Asowa seed with aril', caption: 'Seed with aril' },
      { src: '/images/t-danielli-seed-black-and-aril-white.jpeg', alt: 'Asowa seed (black) and aril (white)', caption: 'Seed & aril, separated' },
    ],
  },
  {
    name: 'Voacanga africana',
    source: 'Voacanga africana (Wild Frangipani)',
    tag: 'Raw material',
    status: 'Available for bulk enquiry',
    photos: [
      { src: '/images/ibogaine-hydrochloride.jpeg', alt: 'Ibogaine hydrochloride', caption: 'Ibogaine hydrochloride' },
      { src: '/images/voacangine.jpeg', alt: 'Voacangine', caption: 'Voacangine' },
      { src: '/images/voacanga-fruits.jpeg', alt: 'Voacanga africana fruits', caption: 'Voacanga fruits' },
      { src: '/images/voacanga-seeds.jpeg', alt: 'Voacanga africana seeds', caption: 'Voacanga seeds' },
    ],
    body: [
      'Voacanga africana is a premier industrial botanical powerhouse whose root bark and seeds serve as abundant, sustainable natural scaffolds for high-value pharmaceutical semi-synthesis, yielding two distinct alkaloid fractions from different plant parts.',
      {
        heading: 'Root bark — voacangine → ibogaine',
        text: 'The root and stem bark are the source of voacangine, the primary global precursor for the semi-synthesis of ibogaine hydrochloride (ibogaine HCl). This route is an ecologically viable, scalable alternative to direct extraction, preventing the over-harvesting of the endangered Tabernanthe iboga.',
      },
      {
        heading: 'Conversion chemistry',
        text: 'Voacangine is converted to ibogaine by base-catalysed saponification to a voacangic acid intermediate, followed by thermal, acid-catalysed decarboxylation that removes the C-16 carbomethoxy group to yield highly pure, clinical-grade ibogaine. Yields are further multiplied by acid-mediated cleavage of the major bark dimers — voacamine and voacamidine — releasing additional monomeric voacangine.',
      },
      {
        heading: 'Seeds — tabersonine → vinpocetine',
        text: 'The seeds are the near-exclusive source of tabersonine, the industrial starting material for the commercial synthesis of vincamine and, subsequently, vinpocetine (ethyl apovincaminate).',
      },
      {
        heading: 'Vinpocetine — clinical applications',
        text: 'Vinpocetine is a potent neuroprotective and nootropic agent used to optimise cerebral blood flow, support recovery from acute ischaemic stroke, selectively inhibit PDE1A, and mitigate age-related cognitive decline.',
      },
    ],
    applications:
      'Ibogaine semi-synthesis, vinpocetine and vincamine manufacture, nootropic ingredient supply, addiction-treatment research, pharmaceutical alkaloid extraction.',
    supplyForm: 'Dried seeds, root bark, crude alkaloid extract.',
  },
  {
    name: '5-HTP',
    source: 'Griffonia simplicifolia',
    tag: 'Bulk extract',
    status: 'Available',
    photos: [
      { src: '/images/griffonia-seeds.jpeg', alt: 'Griffonia simplicifolia seeds', caption: 'Griffonia seeds' },
      { src: '/images/griffonia-fruits.jpeg', alt: 'Griffonia simplicifolia fruits', caption: 'Griffonia fruits' },
    ],
    body: [
      'Griffonia simplicifolia seeds are a premier neurological botanical and the natural source of (L)-5-Hydroxytryptophan (5-HTP) — the immediate, direct chemical precursor to the neurotransmitter serotonin (5-HT) and, downstream, to the circadian hormone melatonin.',
      {
        heading: 'Metabolic advantage',
        text: 'Unlike L-tryptophan, 5-HTP crosses the blood-brain barrier without competing for an active molecular transporter, and it bypasses tryptophan hydroxylase — the rate-limiting enzyme of serotonin synthesis — entirely. This allows it to elevate central nervous system serotonin efficiently and reliably.',
      },
      {
        heading: 'Health applications',
        text: 'These properties underpin a broad, multi-functional health profile: natural support for mood regulation (anxiety and depression), improved sleep architecture (deepening REM sleep cycles), appetite and satiety control to support weight management, and the mitigation of central pain sensitisation in conditions such as migraine and fibromyalgia.',
      },
      {
        heading: 'Emerging pharmaceutical research',
        text: 'Recent research is expanding into the plant-derived immunomodulatory properties of Griffonia extracts — notably using high-power ultrasonic extraction techniques to concentrate active fractions targeting localised tissue inflammation.',
      },
      {
        heading: 'Sustainable supply chain',
        text: 'West African wildcrafted seed harvesting — across Ghana, Côte d’Ivoire and Liberia — is the exclusive global commercial source of raw material for value-added 5-HTP isolation, placing responsible sourcing at the centre of the supply chain.',
      },
    ],
    applications:
      'Mood and stress support, sleep and melatonin support, appetite/weight management, pain-modulation formulations, nutraceuticals and dietary supplements.',
  },
  {
    name: 'Pentadiplandra brazzeana',
    source: 'Pentadiplandra brazzeana (Oubli)',
    tag: 'Bulk supply',
    status: 'Available',
    photos: [
      { src: '/images/pentadiplandra-berries.jpeg', alt: 'Pentadiplandra brazzeana berries', caption: 'Pentadiplandra berries' },
    ],
    body: [
      'Pentadiplandra brazzeana is a rare West African climbing plant whose fruit contains Brazzein — a sweet protein 500 to 2,000 times sweeter than sucrose by weight, with zero calories. Major food manufacturers including Coca-Cola, PepsiCo and Nestlé have invested in Brazzein research for calorie-reduction strategies in mainstream products. Supply is extremely limited globally due to the difficulty of obtaining it from its natural source; Farms & Extracts 46 sources fresh ripe berries from West and Central Africa.',
      {
        heading: 'Metabolic disease support',
        text: 'As a non-glycaemic sweetener that is not metabolised like sugar, Brazzein delivers intense sweetness without raising blood glucose or disrupting the gut microbiome. This positions it as a sugar substitute for the dietary management of metabolic conditions such as metabolic dysfunction-associated steatotic liver disease (MASLD) and diabetes, where free-sugar reduction is central to treatment.',
      },
      {
        heading: 'Physicochemical robustness',
        text: 'Four internal disulfide bonds lock Brazzein into a compact, exceptionally stable fold, keeping it active up to 85°C and across a wide pH range (around pH 2–8). This robustness makes it superior to most natural sweeteners for hot processing — baking, cooking and beverage pasteurisation — where thermolabile proteins would denature and lose their sweetness.',
      },
      {
        heading: 'Engineered sweetness',
        text: 'Site-directed mutants further amplify potency: a H31R/E36D/E41A triple substitution has been shown to increase sweetness up to 22,500 times that of sucrose, enabling vanishingly small use levels in finished formulations.',
      },
      {
        heading: 'Precision fermentation & scaling',
        text: 'Because natural supply is limited, Brazzein is increasingly produced by precision fermentation in engineered microbial hosts — including Trichoderma reesei (reported titres around 1.3 g/L) and Pichia pastoris — providing a scalable, animal-free route to consistent, food-grade protein.',
      },
    ],
    applications:
      'Natural low-calorie sweetener, sugar-reduction reformulation, functional beverages, hot-processed and baked foods, nutraceuticals, pharmaceutical formulations, sweetener blending.',
  },
  {
    name: 'Kombo Butter',
    source: 'Pycnanthus angolensis (African Nutmeg)',
    tag: 'Bulk butter',
    status: 'Available',
    photos: [
      { src: '/images/kombo-butter.jpeg', alt: 'Kombo Butter from Pycnanthus angolensis', caption: 'Kombo Butter' },
    ],
    body: 'Kombo Butter is a rare unrefined seed fat extracted from Pycnanthus angolensis, native to the tropical forests of Ghana and West Central Africa. Rich in myristoleic acid (approximately 23%), it is one of the few vegetable sources of this bioactive fatty acid, known for its anti-inflammatory, anti-arthritic, and hypoglycaemic properties. The butter also contains kombic acid and sargaquinoic acid — terpenoid quinones with promising antioxidant and anticancer activity under active pharmaceutical research. Deep chocolate-brown in colour with a characteristic nutty aroma, it absorbs quickly without a greasy residue, making it ideal for premium cosmetic formulations.',
    applications:
      'Skincare and body care formulations, anti-inflammatory balms and muscle relief products, pharmaceutical research, soap making, aromatherapy.',
  },
  {
    name: 'Hibiscus Seed Oil',
    source: 'Hibiscus sabdariffa (Roselle)',
    tag: 'Cold pressed oil',
    status: 'Available',
    body: 'Hibiscus sabdariffa seed oil is cold-pressed from the seeds of the Roselle plant, yielding a lightweight oil rich in essential fatty acids and antioxidants. Highly valued in cosmetics for its moisturising, anti-aging, and skin-conditioning properties. Absorbs rapidly without a greasy residue — ideal for facial serums, body oils, hair treatments, and cleansers. Also used in nutraceutical and pharmaceutical formulations for cardiovascular and metabolic health support.',
    applications:
      'Facial serums, body butters, hair care, cleansers, nutraceuticals, pharmaceutical ingredient supply.',
  },
  {
    name: 'Custom Botanical Extracts',
    source: 'West African medicinal plants',
    tag: 'Made to order',
    status: 'Enquire',
    body: 'Targeted extraction of bioactive compounds from a range of indigenous botanicals, developed to your specification and purity requirements.',
  },
  {
    name: 'Raw & Dried Botanicals',
    source: 'Cultivated & sustainably collected',
    tag: 'Raw material',
    status: 'Available',
    body: 'Traceable raw and dried plant material supplied in bulk to extractors, researchers and manufacturers across the value chain.',
  },
  {
    name: 'Moringa Leaf Extract',
    source: 'Moringa oleifera',
    tag: 'Bulk extract',
    status: 'Available',
    body: 'Rich in vitamins, minerals and antioxidants for nutraceutical and wellness applications.',
  },
  {
    name: 'Shea Butter',
    source: 'Vitellaria paradoxa (northern Ghana)',
    tag: 'Raw material',
    status: 'Available',
    body: 'Cold-pressed, unrefined shea butter from northern Ghana. Available in food and cosmetic grade.',
  },
  {
    name: 'Baobab Extract',
    source: 'Adansonia digitata',
    tag: 'Bulk extract',
    status: 'Available',
    body: 'High vitamin C content, available as a powder from sustainably harvested fruits.',
  },
  {
    name: 'Neem Extract',
    source: 'Azadirachta indica',
    tag: 'Bulk extract',
    status: 'Available',
    body: 'Standardised azadirachtin content. Available for agricultural and pharmaceutical use.',
  },
  {
    name: 'Cocoa Polyphenols',
    source: 'Theobroma cacao (Ghana cocoa)',
    tag: 'Bulk extract',
    status: 'Available',
    body: 'Extracted from Ghana cocoa beans. High flavonoid content for nutraceutical applications.',
  },
]

// Raw & dried botanicals catalogued for bulk supply. `flag` adds a restricted-
// access warning tag (e.g. controlled pharmaceutical precursors).
const RAW_INVENTORY = [
  {
    name: 'Phyllanthus niruri',
    common: 'Stonebreaker / Chanca Piedra',
    part: 'Whole herb',
    context:
      'Preferred by urological supplement formulators for disrupting kidney stone aggregation.',
  },
  {
    name: 'Tetrapleura tetraptera',
    common: 'Prekese / Aidan Fruit',
    part: 'Dried pods / fruits',
    context:
      'High anti-inflammatory and hypoglycaemic activity; used in metabolic-health functional foods.',
  },
  {
    name: 'Ongokea gore',
    common: 'Boleko Nut / Isano',
    part: 'Dried seeds / bark',
    context:
      'Unique industrial seed oil utilised for rapid heat-driven polymerisation in advanced coatings.',
  },
  {
    name: 'Tribulus terrestris',
    common: 'Puncture Vine / Gokshura',
    part: 'Fruits & roots',
    context:
      'Rich in steroidal saponins (protodioscin); widely utilised to optimise libido and athletic stamina.',
  },
  {
    name: 'Xylopia aethiopica',
    common: 'African Pepper / Uda / Hwentia',
    part: 'Dried pods / fruits',
    context:
      'High in kaurane diterpenes; provides exceptional antimicrobial properties for natural food preservation.',
  },
  {
    name: 'Mondia whitei',
    common: 'White’s Ginger / Mukombero',
    part: 'Dried roots',
    context:
      'Formulated into premium aphrodisiac, stamina, and sweet-vanilla aromatic flavouring agents.',
  },
  {
    name: 'Allanblackia floribunda',
    common: 'Tallow Tree / Kisidwe',
    part: 'Seeds / kernels',
    context:
      'Exceptional sharp-melting-profile fat; acts as a sustainable alternative to palm oil and cocoa butter.',
  },
  {
    name: 'Cryptolepis sanguinolenta',
    common: 'Ghana Quinine / Nibima',
    part: 'Dried roots',
    context:
      'Dominant anti-infective botanical rich in cryptolepine; clinically relevant for malaria, Lyme disease and Babesia protocols.',
  },
  {
    name: 'Gymnema sylvestre',
    common: 'Gurmar (Sugar Destroyer)',
    part: 'Dried leaves',
    context:
      'Contains gymnemic acids that temporarily desensitise sweet receptors to block glucose absorption and manage cravings.',
  },
  {
    name: 'Moringa oleifera',
    common: 'Drumstick Tree / Miracle Tree',
    part: 'Leaves / seeds',
    context:
      'Nutrient-dense superfood powerhouse widely used in anti-ageing cosmetics and general immunity powders.',
  },
  {
    name: 'Physostigma venenosum',
    common: 'Calabar Bean',
    part: 'Dried seeds',
    context:
      'Strictly a high-value pharmaceutical precursor containing physostigmine for glaucoma and cholinesterase-inhibitor development.',
    flag: 'B2B Verified Accounts Only',
  },
]

// Audience-facing service offers.
const SERVICES = [
  {
    title: 'Contract & toll extraction',
    body: 'Bring us your botanical and we develop or run the extraction — from feasibility and method development to scaled processing.',
    icon: 'flask',
  },
  {
    title: 'Bulk ingredient supply',
    body: 'Reliable, specification-backed supply of botanical extracts and raw materials for B2B buyers, formulators and distributors.',
    icon: 'drum',
  },
  {
    title: 'Sourcing & cultivation partnerships',
    body: 'Traceable supply secured through our own cultivation and managed grower networks in West Africa.',
    icon: 'sprout',
  },
]

// Quality & traceability commitments.
const QUALITY = [
  {
    title: 'Lot-level traceability',
    body: 'Every batch is traceable to its source farms and harvest, giving buyers confidence in origin and authenticity.',
  },
  {
    title: 'Certificates of analysis',
    body: 'Bulk extracts ship with specifications and CoA covering identity, purity and key actives. (Standards in build-out.)',
  },
  {
    title: 'Food-grade processing',
    body: 'Extraction and handling designed around food-grade practice and consistent, reproducible output.',
  },
  {
    title: 'Sustainable sourcing',
    body: 'Cultivation and ethical collection that supports local growers and the long-term health of wild populations.',
  },
]

// Academic credentials shown in the founder/science panel.
const BACKGROUND = [
  { label: 'PhD', value: 'Chemistry' },
  { label: 'Specialism', value: 'Botanical extraction chemistry' },
  { label: 'Model systems', value: 'S. dulcificum · T. daniellii' },
]

// Selected publications. Real, DOI-linked records sit alongside placeholders
// (marked "replace with real citation") that are being filled in plant by plant.
const PUBLICATIONS = [
  {
    title:
      'Griffonia simplicifolia seed extract rich in 5-hydroxy-L-tryptophan reduces infection and inflammation in a mouse model of vulvovaginal candidiasis',
    venue: 'Puccetti et al. · Journal of Pharmacy and Pharmacology 77(7), 933–943',
    year: '2026',
    href: '#',
  },
  {
    title:
      'The effect of Griffonia simplicifolia on pain intensity, central and peripheral sensitisation, and pain modulation',
    venue: 'ClinicalTrials.gov · trial protocol NCT06893822',
    year: '2025',
    href: 'https://clinicaltrials.gov/study/NCT06893822',
  },
  {
    title:
      'Miracle fruit, a potential taste-modifier to improve food preferences: a review',
    venue: 'Diyapaththugama et al. · Current Nutrition Reports 13, 867–883',
    year: '2024',
    href: 'https://doi.org/10.1007/s13668-024-00583-3',
  },
  {
    title:
      'Study on the thermal stability of the sweet-tasting protein brazzein based on its structure–sweetness relationship',
    venue: 'Zuo et al. · Journal of Agricultural and Food Chemistry 72(13)',
    year: '2024',
    href: 'https://doi.org/10.1021/acs.jafc.3c09616',
  },
  {
    title:
      'Effect of regular consumption of a miraculin-based food supplement on taste perception and nutritional status in malnourished cancer patients (CLINMIR pilot)',
    venue: 'López-Plaza et al. · Nutrients 15(21), 4639',
    year: '2023',
    href: 'https://doi.org/10.3390/nu15214639',
  },
  {
    title:
      'Sweet-tasting natural proteins brazzein and monellin: safe sugar substitutes for the food industry',
    venue: 'Novik et al. · Foods 12(22), 4065',
    year: '2023',
    href: 'https://doi.org/10.3390/foods12224065',
  },
  {
    title: 'Medicinal plants of West Africa: a review of extraction technologies',
    venue: 'Review venue — replace with real citation',
    year: '2022',
    href: '#',
  },
  {
    title: 'Re-evaluation of thaumatin (E 957) as a food additive',
    venue: 'European Food Safety Authority · EFSA Journal 19(11), 6884',
    year: '2021',
    href: 'https://doi.org/10.2903/j.efsa.2021.6884',
  },
  {
    title:
      'From forest to pharmacy: should we be depressed about a sustainable Griffonia simplicifolia (Fabaceae) seed supply chain?',
    venue: 'Cunningham et al. · Journal of Ethnopharmacology 277, 114202',
    year: '2021',
    href: 'https://doi.org/10.1016/j.jep.2021.114202',
  },
  {
    title:
      'Efficient access to the iboga skeleton: optimised procedure to obtain voacangine from Voacanga africana root bark',
    venue: 'Pérez-Tuells et al. · ACS Omega 6(26), 17054–17061',
    year: '2021',
    href: 'https://doi.org/10.1021/acsomega.1c02113',
  },
  {
    title:
      'Effect of transgenesis on mRNA and miRNA profiles in cucumber fruits expressing thaumatin II',
    venue: 'Pawełkowicz et al. · Genes 11(3), 334',
    year: '2020',
    href: 'https://doi.org/10.3390/genes11030334',
  },
  {
    title:
      'Recombinant thaumatin II in Nicotiana plants — sweetener & flavour-modifier GRAS status (GRN 910 & 920)',
    venue: 'US Food and Drug Administration · GRAS Notice Inventory',
    year: '2020',
    href: 'https://www.fda.gov/food/gras-notice-inventory',
  },
  {
    title: 'Cytotoxic active ingredients from the seeds of Voacanga africana',
    venue: 'Li et al. · South African Journal of Botany 137, 1–9',
    year: '2020',
    href: 'https://doi.org/10.1016/j.sajb.2020.09.026',
  },
  {
    title:
      'Industrial manufacturing of vinpocetine via tabersonine intermediates extracted from West African Voacanga seeds',
    venue: 'Covex S.A. · Spain Patent No. ES 549.105',
    year: 'Patent',
    href: '#',
  },
]

// Reasons an enquiry might come in — drives the contact form's subject line.
const ENQUIRY_TYPES = [
  'Buy bulk extracts',
  'Contract / toll extraction',
  'Raw material supply',
  'Partnership / investment',
  'Retail / finished products',
  'Other',
]

// Professional / academic profiles. Replace `href: '#'` with real URLs.
const SOCIALS = [
  { name: 'LinkedIn', href: '#', icon: 'linkedin' },
  { name: 'ResearchGate', href: '#', icon: 'researchgate' },
  { name: 'ORCID', href: '#', icon: 'orcid' },
  { name: 'Google Scholar', href: '#', icon: 'scholar' },
  { name: 'Email', href: `mailto:${COMPANY.email}`, icon: 'email' },
]

// Inline brand/utility icons (24×24 viewBox) so we ship zero icon-library deps.
const ICON_PATHS = {
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z',
  researchgate:
    'M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.19 3.19 0 00-.112.437 8.37 8.37 0 00-.078.53 9 9 0 00-.05.727c-.01.282-.013.621-.013 1.016 0 .405.004.748.014 1.017.01.27.027.512.05.727.022.213.048.39.077.53.03.14.067.286.112.437.243.743.65 1.303 1.213 1.68.565.376 1.255.564 2.073.564.81 0 1.514-.197 2.085-.588.572-.391.99-.95 1.261-1.677a3.53 3.53 0 00.149-.516c.039-.18.07-.378.094-.595.023-.218.04-.456.05-.717.01-.27.013-.6.013-.997 0-.405-.004-.748-.014-1.03a9.4 9.4 0 00-.05-.718 5.95 5.95 0 00-.093-.595 3.53 3.53 0 00-.149-.516c-.27-.728-.69-1.286-1.26-1.677C21.1.197 20.396 0 19.586 0zm.024 1.729c.482 0 .87.143 1.166.428.297.286.479.685.547 1.197.024.21.045.418.064.624.018.207.027.456.027.748v.69c0 .293-.009.541-.027.748-.019.21-.04.418-.064.624-.068.512-.25.911-.547 1.197-.296.285-.684.428-1.166.428-.483 0-.872-.143-1.169-.428-.296-.286-.479-.685-.547-1.197a8.5 8.5 0 01-.064-.624 9.55 9.55 0 01-.027-.748v-.69c0-.292.009-.54.027-.748.019-.206.04-.414.064-.624.068-.512.25-.911.547-1.197.297-.285.686-.428 1.169-.428zM8.391 2.103c-.6 0-1.18.013-1.741.04-.561.027-1.052.06-1.474.1V18.95h1.94v-6.602h1.626l3.124 6.602h2.16l-3.376-6.96c.901-.28 1.586-.74 2.057-1.382.47-.642.705-1.45.705-2.422 0-1.235-.378-2.16-1.135-2.776-.756-.616-1.95-.924-3.583-.924zm.122 1.633c.901 0 1.547.158 1.938.475.391.316.587.84.587 1.572 0 .732-.196 1.262-.587 1.59-.391.328-1.037.492-1.938.492H7.116V3.736h1.397z',
  orcid:
    'M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 01-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z',
  scholar:
    'M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 100 14 7 7 0 000-14z',
  email:
    'M1.5 4.5h21A1.5 1.5 0 0124 6v12a1.5 1.5 0 01-1.5 1.5h-21A1.5 1.5 0 010 18V6a1.5 1.5 0 011.5-1.5zm.43 1.5L12 12.713 22.07 6H1.93zM22.5 7.06l-9.99 6.66a1 1 0 01-1.02 0L1.5 7.06V18h21V7.06z',
  // Capability / product icons.
  sprout:
    'M12 22V12m0 0C12 8 9 5 4 5c0 5 3 8 8 8m0-1c0-4 3-7 8-7 0 5-3 8-8 8',
  flask:
    'M9 3h6M10 3v6.5L5.5 17a2 2 0 001.8 3h9.4a2 2 0 001.8-3L14 9.5V3M8 14h8',
  drum:
    'M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zm0 0v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7',
  package:
    'M21 8l-9-5-9 5m18 0l-9 5m9-5v8l-9 5m0-8L3 8m9 5v8M3 8v8l9 5',
  leaf:
    'M11 20A7 7 0 014 13C4 8 8 4 19 4c0 11-4 15-9 15a7 7 0 01-2-.3M4 21c1.5-5 5-8 11-9',
  check: 'M20 6L9 17l-5-5',
}

function SocialIcon({ name, className = 'h-5 w-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      role="presentation"
      aria-hidden="true"
      className={className}
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  )
}

// Stroke-style icon for capability/product glyphs.
function LineIcon({ name, className = 'h-6 w-6' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="presentation"
      aria-hidden="true"
      className={className}
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  )
}

function Logo({ className = 'h-9 w-9' }) {
  return (
    <span
      className={`flex items-center justify-center rounded-xl bg-brand-600 text-white ${className}`}
    >
      <LineIcon name="leaf" className="h-5 w-5" />
    </span>
  )
}

function App() {
  // 'idle' | 'submitting' | 'success' | 'error'
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    setStatus('submitting')
    setErrorMessage('')

    try {
      await sendContactMessage(data)
      setStatus('success')
      form.reset()
    } catch (err) {
      setErrorMessage(err.message)
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-700">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/85 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2.5">
            <Logo className="h-9 w-9" />
            <span className="flex flex-col leading-tight">
              <span className="text-base font-bold tracking-tight text-stone-900">
                {COMPANY.name}
              </span>
              <span className="hidden text-[11px] font-medium uppercase tracking-wider text-brand-700 sm:block">
                {COMPANY.tagline}
              </span>
            </span>
          </a>
          <div className="flex items-center gap-6">
            <ul className="hidden gap-7 text-sm font-medium text-stone-600 lg:flex">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-brand-700"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-500"
            >
              Request a quote
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-stone-50 to-stone-50">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-clay-100/60 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-brand-100/50 blur-3xl"
          />
          <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center sm:py-32">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-medium text-brand-700">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              {COMPANY.tagline}
            </span>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-stone-900 sm:text-6xl">
              From West African soil to{' '}
              <span className="text-brand-700">refined botanical extracts</span>
              .
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-600">
              {COMPANY.name} is a Ghanaian phytochemical extraction and natural
              products manufacturer. We integrate cultivation, extraction and
              finished-product manufacturing into one traceable pipeline —
              supplying high-value botanicals like thaumatin and miracle berry to
              buyers worldwide.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#products"
                className="rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-500"
              >
                Explore our products
              </a>
              <a
                href="#contact"
                className="rounded-lg border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
              >
                Request a quote
              </a>
            </div>

            {/* Trust stats */}
            <dl className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-stone-200 bg-stone-200 text-left sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-white p-5">
                  <dt className="text-base font-bold text-brand-700">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-relaxed text-stone-500">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Farm-to-extract pipeline */}
        <section
          id="capabilities"
          className="border-t border-stone-200 py-24"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
                Vertically Integrated
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                One traceable pipeline, farm to extract
              </h2>
              <p className="mt-4 text-stone-600">
                Owning every step lets us guarantee origin, quality and supply —
                from the seedling in the soil to the standardised extract in the
                drum.
              </p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {PIPELINE.map((stage) => (
                <div
                  key={stage.title}
                  className="relative rounded-2xl border border-stone-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="text-xs font-bold tracking-widest text-clay-400">
                    {stage.step}
                  </span>
                  <div className="mt-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <LineIcon name={stage.icon} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-stone-900">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    {stage.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section
          id="products"
          className="border-t border-stone-200 bg-stone-100 py-24"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
                Products & Ingredients
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                High-value botanicals, made to specification
              </h2>
              <p className="mt-4 text-stone-600">
                Bulk extracts, raw materials and finished natural products. Need
                a specification sheet or sample? Send an enquiry.
              </p>
              <div className="mt-8 flex justify-center">
                <a
                  href="/product-catalogue.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-500"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M10 3v10m0 0 4-4m-4 4-4-4M4 16h12" />
                  </svg>
                  Download product catalogue
                </a>
              </div>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {PRODUCTS.map((product) => (
                <article
                  key={product.name}
                  className={`flex overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md${
                    product.wide ? ' sm:col-span-2' : ''
                  }${product.sideImages ? ' flex-col md:flex-row' : ' flex-col'}`}
                >
                  <div className="flex min-w-0 flex-1 flex-col p-7">
                    {product.photos ? (
                      <div className="-mx-7 -mt-7 mb-6 grid grid-cols-2 gap-px overflow-hidden rounded-t-2xl bg-stone-200">
                        {product.photos.map((image) => (
                          <figure key={image.src} className="bg-white">
                            <img
                              src={image.src}
                              alt={image.alt}
                              loading="lazy"
                              className="h-24 w-full object-cover"
                            />
                            <figcaption className="px-2 py-1.5 text-center text-xs text-stone-500">
                              {image.caption ?? image.alt}
                            </figcaption>
                          </figure>
                        ))}
                      </div>
                    ) : product.photo ? (
                      <img
                        src={product.photo}
                        alt={product.photoAlt ?? product.name}
                        loading="lazy"
                        className="-mx-7 -mt-7 mb-6 h-48 w-full rounded-t-2xl object-cover"
                      />
                    ) : null}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-stone-900">
                          {product.name}
                        </h3>
                        <p className="mt-0.5 text-sm italic text-stone-500">
                          {product.source}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
                        {product.tag}
                      </span>
                    </div>
                    <div
                      className={`mt-4 flex-1 space-y-3 text-sm leading-relaxed text-stone-600${
                        product.wide ? ' max-w-3xl' : ''
                      }`}
                    >
                      {(Array.isArray(product.body) ? product.body : [product.body]).map(
                        (paragraph, index) =>
                          typeof paragraph === 'string' ? (
                            <p key={index}>{paragraph}</p>
                          ) : (
                            <div key={index}>
                              <p className="font-semibold text-stone-900">
                                {paragraph.heading}
                              </p>
                              <p className="mt-0.5">{paragraph.text}</p>
                            </div>
                          ),
                      )}
                      {product.applications &&
                        (Array.isArray(product.applications) ? (
                          <div>
                            <p className="font-semibold text-stone-900">
                              Applications:
                            </p>
                            <ul className="mt-1.5 list-disc space-y-1 pl-5 sm:columns-2 sm:gap-x-8">
                              {product.applications.map((item, index) => (
                                <li key={index} className="break-inside-avoid">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <p>
                            <span className="font-semibold text-stone-900">
                              Applications:{' '}
                            </span>
                            {product.applications}
                          </p>
                        ))}
                      {product.supplyForm && (
                        <p>
                          <span className="font-semibold text-stone-900">
                            Supply form:{' '}
                          </span>
                          {product.supplyForm}
                        </p>
                      )}
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                        {product.status}
                      </span>
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-600"
                      >
                        Enquire
                        <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>
                  {product.sideImages && (
                    <div className="grid grid-cols-3 gap-px bg-stone-200 md:w-2/5 md:flex-none md:grid-cols-1">
                      {product.sideImages.map((image) => (
                        <figure key={image.src} className="bg-white">
                          <img
                            src={image.src}
                            alt={image.alt}
                            loading="lazy"
                            className="h-32 w-full object-cover sm:h-40 md:h-36"
                          />
                          <figcaption className="px-2 py-1.5 text-center text-xs text-stone-500">
                            {image.caption ?? image.alt}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-stone-500">
              All products available in bulk. CoA and samples available upon
              request.
            </p>
          </div>
        </section>

        {/* Available raw bulk inventory */}
        <section
          id="inventory"
          className="border-t border-stone-200 bg-white py-24"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
                Bulk supply
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Available Raw Bulk Inventory
              </h2>
              <p className="mt-4 text-stone-600">
                Raw and dried botanicals catalogued for bulk supply to
                extractors, formulators and manufacturers. CoA and samples
                available on request.
              </p>
            </div>

            {/* Table — tablet and desktop */}
            <div className="mt-12 hidden overflow-hidden rounded-2xl border border-stone-200 shadow-sm md:block">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-stone-100 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    <th scope="col" className="px-6 py-4">
                      Botanical name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Regional / common name
                    </th>
                    <th scope="col" className="whitespace-nowrap px-6 py-4">
                      Primary part shipped
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Commercial sourcing context
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {RAW_INVENTORY.map((item, index) => (
                    <tr
                      key={item.name}
                      className={`border-t border-stone-200 align-top${
                        index % 2 === 1 ? ' bg-stone-50' : ' bg-white'
                      }`}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium italic text-stone-900"
                      >
                        {item.name}
                      </th>
                      <td className="px-6 py-4 text-stone-700">
                        <span>{item.common}</span>
                        {item.flag && (
                          <span className="mt-1.5 flex w-fit items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                            <svg
                              className="h-3 w-3"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.515 2.625H3.72c-1.345 0-2.188-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {item.flag}
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-stone-700">
                        {item.part}
                      </td>
                      <td className="px-6 py-4 leading-relaxed text-stone-600">
                        {item.context}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Stacked cards — mobile */}
            <div className="mt-10 space-y-4 md:hidden">
              {RAW_INVENTORY.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold italic text-stone-900">
                      {item.name}
                    </h3>
                    <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                      {item.part}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-stone-500">{item.common}</p>
                  {item.flag && (
                    <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                      <svg
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.515 2.625H3.72c-1.345 0-2.188-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {item.flag}
                    </span>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">
                    {item.context}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services / work with us */}
        <section className="border-t border-stone-200 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
                Work With Us
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Supply, extraction and partnership
              </h2>
            </div>
            <div className="mt-14 grid gap-8 sm:grid-cols-3">
              {SERVICES.map((service) => (
                <div key={service.title} className="text-left">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
                    <LineIcon name={service.icon} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-stone-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    {service.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality & traceability */}
        <section
          id="quality"
          className="border-t border-stone-200 bg-brand-900 py-24 text-brand-50"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-brand-300">
                  Quality & Traceability
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Buyers can trust what&apos;s in the drum
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-brand-100/80">
                  Because we control cultivation through to extraction, we can
                  stand behind the identity, purity and origin of every batch we
                  ship — and back it with documentation.
                </p>
                <a
                  href="#contact"
                  className="mt-8 inline-flex rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-800 shadow-sm transition-colors hover:bg-brand-50"
                >
                  Request specifications
                </a>
              </div>
              <dl className="grid gap-px overflow-hidden rounded-2xl border border-brand-700 bg-brand-700 sm:grid-cols-2">
                {QUALITY.map((item) => (
                  <div key={item.title} className="bg-brand-800 p-6">
                    <dt className="flex items-center gap-2 text-sm font-semibold text-white">
                      <LineIcon
                        name="check"
                        className="h-4 w-4 text-brand-300"
                      />
                      {item.title}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-brand-100/75">
                      {item.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="border-t border-stone-200 py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
                About {COMPANY.short}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Building West Africa&apos;s botanical value chain
              </h2>
              <div className="mt-5 space-y-4 leading-relaxed text-stone-600">
                <p>
                  {COMPANY.name} exists to turn West Africa&apos;s extraordinary
                  botanical heritage into high-value, science-backed ingredients
                  — without exporting the value, or the jobs, somewhere else.
                </p>
                <p>
                  We bring cultivation, extraction chemistry and manufacturing
                  under one roof so that growers, buyers and partners all benefit
                  from a transparent, reliable supply chain rooted in Ghana.
                </p>
              </div>
              <ul className="mt-8 space-y-3 text-sm">
                {[
                  'Founded on doctoral extraction-chemistry research',
                  'Local cultivation and grower partnerships',
                  'Serving food, beverage, nutraceutical and research markets',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                      <LineIcon name="check" className="h-3 w-3" />
                    </span>
                    <span className="text-stone-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <p className="text-3xl font-bold text-brand-700">2</p>
                  <p className="mt-1 text-sm text-stone-500">
                    Flagship sweet-protein botanicals in development
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <p className="text-3xl font-bold text-brand-700">100%</p>
                  <p className="mt-1 text-sm text-stone-500">
                    Sourced from West African botanicals
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <p className="text-3xl font-bold text-brand-700">Farm→Lab</p>
                  <p className="mt-1 text-sm text-stone-500">
                    Integrated cultivation and extraction
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <p className="text-3xl font-bold text-brand-700">Ghana</p>
                  <p className="mt-1 text-sm text-stone-500">
                    Headquartered in West Africa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Science & leadership */}
        <section
          id="science"
          className="border-t border-stone-200 bg-stone-100 py-24"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
                Science & Leadership
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Led by doctoral extraction chemistry
              </h2>
              <p className="mt-4 text-stone-600">
                Our processes are grounded in peer-reviewed research, not
                guesswork — giving partners confidence in our yields and our
                quality.
              </p>
            </div>

            {/* Founder panel */}
            <div className="mx-auto mt-14 max-w-4xl rounded-2xl border border-brand-100 bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-lg font-bold text-white">
                    PhD
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900">
                      Dr Walter Affo
                    </h3>
                    <p className="text-sm text-stone-600">
                      Founder · Chemist (PhD) &amp; Biotechnology Entrepreneur
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {SOCIALS.filter((s) =>
                    ['orcid', 'researchgate', 'scholar', 'linkedin'].includes(
                      s.icon,
                    ),
                  ).map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.name}
                      title={social.name}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-200 bg-white text-brand-700 transition-colors hover:bg-brand-600 hover:text-white"
                    >
                      <SocialIcon name={social.icon} />
                    </a>
                  ))}
                </div>
              </div>
              <p className="mt-6 border-t border-stone-100 pt-6 text-sm leading-relaxed text-stone-600">
                {COMPANY.short} was founded by Dr Walter Affo, whose doctoral and
                ongoing research focuses on the extraction chemistry of West
                African medicinal plants — notably the sweet protein thaumatin
                and the taste-modifying miracle berry. That scientific foundation
                shapes how the company develops every process and product.
              </p>
              <dl className="mt-6 grid gap-4 border-t border-stone-100 pt-6 sm:grid-cols-3">
                {BACKGROUND.map((item) => (
                  <div key={item.label}>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm text-stone-700">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Publications */}
            <div className="mx-auto mt-10 max-w-4xl">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
                Selected publications
              </h3>
              <ul className="mt-4 divide-y divide-stone-200 overflow-hidden rounded-2xl border border-stone-200 bg-white">
                {PUBLICATIONS.map((pub) => (
                  <li key={pub.title}>
                    <a
                      href={pub.href}
                      target={pub.href === '#' ? undefined : '_blank'}
                      rel={pub.href === '#' ? undefined : 'noopener noreferrer'}
                      className="flex items-center gap-4 px-6 py-5 transition-colors hover:bg-stone-50"
                    >
                      <span className="text-sm font-semibold text-stone-400">
                        {pub.year}
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-semibold leading-snug text-stone-900">
                          {pub.title}
                        </span>
                        <span className="mt-0.5 block text-xs italic text-stone-500">
                          {pub.venue}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-brand-600"
                      >
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact / enquiry */}
        <section id="contact" className="border-t border-stone-200 py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
                Get in Touch
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Request a quote or sample
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-stone-600">
                Whether you&apos;re sourcing bulk extracts, exploring contract
                extraction, or interested in partnership and investment, we&apos;d
                like to hear from you.
              </p>
              <dl className="mt-8 space-y-4 text-sm">
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 font-medium text-stone-900">
                    Email
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-brand-700 hover:text-brand-600"
                    >
                      {COMPANY.email}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 font-medium text-stone-900">
                    Phone
                  </dt>
                  <dd className="text-stone-600">{COMPANY.phone}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 font-medium text-stone-900">
                    Address
                  </dt>
                  <dd className="text-stone-600">
                    {COMPANY.address}
                    <br />
                    {COMPANY.location}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
              {status === 'success' ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <LineIcon name="check" className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-stone-900">
                    Thank you
                  </h3>
                  <p className="mt-2 text-sm text-stone-600">
                    Your enquiry has been received. We&apos;ll be in touch
                    shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {!isContactConfigured && (
                    <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                      Heads up: the form isn&apos;t connected to an email
                      service yet. Add your Formspree endpoint to{' '}
                      <code className="font-mono">.env.local</code> and restart
                      the dev server.
                    </p>
                  )}
                  <input
                    type="hidden"
                    name="_subject"
                    value={`New enquiry — ${COMPANY.name} website`}
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-stone-700"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="mt-1.5 block w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-stone-700"
                      >
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        className="mt-1.5 block w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-stone-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-1.5 block w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="enquiry"
                      className="block text-sm font-medium text-stone-700"
                    >
                      Enquiry type
                    </label>
                    <select
                      id="enquiry"
                      name="enquiry"
                      defaultValue=""
                      className="mt-1.5 block w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                    >
                      <option value="" disabled>
                        Select one…
                      </option>
                      {ENQUIRY_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-stone-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      required
                      className="mt-1.5 block w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                    />
                  </div>
                  {status === 'error' && (
                    <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                      {errorMessage}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-stone-100 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-8 border-b border-stone-200 pb-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5">
                <Logo className="h-9 w-9" />
                <span className="text-base font-bold tracking-tight text-stone-900">
                  {COMPANY.name}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-stone-500">
                Ghanaian phytochemical extraction and natural products — a
                traceable pipeline from West African farms to refined botanical
                extracts.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:items-end">
              <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-stone-600">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="transition-colors hover:text-brand-700"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="flex items-center gap-3">
                {SOCIALS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.icon === 'email' ? undefined : '_blank'}
                    rel={social.icon === 'email' ? undefined : 'noreferrer'}
                    aria-label={social.name}
                    title={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-500 transition-colors hover:border-brand-300 hover:bg-brand-600 hover:text-white"
                  >
                    <SocialIcon name={social.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-2 text-sm text-stone-500 sm:flex-row">
            <p>
              © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
            </p>
            <p>
              {COMPANY.address}, {COMPANY.location}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
