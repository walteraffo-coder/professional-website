// Product / ingredient catalogue — single source of truth, consumed by both
// the product cards (src/App.jsx) and the build-time Product JSON-LD
// generator (vite.config.js).

export const PRODUCTS = [
  {
    name: 'Miracle Berry (Asowa)',
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
    source: 'Thaumatococcus daniellii (Anga)',
    tag: 'Bulk extract',
    status: 'Available',
    body: [
      'Thaumatin is an ultra-high-intensity, low-glycaemic natural sweetening protein extracted from the fruit aril of Thaumatococcus daniellii (Anga, also known as katemfe). At up to 2,000–3,000 times sweeter than sucrose, it is among the most potent natural sweeteners known — yet contributes negligible calories and has minimal impact on blood glucose.',
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
      { src: '/images/t-danielli-fruits.jpeg', alt: 'Freshly harvested Anga (Thaumatococcus daniellii) fruits', caption: 'Whole fruits' },
      { src: '/images/t-danielli-arils.jpeg', alt: 'Anga arils', caption: 'Arils' },
      { src: '/images/t-danielli-seed-with-aril.jpeg', alt: 'Anga seed with aril', caption: 'Seed with aril' },
      { src: '/images/t-danielli-seed-black-and-aril-white.jpeg', alt: 'Anga seed (black) and aril (white)', caption: 'Seed & aril, separated' },
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
    name: 'Bixin (Bixa orellana)',
    source: 'Bixa orellana (Annatto)',
    tag: 'Natural colorant',
    status: 'Available',
    photos: [
      { src: '/images/annato.jpeg', alt: 'Bixa orellana (Annatto) fruit', caption: 'Annatto' },
      { src: '/images/annato-seeds.jpeg', alt: 'Bixa orellana (Annatto) seeds', caption: 'Annatto seeds' },
    ],
    body: 'Bixa orellana (Annatto) seeds extract contain a natural food colorant (Bixin). Several orange and yellow manufactured foods are colored with the Annatto colorant. These include but are not limited to cheeses, ice creams, yogurts, margarines, cereals, salad dressings, crackers, snack foods and baked goods.',
    applications:
      'Natural orange-yellow food colorant for cheeses, ice creams, yoghurts, margarines, cereals, salad dressings, crackers, snack foods and baked goods.',
  },
  {
    name: 'Caesalpinia benthamiana',
    source: 'West African medicinal plants',
    tag: 'Premium Aphrodisiac',
    status: 'Available',
    photos: [
      { src: '/images/ekow-bowere.jpeg', alt: 'Caesalpinia benthamiana plant', caption: 'Ekow Bowere plant' },
      { src: '/images/ekow-bowere-roots.jpeg', alt: 'Caesalpinia benthamiana roots', caption: 'Premium root extract material' },
    ],
    body: "Commonly known as Ekow Bowere in Fante (and 'Tiger's Claw' due to its distinct thorns), Caesalpinia benthamiana is a prized West African climbing shrub. Ethnomedical and pharmacological studies confirm that its root extracts possess potent vasorelaxant and antioxidant properties, heavily utilized in traditional formulations as a natural aphrodisiac and performance stimulant.",
    applications:
      'Premium root extracts formulated for natural vitality, circulation support, and traditional aphrodisiac specifications.',
  },
  {
    name: 'Irvingia gabonensis (African wild mango)',
    source: 'West African medicinal plants',
    tag: 'Metabolic Support',
    status: 'Available',
    photos: [
      { src: '/images/irvingia-gabonensis.jpeg', alt: 'Irvingia gabonensis fruit', caption: 'African wild mango' },
    ],
    body: 'Native to West Africa, Irvingia gabonensis is highly valued for its dense, nutrient-rich seeds. Modern clinical research indicates that its seed extracts effectively modulate key metabolic markers, regulating appetite-linked hormones (leptin and adiponectin) while promoting glycemic and lipid control.',
    applications:
      'Premium standardized seed extracts for metabolic health, natural weight management formulations, and dietary fiber optimization.',
  },
  {
    name: 'Picralima nitida (Akuamma)',
    source: 'West African medicinal plants',
    tag: 'Natural Analgesic',
    status: 'Available',
    photos: [
      { src: '/images/picralima-nitida.jpeg', alt: 'Picralima nitida fruit', caption: 'Akuamma fruit' },
      { src: '/images/picralima-nitida-seeds.jpeg', alt: 'Picralima nitida seeds', caption: 'Premium Akuamma seeds' },
    ],
    body: 'Commonly known as Akuamma, Picralima nitida is a critical pillar of traditional West African medicine. Extensive pharmacological research verifies that its seeds are highly rich in specialized indole alkaloids, primarily akuammine, which demonstrate powerful clinical efficacy as natural anti-inflammatory, antipyretic, and analgesic agents.',
    applications:
      'Standardized Akuamma seed powders and extracts processed to specification for natural pain management and therapeutic formulations.',
  },
  {
    name: 'Tetrapleura tetraptera (Prekese)',
    source: 'West African medicinal plants',
    tag: 'Cardiovascular & Metabolic Health',
    status: 'Available',
    photos: [
      { src: '/images/prekese.jpeg', alt: 'Tetrapleura tetraptera fruit', caption: 'Prekese fruit pods' },
    ],
    body: 'Famously known as Prekese in Ghana, Tetrapleura tetraptera is highly sought after for its exceptional medicinal profile. Rich in triterpenoid saponins (aridanin), flavonoids, and essential macro-minerals, scientific studies confirm its significant therapeutic efficacy in blood pressure control, glycemic regulation, and system-wide anti-inflammatory support.',
    applications:
      'Premium standardized fruit pod extracts processed to client specifications for nutraceutical formulations, therapeutic tonics, and functional dietary supplements.',
  },
  {
    name: 'Desmodium adscendens',
    source: 'Desmodium adscendens (Asoma)',
    tag: 'Wild-harvested leaves',
    status: 'Available',
    body: [
      'Native to the undisturbed forest belts of West Africa, Desmodium adscendens — known in Ghana as Asoma — is one of the region’s most valued protective botanicals. Prized in both traditional African medicine and modern European phytotherapy, it is celebrated for its hepatoprotective (liver-defending) and bronchodilating properties. Farms & Extracts 46 supplies ethically wild-crafted, fully traceable Desmodium adscendens leaves, processed for industrial extraction, tincture formulation and herbal encapsulation.',
      {
        heading: 'Hepatoprotective excellence',
        text: 'Rich concentrations of soyasaponins, flavonoids and alkaloids support liver cell regeneration, protect hepatocyte membranes and assist normal hepatic enzyme recovery.',
      },
      {
        heading: 'Respiratory & anti-anaphylactic support',
        text: 'The leaf naturally modulates smooth-muscle contraction in the bronchial tract, making it a preferred ingredient in respiratory care and anti-allergy formulations.',
      },
      {
        heading: 'Antioxidant & free-radical scavenging',
        text: 'A high phenolic content helps neutralise oxidative stress and supports healthy systemic inflammation responses.',
      },
      {
        heading: 'Sustainable wild harvesting',
        text: 'Leaves are harvested from certified wild forest blocks across Ghana in partnership with indigenous forest-collection communities, who pluck sustainably so roots and vines remain unharmed for continuous perennial regeneration.',
      },
      {
        heading: 'Low-thermal curing & moisture control',
        text: 'Raw leaves are sorted immediately post-harvest to remove organic impurities, then gently dried by low-thermal dehumidification to an optimal 10–12% moisture level — locking in active phytochemicals while preserving the natural green colour and aroma without heat degradation.',
      },
      {
        heading: 'EU compliance & contaminant screening',
        text: 'Every batch is screened against rigorous European safety standards for heavy metals, pesticide residues, pyrrolizidine alkaloids (PAs) and microbiological cleanliness.',
      },
    ],
    applications: [
      'Liquid extracts and tinctures',
      'Nutraceutical capsules',
      'Herbal teas and infusions',
      'Liver-support and hepatoprotective formulations',
      'Respiratory care and anti-allergy formulations',
    ],
    supplyForm:
      'Dried leaves in coarse cut (1–3 cm), custom fine cut available. High-density breathable export bags, palletised on request.',
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
]
