import type { InsuranceType, LeadSourceKind } from "../../../shared/leads";

export type NavItem = {
  label: string;
  href: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FeatureItem = {
  title: string;
  description: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type AudienceItem = {
  title: string;
  description: string;
};

export type TestimonialItem = {
  name: string;
  location: string;
  rating: number;
  text: string;
  product: string;
};

export type NavSubItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavItemWithSub = NavItem & {
  subItems?: NavSubItem[];
};

export type PageContent = {
  slug: string;
  path: string;
  navLabel?: string;
  shortTitle: string;
  eyebrow: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  sourceKind: LeadSourceKind;
  insuranceType?: InsuranceType;
  heroHighlights: string[];
  benefits: FeatureItem[];
  differentiators: FeatureItem[];
  faq: FaqItem[];
  audience?: AudienceItem[];
  ctaLabel?: string;
  callOnly?: boolean;
};

export const brandName = "LTA COURTAGE";
export const phoneDisplay = "01 89 71 42 60";
export const phoneHref = "tel:+33189714260";
export const contactEmail = "contact@ltacourtage.fr";
export const brokerageAddress = "8 RUE GIOACCHINO ROSSINI, 95310 SAINT-OUEN-L'AUMONE";

export const navigationItems: NavItemWithSub[] = [
  { label: "Accueil", href: "/" },
  {
    label: "Assurance auto",
    href: "/assurance-auto",
    subItems: [
      { label: "Assurance auto", href: "/assurance-auto", description: "Tous profils : standard, malussé, résilié." },
      { label: "Conducteur malussé", href: "/assurance-auto-malusse", description: "Solution après sinistre ou majoration." },
      { label: "Conducteur résilié", href: "/assurance-auto-resilie", description: "Relancer votre dossier après résiliation." },
      { label: "Jeune conducteur", href: "/assurance-auto-jeune-conducteur", description: "Premier contrat sans surprime excessive." },
      { label: "Comprendre le bonus-malus", href: "/assurance-auto/bonus-malus", description: "Guide complet sur le coefficient." },
      { label: "Formules auto", href: "/assurance-auto/formules", description: "Tiers, intermédiaire, tous risques." },
    ],
  },
  {
    label: "Mutuelle santé",
    href: "/mutuelle-sante",
    subItems: [
      { label: "Mutuelle santé", href: "/mutuelle-sante", description: "Pour actifs, familles et seniors." },
      { label: "Mutuelle senior", href: "/mutuelle-senior", description: "Garanties adaptées aux 60 ans et plus." },
    ],
  },
  {
    label: "Prévoyance",
    href: "/prevoyance",
    subItems: [
      { label: "Prévoyance", href: "/prevoyance", description: "Protection revenus, famille, foyer." },
      { label: "Prévoyance indépendant", href: "/prevoyance-independant", description: "Sécuriser l'activité professionnelle." },
    ],
  },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export const trustStats: StatItem[] = [
  { value: "3 min", label: "pour décrire votre besoin" },
  { value: "< 24 h", label: "délai de rappel conseiller" },
  { value: "100 %", label: "accompagnement humain" },
  { value: "3", label: "univers couverts" },
];

export const homepageStats: StatItem[] = [
  { value: "3 min", label: "pour qualifier votre besoin en ligne" },
  { value: "24 h", label: "pour être rappelé par un conseiller" },
  { value: "100 %", label: "accompagnement humain avant la souscription" },
];

export const testimonials: TestimonialItem[] = [
  {
    name: "Marie L.",
    location: "Lyon, 69",
    rating: 5,
    product: "Assurance auto",
    text: "Après ma résiliation, je n'espérais plus trouver une assurance décente. Le conseiller LTA COURTAGE m'a rappelé en moins de deux heures et trouvé une solution adaptée. Très professionnel.",
  },
  {
    name: "Thomas R.",
    location: "Bordeaux, 33",
    rating: 5,
    product: "Mutuelle santé",
    text: "J'avais du mal à comparer les garanties de mes mutuelles. LTA COURTAGE a tout simplifié et reformulé clairement. Je me suis décidé bien plus vite qu'avec les comparateurs classiques.",
  },
  {
    name: "Isabelle M.",
    location: "Nantes, 44",
    rating: 5,
    product: "Prévoyance",
    text: "En tant qu'indépendante, je cherchais à protéger mes revenus sans me perdre dans des contrats obscurs. LTA COURTAGE a su décrypter exactement ce dont j'avais besoin.",
  },
];

export const trustSignals: FeatureItem[] = [
  {
    title: "Comparaison guidée par un courtier",
    description:
      "LTA COURTAGE met en regard des solutions adaptées à votre profil, puis vous explique les écarts de garanties, de prix et de niveau de service avant toute décision.",
  },
  {
    title: "Parcours simple et rassurant",
    description:
      "Le site priorise les besoins les plus recherchés en assurance auto, santé et prévoyance avec un formulaire progressif, une lecture claire et des appels à l’action visibles.",
  },
  {
    title: "Suivi commercial réactif",
    description:
      "Chaque demande qualifiée est transmise rapidement pour permettre un rappel utile, contextualisé et conforme à votre situation réelle.",
  },
];

export const productHighlights: FeatureItem[] = [
  {
    title: "Assurance auto",
    description:
      "Pour conducteur standard, jeune permis, malussé ou résilié, avec une étude orientée budget, usage du véhicule et antécédents du contrat.",
  },
  {
    title: "Mutuelle santé",
    description:
      "Pour actifs, familles et seniors recherchant un bon équilibre entre remboursements, confort de soins et lisibilité des garanties.",
  },
  {
    title: "Prévoyance",
    description:
      "Pour protéger vos revenus, votre foyer et vos projets en cas d’arrêt de travail, d’invalidité, de décès ou d’aléas professionnels.",
  },
];

const commonDifferentiators: FeatureItem[] = [
  {
    title: "Lecture claire des contrats",
    description:
      "Nous aidons à arbitrer entre prix, franchise, garanties et exclusions afin d’éviter les choix approximatifs et les mauvaises surprises au moment du sinistre.",
  },
  {
    title: "Accompagnement sur des profils sensibles",
    description:
      "LTA COURTAGE traite aussi les dossiers plus complexes, notamment les besoins après résiliation, malus, changement de situation familiale ou activité indépendante.",
  },
  {
    title: "Expérience pensée pour la conversion utile",
    description:
      "Chaque page articule information, réassurance et prise de contact afin de transformer une recherche d’assurance en échange commercial qualifié.",
  },
];

export const pageContentBySlug: Record<string, PageContent> = {
  auto: {
    slug: "auto",
    path: "/assurance-auto",
    navLabel: "Assurance auto",
    shortTitle: "Auto",
    eyebrow: "Comparateur assurance auto",
    title: "Comparez une assurance auto adaptée à votre profil avec l’accompagnement de LTA COURTAGE",
    description:
      "Jeune permis, conducteur expérimenté, malussé ou résilié : LTA COURTAGE vous aide à identifier une assurance auto cohérente avec votre budget, votre historique et votre niveau de couverture recherché.",
    seoTitle: "Assurance auto : devis et accompagnement courtier",
    seoDescription:
      "Obtenez une étude d’assurance auto avec LTA COURTAGE : comparaison guidée, rappel rapide et conseils pour conducteur standard, malussé, résilié ou jeune permis.",
    sourceKind: "seo",
    insuranceType: "auto",
    heroHighlights: [
      "Étude rapide pour conducteur standard, malussé ou résilié",
      "Lecture claire des garanties, franchises et exclusions",
      "Rappel par un conseiller pour finaliser votre besoin",
    ],
    benefits: [
      {
        title: "Analyse du bon niveau de couverture",
        description:
          "Nous repartons de vos usages, de la valeur du véhicule et de votre historique afin d’éviter une formule trop faible ou inutilement coûteuse.",
      },
      {
        title: "Orientation pour profils difficiles",
        description:
          "Après malus, sinistre, suspension ou résiliation, nous vous aidons à repositionner votre dossier et à retrouver une solution crédible.",
      },
      {
        title: "Parcours de demande simplifié",
        description:
          "Le formulaire capture l’essentiel pour permettre un rappel préparé sans vous imposer un devis interminable.",
      },
    ],
    differentiators: commonDifferentiators,
    faq: [
      {
        question: "Puis-je demander une assurance auto si j’ai été résilié ?",
        answer:
          "Oui. LTA COURTAGE accompagne aussi les profils résiliés et peut orienter la demande selon l’origine de la résiliation, votre antécédent récent et le véhicule à assurer.",
      },
      {
        question: "Le formulaire donne-t-il un tarif immédiat ?",
        answer:
          "Le site priorise une qualification rapide suivie d’un rappel. Cette approche permet de comparer plus justement les solutions selon votre situation réelle.",
      },
      {
        question: "Quels éléments préparer avant l’appel ?",
        answer:
          "Idéalement votre bonus-malus, l’usage du véhicule, la date souhaitée de prise d’effet et tout élément marquant de votre historique de contrat.",
      },
    ],
    audience: [
      {
        title: "Conducteur standard",
        description: "Pour comparer une formule au tiers, intermédiaire ou tous risques sans perdre de temps dans des écrans trop techniques.",
      },
      {
        title: "Conducteur malussé",
        description: "Pour retrouver rapidement une solution plus réaliste après sinistre responsable ou prime devenue difficile à supporter.",
      },
      {
        title: "Conducteur résilié",
        description: "Pour relancer un dossier après non-paiement, aggravation du risque ou antécédents ayant réduit vos options.",
      },
    ],
    ctaLabel: "Recevoir mon étude auto",
  },
  sante: {
    slug: "sante",
    path: "/mutuelle-sante",
    navLabel: "Mutuelle santé",
    shortTitle: "Santé",
    eyebrow: "Comparateur mutuelle santé",
    title: "Trouvez une mutuelle santé lisible, adaptée à votre budget et à vos besoins de remboursement",
    description:
      "LTA COURTAGE vous accompagne pour comparer les garanties utiles en santé, comprendre les niveaux de remboursement et sélectionner une formule cohérente pour un actif, une famille ou un senior.",
    seoTitle: "Mutuelle santé : comparaison et accompagnement courtier",
    seoDescription:
      "Comparez une mutuelle santé avec LTA COURTAGE : garanties, budget, besoins dentaires, optiques et hospitalisation expliqués simplement.",
    sourceKind: "seo",
    insuranceType: "sante",
    heroHighlights: [
      "Analyse claire des postes de dépenses prioritaires",
      "Approche adaptée aux familles, actifs et seniors",
      "Conseil humain pour arbitrer garanties et cotisation",
    ],
    benefits: [
      {
        title: "Comparaison centrée sur vos besoins réels",
        description:
          "Nous partons des postes qui comptent pour vous, comme l’optique, le dentaire, l’hospitalisation ou les médecines douces.",
      },
      {
        title: "Lecture simplifiée des garanties",
        description:
          "Les niveaux de remboursement sont reformulés de manière claire pour éviter les contrats surdimensionnés ou les angles morts de couverture.",
      },
      {
        title: "Accompagnement à chaque étape",
        description:
          "Le rappel permet d’ajuster la sélection aux habitudes de soins, à la composition du foyer et au budget cible.",
      },
    ],
    differentiators: commonDifferentiators,
    faq: [
      {
        question: "Puis-je demander une mutuelle santé pour un couple ou une famille ?",
        answer:
          "Oui. Le formulaire permet d’initier une demande, puis un conseiller affine les besoins selon le nombre de bénéficiaires et les dépenses de santé les plus fréquentes.",
      },
      {
        question: "Comment savoir si je paie trop cher ma mutuelle actuelle ?",
        answer:
          "Le plus utile est de comparer votre cotisation aux garanties effectivement utilisées, à vos habitudes de soins et à votre reste à charge actuel.",
      },
      {
        question: "Peut-on être rappelé pour une demande senior ?",
        answer:
          "Oui. Les besoins de mutuelle senior font partie des recherches les plus fréquentes traitées par LTA COURTAGE.",
      },
    ],
    audience: [
      {
        title: "Actifs",
        description: "Pour optimiser une couverture santé individuelle ou familiale en maîtrisant le niveau de cotisation mensuelle.",
      },
      {
        title: "Familles",
        description: "Pour mieux équilibrer les besoins adultes et enfants, notamment sur l’orthodontie, l’optique et l’hospitalisation.",
      },
      {
        title: "Seniors",
        description: "Pour retrouver une mutuelle plus lisible et adaptée à des dépenses de santé plus régulières ou plus spécialisées.",
      },
    ],
    ctaLabel: "Recevoir mon étude santé",
  },
  prevoyance: {
    slug: "prevoyance",
    path: "/prevoyance",
    navLabel: "Prévoyance",
    shortTitle: "Prévoyance",
    eyebrow: "Comparateur prévoyance",
    title: "Protégez vos revenus et votre foyer grâce à une prévoyance pensée pour votre situation",
    description:
      "Arrêt de travail, invalidité, décès, maintien de revenu ou protection familiale : LTA COURTAGE vous aide à structurer une solution de prévoyance compréhensible et adaptée à votre exposition réelle au risque.",
    seoTitle: "Prévoyance : protection des revenus et du foyer",
    seoDescription:
      "Étudiez une solution de prévoyance avec LTA COURTAGE : protection du revenu, invalidité, décès et garanties pour indépendants ou particuliers.",
    sourceKind: "seo",
    insuranceType: "prevoyance",
    heroHighlights: [
      "Protection du revenu en cas d’arrêt de travail",
      "Solutions pour indépendants, dirigeants et familles",
      "Aide à la lecture des délais, franchises et capitaux",
    ],
    benefits: [
      {
        title: "Vision concrète du risque",
        description:
          "Nous repartons de vos revenus, de vos charges et de vos responsabilités pour dimensionner les garanties avec cohérence.",
      },
      {
        title: "Comparaison de garanties parfois complexes",
        description:
          "Les notions de franchise, d’indemnisation ou de capital sont reformulées simplement pour faciliter votre arbitrage.",
      },
      {
        title: "Conseil utile avant la souscription",
        description:
          "Le rappel permet d’identifier les priorités : maintien de revenu, protection du conjoint, enfants, activité indépendante ou crédit en cours.",
      },
    ],
    differentiators: commonDifferentiators,
    faq: [
      {
        question: "La prévoyance est-elle utile si je suis salarié ?",
        answer:
          "Oui, selon votre niveau de protection actuel, vos charges fixes et vos besoins familiaux. Un complément peut éviter une baisse trop importante de revenu en cas d’aléa.",
      },
      {
        question: "Puis-je demander une étude si je suis indépendant ?",
        answer:
          "Oui. Les indépendants font partie des profils prioritaires, notamment lorsqu’ils souhaitent sécuriser leur revenu professionnel.",
      },
      {
        question: "Le site traite-t-il aussi la protection décès ?",
        answer:
          "Oui. Les besoins liés au capital décès, à la rente ou à la protection du foyer peuvent être abordés dans le cadre de la demande.",
      },
    ],
    audience: [
      {
        title: "Salariés",
        description: "Pour compléter une protection existante et mieux anticiper les conséquences d’un arrêt de travail prolongé.",
      },
      {
        title: "Indépendants",
        description: "Pour sécuriser le maintien du revenu et préserver l’équilibre financier de l’activité et du foyer.",
      },
      {
        title: "Chefs de famille",
        description: "Pour protéger les proches en cas de coup dur et clarifier les garanties vraiment prioritaires.",
      },
    ],
    ctaLabel: "Recevoir mon étude prévoyance",
  },
  malusse: {
    slug: "malusse",
    path: "/assurance-auto-malusse",
    shortTitle: "Auto malussé",
    eyebrow: "Profil spécifique auto",
    title: "Assurance auto malussé : retrouvez une solution plus adaptée à votre nouveau profil",
    description:
      "Après un malus, il devient essentiel d’identifier un contrat réaliste, lisible et soutenable. LTA COURTAGE vous aide à reformuler votre dossier et à retrouver des options crédibles.",
    seoTitle: "Assurance auto malussé : demande et étude rapide",
    seoDescription:
      "Demandez une étude d’assurance auto malussé avec LTA COURTAGE et soyez rappelé pour identifier une solution adaptée à votre situation.",
    sourceKind: "seo",
    insuranceType: "auto",
    heroHighlights: [
      "Positionnement de dossier après sinistre ou majoration",
      "Lecture claire des écarts de prime et de franchise",
      "Rappel rapide par un conseiller spécialisé auto",
    ],
    benefits: [
      {
        title: "Dossier requalifié avec méthode",
        description: "Nous aidons à présenter la situation de façon claire pour éviter les demandes incomplètes ou mal orientées.",
      },
      {
        title: "Recherche pragmatique",
        description: "L’objectif est de retrouver une solution soutenable, pas simplement de multiplier les devis inadaptés.",
      },
      {
        title: "Accompagnement humain",
        description: "Le rappel vous permet d’expliquer votre historique et d’identifier les marges de manœuvre réellement disponibles.",
      },
    ],
    differentiators: commonDifferentiators,
    faq: [
      {
        question: "Peut-on assurer un véhicule avec un fort malus ?",
        answer:
          "Oui, sous réserve d’une étude réaliste de votre historique, du véhicule et des garanties souhaitées. Le rôle du courtier est précisément d’orienter la demande.",
      },
      {
        question: "Le malus fait-il automatiquement exploser le prix ?",
        answer:
          "Il augmente souvent la prime, mais l’ampleur dépend du contexte. Une comparaison guidée peut permettre d’éviter des choix défavorables.",
      },
      {
        question: "Quels documents préparer ?",
        answer:
          "Votre relevé d’information, l’immatriculation du véhicule et les principaux éléments sur votre antécédent récent seront très utiles.",
      },
    ],
    ctaLabel: "Être rappelé pour mon dossier auto",
  },
  resilie: {
    slug: "resilie",
    path: "/assurance-auto-resilie",
    shortTitle: "Auto résilié",
    eyebrow: "Profil spécifique auto",
    title: "Assurance auto résilié : relancez votre recherche avec un accompagnement structuré",
    description:
      "Non-paiement, sinistralité ou aggravation du risque : LTA COURTAGE vous aide à remettre votre demande à plat pour retrouver une assurance auto adaptée après résiliation.",
    seoTitle: "Assurance auto résilié : être rappelé par un courtier",
    seoDescription:
      "LTA COURTAGE accompagne les conducteurs résiliés pour relancer une recherche d’assurance auto avec une étude rapide et un rappel qualifié.",
    sourceKind: "seo",
    insuranceType: "auto",
    heroHighlights: [
      "Aide pour dossier après non-paiement ou résiliation assureur",
      "Qualification rapide des points bloquants du contrat",
      "Mise en relation utile plutôt qu’un simple formulaire générique",
    ],
    benefits: [
      {
        title: "Analyse de la cause de résiliation",
        description: "La stratégie n’est pas la même selon qu’il s’agisse d’un impayé, d’une sinistralité élevée ou d’une autre cause.",
      },
      {
        title: "Priorisation de solutions réalistes",
        description: "Nous visons un repositionnement crédible sur le marché plutôt qu’une promesse de devis instantané peu fiable.",
      },
      {
        title: "Rappel avec contexte",
        description: "Les informations collectées en ligne permettent d’entrer rapidement dans le fond du dossier lors de l’échange.",
      },
    ],
    differentiators: commonDifferentiators,
    faq: [
      {
        question: "Puis-je souscrire après une résiliation pour non-paiement ?",
        answer:
          "Oui, mais la demande doit être contextualisée. LTA COURTAGE vous aide à présenter votre situation de façon utile et réaliste.",
      },
      {
        question: "Le formulaire est-il réservé aux cas urgents ?",
        answer:
          "Non. Il convient aussi bien à une recherche immédiate qu’à une demande préparatoire pour anticiper une future remise en circulation.",
      },
      {
        question: "Suis-je rappelé rapidement ?",
        answer:
          "Oui. Les demandes ont été pensées pour alimenter un rappel rapide et exploitable par le cabinet.",
      },
    ],
    ctaLabel: "Recevoir un rappel sur mon dossier",
  },
  jeuneConducteur: {
    slug: "jeuneConducteur",
    path: "/assurance-auto-jeune-conducteur",
    shortTitle: "Jeune conducteur",
    eyebrow: "Profil spécifique auto",
    title: "Assurance auto jeune conducteur : comprendre les options et sécuriser votre premier contrat",
    description:
      "Premier véhicule, surprime, formule au tiers ou tous risques : LTA COURTAGE vous aide à comparer les choix possibles pour un jeune conducteur sans sacrifier la lisibilité du contrat.",
    seoTitle: "Assurance auto jeune conducteur : étude et rappel",
    seoDescription:
      "Demandez une étude d’assurance auto jeune conducteur avec LTA COURTAGE pour comparer les options de couverture et maîtriser votre budget.",
    sourceKind: "seo",
    insuranceType: "auto",
    heroHighlights: [
      "Aide au choix entre budget et niveau de couverture",
      "Explications claires sur surprime et garanties",
      "Accompagnement dès le premier contrat auto",
    ],
    benefits: [
      {
        title: "Explication pédagogique",
        description: "Le site reformule les notions techniques pour rendre le premier contrat plus simple à comprendre.",
      },
      {
        title: "Arbitrage adapté au véhicule",
        description: "Le bon niveau de couverture dépend du véhicule, du stationnement, des trajets et de votre budget mensuel.",
      },
      {
        title: "Échange utile avec un conseiller",
        description: "Le rappel permet de valider les priorités et d’éviter des garanties mal calibrées dès le départ.",
      },
    ],
    differentiators: commonDifferentiators,
    faq: [
      {
        question: "Dois-je forcément choisir une assurance au tiers ?",
        answer:
          "Pas nécessairement. Tout dépend du véhicule, de sa valeur, de son usage et du niveau de protection que vous souhaitez réellement.",
      },
      {
        question: "La surprime est-elle la même partout ?",
        answer:
          "Non. Elle varie selon le profil, le véhicule et la politique tarifaire du contrat étudié.",
      },
      {
        question: "Puis-je faire la demande pour un enfant ou un proche ?",
        answer:
          "Oui, à condition d’indiquer clairement la situation lors du formulaire ou du rappel.",
      },
    ],
    ctaLabel: "Être rappelé pour mon premier contrat",
  },
  senior: {
    slug: "senior",
    path: "/mutuelle-senior",
    shortTitle: "Mutuelle senior",
    eyebrow: "Profil spécifique santé",
    title: "Mutuelle senior : comparez les garanties essentielles avec un accompagnement clair",
    description:
      "LTA COURTAGE vous aide à hiérarchiser les garanties réellement utiles en mutuelle senior afin de concilier confort, niveau de remboursement et budget.",
    seoTitle: "Mutuelle senior : comparaison et rappel courtier",
    seoDescription:
      "Comparez une mutuelle senior avec LTA COURTAGE et obtenez un rappel pour arbitrer remboursements, hospitalisation, optique et dentaire.",
    sourceKind: "seo",
    insuranceType: "sante",
    heroHighlights: [
      "Priorisation des besoins de santé les plus fréquents",
      "Aide pour lire les niveaux de remboursement",
      "Accompagnement humain avant toute souscription",
    ],
    benefits: [
      {
        title: "Focalisation sur les postes clés",
        description: "Hospitalisation, optique, dentaire, aides auditives ou soins réguliers : la comparaison repart des postes qui pèsent réellement.",
      },
      {
        title: "Budget mieux maîtrisé",
        description: "Le but n’est pas d’empiler les garanties, mais de trouver une formule cohérente avec vos besoins et votre capacité de cotisation.",
      },
      {
        title: "Rappel personnalisé",
        description: "Un conseiller reprend avec vous les éléments essentiels afin de proposer une orientation plus pertinente qu’un simple comparatif automatique.",
      },
    ],
    differentiators: commonDifferentiators,
    faq: [
      {
        question: "La mutuelle senior est-elle forcément plus chère ?",
        answer:
          "Elle peut l’être selon le niveau de couverture. L’enjeu est surtout de sélectionner les garanties utiles et d’éviter les doublons ou excès inutiles.",
      },
      {
        question: "Puis-je changer de mutuelle si j’en ai déjà une ?",
        answer:
          "Oui, selon votre situation contractuelle. Le rappel permet d’aborder le calendrier et la pertinence d’un changement.",
      },
      {
        question: "Dois-je préciser mes besoins de santé dans le formulaire ?",
        answer:
          "Vous pouvez indiquer les grandes lignes. Le conseiller approfondira ensuite avec vous lors du rappel.",
      },
    ],
    ctaLabel: "Recevoir mon étude mutuelle senior",
  },
  independant: {
    slug: "independant",
    path: "/prevoyance-independant",
    shortTitle: "Prévoyance indépendant",
    eyebrow: "Profil spécifique prévoyance",
    title: "Prévoyance indépendant : sécurisez votre revenu et la continuité de votre activité",
    description:
      "LTA COURTAGE accompagne les indépendants qui veulent protéger leur revenu, anticiper les arrêts de travail et mieux cadrer les garanties essentielles à leur situation professionnelle.",
    seoTitle: "Prévoyance indépendant : protection du revenu",
    seoDescription:
      "Demandez une étude de prévoyance pour indépendant avec LTA COURTAGE afin de protéger votre revenu et votre activité en cas d’aléa.",
    sourceKind: "seo",
    insuranceType: "prevoyance",
    heroHighlights: [
      "Protection du revenu professionnel",
      "Lecture claire des franchises et indemnisations",
      "Approche adaptée à la réalité des indépendants",
    ],
    benefits: [
      {
        title: "Vision orientée activité",
        description: "Nous regardons l’impact réel d’un arrêt de travail sur votre trésorerie personnelle et professionnelle.",
      },
      {
        title: "Garanties hiérarchisées",
        description: "L’approche permet de distinguer les protections réellement prioritaires du confort facultatif.",
      },
      {
        title: "Accompagnement pragmatique",
        description: "Le rappel sert à éclairer la décision plutôt qu’à empiler des options peu lisibles.",
      },
    ],
    differentiators: commonDifferentiators,
    faq: [
      {
        question: "La prévoyance est-elle indispensable quand on est indépendant ?",
        answer:
          "Tout dépend de votre niveau de réserves, de vos charges fixes et de la dépendance de votre revenu à votre présence effective. Dans beaucoup de cas, elle mérite une étude sérieuse.",
      },
      {
        question: "Le site traite-t-il aussi le décès et l’invalidité ?",
        answer:
          "Oui. La demande peut intégrer plusieurs dimensions de protection, selon vos priorités et votre situation familiale.",
      },
      {
        question: "Puis-je être rappelé même si je n’ai pas encore choisi de formule ?",
        answer:
          "Oui. Le formulaire a justement été pensé pour démarrer une réflexion structurée, pas pour exiger un choix déjà arrêté.",
      },
    ],
    ctaLabel: "Recevoir mon étude indépendant",
  },
  about: {
    slug: "about",
    path: "/a-propos",
    shortTitle: "À propos",
    eyebrow: "Cabinet de courtage",
    title: "LTA COURTAGE conçoit un parcours d’assurance plus lisible, plus humain et plus orienté conseil",
    description:
      "Notre cabinet structure la prise de contact autour d’un principe simple : mieux comprendre le besoin de l’assuré pour proposer une orientation pertinente, qu’il s’agisse d’auto, de santé ou de prévoyance.",
    seoTitle: "À propos de LTA COURTAGE",
    seoDescription:
      "Découvrez LTA COURTAGE, cabinet de courtage en assurance orienté accompagnement humain, clarté des offres et qualification rapide des besoins.",
    sourceKind: "contact",
    heroHighlights: [
      "Cabinet orienté clarté, réactivité et proximité commerciale",
      "Spécialités : assurance auto, mutuelle santé et prévoyance",
      "Expérience digitale pensée pour rassurer avant le rappel",
    ],
    benefits: [
      {
        title: "Une culture du conseil utile",
        description: "LTA COURTAGE privilégie l’explication, la contextualisation et la qualité du rappel plutôt qu’une promesse de comparaison déshumanisée.",
      },
      {
        title: "Des parcours conçus pour convertir sans brusquer",
        description: "Le site guide progressivement l’utilisateur vers une prise de contact qualifiée avec des informations simples à renseigner.",
      },
      {
        title: "Une présence nationale à distance",
        description: "Le cabinet accompagne les demandes partout en France via téléphone et parcours en ligne, avec une organisation conçue pour répondre rapidement.",
      },
    ],
    differentiators: commonDifferentiators,
    faq: [
      {
        question: "LTA COURTAGE est-il un comparateur automatique ?",
        answer:
          "Non. Le site s’inspire de la lisibilité des comparateurs, mais la valeur ajoutée repose sur le conseil d’un courtier et sur un rappel humain contextualisé.",
      },
      {
        question: "Quels types de besoins sont traités ?",
        answer:
          "Les demandes les plus fréquentes concernent l’assurance auto, la mutuelle santé et la prévoyance, avec plusieurs profils spécifiques comme malussé, résilié, senior ou indépendant.",
      },
      {
        question: "Pourquoi remplir un formulaire avant d’être rappelé ?",
        answer:
          "Parce qu’un minimum de contexte permet un échange plus efficace et une réponse plus pertinente dès le premier contact.",
      },
    ],
    ctaLabel: "Demander un rappel",
  },
  contact: {
    slug: "contact",
    path: "/contact",
    shortTitle: "Contact",
    eyebrow: "Prise de contact",
    title: "Contactez LTA COURTAGE pour être conseillé rapidement sur votre besoin en assurance",
    description:
      "Appelez directement le cabinet ou laissez votre demande via notre formulaire. L’objectif est de vous recontacter vite avec le bon niveau d’information pour avancer concrètement.",
    seoTitle: "Contact LTA COURTAGE : rappel et étude personnalisée",
    seoDescription:
      "Contactez LTA COURTAGE pour une demande en assurance auto, mutuelle santé ou prévoyance et obtenez un rappel rapide d’un conseiller.",
    sourceKind: "contact",
    heroHighlights: [
      "Numéro visible en permanence sur le site",
      "Demande de rappel simple en quelques étapes",
      "Orientation rapide vers l’univers d’assurance concerné",
    ],
    benefits: [
      {
        title: "Appel direct si votre besoin est urgent",
        description: "Le téléphone reste disponible pour les demandes à forte intention ou nécessitant un échange immédiat.",
      },
      {
        title: "Formulaire utile si vous préférez être rappelé",
        description: "La qualification en ligne permet de préparer l’échange et d’accélérer le traitement de votre demande.",
      },
      {
        title: "Présence claire des coordonnées",
        description: "Adresse, email et téléphone sont visibles et cohérents avec la structure rassurante du site.",
      },
    ],
    differentiators: commonDifferentiators,
    faq: [
      {
        question: "Puis-je être rappelé à un moment précis ?",
        answer:
          "Oui. Le formulaire permet d’indiquer votre préférence de rappel, que le cabinet utilisera comme repère d’organisation.",
      },
      {
        question: "Dois-je avoir tous mes documents avant de faire la demande ?",
        answer:
          "Non. Vous pouvez déjà transmettre votre besoin principal. Les précisions utiles seront reprises lors du rappel.",
      },
      {
        question: "Le cabinet traite-t-il plusieurs besoins à la fois ?",
        answer:
          "Oui. Vous pouvez expliquer votre situation dans le message libre afin que le conseiller prépare mieux son échange.",
      },
    ],
    ctaLabel: "Envoyer ma demande",
  },
  adsForm: {
    slug: "adsForm",
    path: "/devis-assurance-express",
    shortTitle: "Devis express",
    eyebrow: "Landing Google Ads",
    title: "Recevez rapidement une orientation d’assurance avec un formulaire court et rassurant",
    description:
      "Cette landing page concentre l’attention sur la prise de contact : peu de distraction, des arguments de confiance visibles et un parcours de qualification rapide sur mobile comme sur desktop.",
    seoTitle: "Devis assurance express : demande rapide",
    seoDescription:
      "Envoyez une demande rapide d’assurance avec LTA COURTAGE grâce à un formulaire express et un rappel qualifié.",
    sourceKind: "ads_form",
    heroHighlights: [
      "Formulaire multi-étapes court et lisible",
      "Réassurance immédiate avec contact humain visible",
      "Conçu pour la conversion issue de campagnes Google Ads",
    ],
    benefits: [
      {
        title: "Friction minimale",
        description: "Le parcours réduit les champs au strict nécessaire pour favoriser l’envoi sans sacrifier la qualité commerciale du lead.",
      },
      {
        title: "Clarté du message",
        description: "Le visiteur comprend immédiatement ce qu’il obtient : une étude et un rappel, pas un tunnel inutilement complexe.",
      },
      {
        title: "Suivi exploitable",
        description: "Les informations collectées suffisent à contextualiser l’appel de suivi et à mieux prioriser les demandes.",
      },
    ],
    differentiators: commonDifferentiators,
    faq: [
      {
        question: "Le formulaire est-il long ?",
        answer:
          "Non. Il a été conçu pour être rapide à compléter tout en fournissant les éléments essentiels au cabinet.",
      },
      {
        question: "Suis-je rappelé après l’envoi ?",
        answer:
          "Oui. C’est précisément l’objectif de cette page : transformer rapidement votre demande en prise de contact qualifiée.",
      },
      {
        question: "Puis-je préciser mon besoin ?",
        answer:
          "Oui. Le champ libre vous permet de détailler les éléments utiles à la préparation du rappel.",
      },
    ],
    ctaLabel: "Recevoir mon rappel express",
  },
  adsCall: {
    slug: "adsCall",
    path: "/appel-assurance-immediat",
    shortTitle: "Appel immédiat",
    eyebrow: "Landing call-only",
    title: "Parlez tout de suite à un conseiller LTA COURTAGE pour votre besoin en assurance",
    description:
      "Cette page privilégie l’appel immédiat pour les recherches à forte intention. Elle met en avant le téléphone, la disponibilité du cabinet et un argumentaire de confiance rapide à parcourir.",
    seoTitle: "Appel assurance immédiat : conseiller disponible",
    seoDescription:
      "Appelez immédiatement LTA COURTAGE pour une demande en assurance auto, mutuelle santé ou prévoyance et échangez avec un conseiller.",
    sourceKind: "ads_call",
    callOnly: true,
    heroHighlights: [
      "Numéro visible dès le premier écran",
      "Parcours call-only pour intention élevée",
      "Réassurance rapide sur la disponibilité du cabinet",
    ],
    benefits: [
      {
        title: "Contact sans attente inutile",
        description: "La page a été pensée pour supprimer les étapes secondaires et orienter directement vers l’appel.",
      },
      {
        title: "Lisibilité mobile prioritaire",
        description: "Le bouton click-to-call et les messages de confiance restent visibles et simples à comprendre sur smartphone.",
      },
      {
        title: "Cadre rassurant avant l’échange",
        description: "Le visiteur visualise immédiatement le type d’accompagnement proposé avant de lancer l’appel.",
      },
    ],
    differentiators: commonDifferentiators,
    faq: [
      {
        question: "Puis-je appeler depuis mon téléphone en un clic ?",
        answer:
          "Oui. Les boutons click-to-call ont été pensés pour une prise de contact immédiate, notamment sur mobile.",
      },
      {
        question: "Quels sujets puis-je traiter par téléphone ?",
        answer:
          "L’assurance auto, la mutuelle santé, la prévoyance ainsi que des situations plus spécifiques nécessitant un échange rapide.",
      },
      {
        question: "Que faire si je préfère être rappelé ?",
        answer:
          "Vous pouvez utiliser la page de contact ou le formulaire principal si vous souhaitez un rappel plutôt qu’un appel immédiat.",
      },
    ],
    ctaLabel: "Appeler maintenant",
  },
  bonusMalus: {
    slug: "bonusMalus",
    path: "/assurance-auto/bonus-malus",
    shortTitle: "Bonus-malus",
    eyebrow: "Guide assurance auto",
    title: "Bonus-malus assurance auto : tout comprendre sur votre coefficient",
    description:
      "Le coefficient bonus-malus détermine directement le prix de votre assurance auto. LTA COURTAGE vous explique comment il est calculé, comment le récupérer et quelles solutions existent en cas de malus élevé.",
    seoTitle: "Bonus-malus assurance auto : guide complet",
    seoDescription:
      "Découvrez comment fonctionne le bonus-malus auto, comment il évolue après un sinistre et quelles solutions existent pour les conducteurs malussés.",
    sourceKind: "seo",
    insuranceType: "auto",
    heroHighlights: [
      "Calcul du coefficient bonus-malus expliqué simplement",
      "Impact d'un sinistre responsable sur votre prime",
      "Solutions pour retrouver une assurance après malus",
    ],
    benefits: [
      {
        title: "Comprendre votre coefficient actuel",
        description:
          "Votre bonus-malus est un coefficient multiplicateur appliqué à votre prime de référence. À partir de 1.00, il descend à 0.50 (bonus maximal) ou monte jusqu'à 3.50 (malus maximal).",
      },
      {
        title: "Les règles d'évolution après un sinistre",
        description:
          "Chaque sinistre responsable majore le coefficient de 25 %. Un accident à torts partagés entraîne une majoration de 12,5 %. Un sinistre non-responsable ne modifie pas le coefficient.",
      },
      {
        title: "Retrouver une assurance malgré un malus",
        description:
          "Un courtier comme LTA COURTAGE peut orienter votre dossier vers des compagnies spécialisées et vous aider à présenter votre historique de façon structurée pour obtenir une prime acceptable.",
      },
    ],
    differentiators: [
      {
        title: "Lecture claire des contrats",
        description:
          "Nous aidons à arbitrer entre prix, franchise, garanties et exclusions afin d'éviter les choix approximatifs et les mauvaises surprises au moment du sinistre.",
      },
      {
        title: "Accompagnement sur des profils sensibles",
        description:
          "LTA COURTAGE traite aussi les dossiers plus complexes, notamment les besoins après résiliation, malus, changement de situation familiale ou activité indépendante.",
      },
      {
        title: "Expérience pensée pour la conversion utile",
        description:
          "Chaque page articule information, réassurance et prise de contact afin de transformer une recherche d'assurance en échange commercial qualifié.",
      },
    ],
    faq: [
      {
        question: "Mon bonus-malus est-il transférable d'un assureur à l'autre ?",
        answer:
          "Oui. Votre coefficient est personnel et vous suit quel que soit votre assureur. C'est votre relevé d'information qui l'atteste.",
      },
      {
        question: "Combien de temps met-on à récupérer un bonus 0.50 ?",
        answer:
          "Sans sinistre responsable, le coefficient baisse de 5 % par an. Depuis un malus de 1.50, il faut environ 7 à 9 ans sans sinistre pour retrouver le bonus maximal.",
      },
      {
        question: "Peut-on assurer un véhicule avec un malus très élevé ?",
        answer:
          "Oui, sous réserve d'une étude adaptée. En dernier recours, le Bureau Central de Tarification (BCT) peut obliger un assureur à vous couvrir.",
      },
    ],
    ctaLabel: "Être rappelé pour mon dossier auto",
  },
  resiliationAuto: {
    slug: "resiliationAuto",
    path: "/assurance-auto/resiliation",
    shortTitle: "Résilier son assurance",
    eyebrow: "Guide résiliation auto",
    title: "Résilier son assurance auto : démarches, délais et droits",
    description:
      "Changer d'assurance auto n'est plus aussi complexe qu'avant. Depuis la loi Hamon et la loi Châtel, les possibilités de résiliation se sont élargies. LTA COURTAGE vous guide pour changer au bon moment sans rupture de couverture.",
    seoTitle: "Résilier assurance auto : droits et procédure",
    seoDescription:
      "Découvrez comment résilier votre assurance auto facilement grâce à la loi Hamon ou à échéance, et comment trouver un nouveau contrat adapté.",
    sourceKind: "seo",
    insuranceType: "auto",
    heroHighlights: [
      "Résiliation à tout moment après 1 an de contrat (loi Hamon)",
      "Changement sans frais ni démarche complexe",
      "Rappel pour trouver un contrat de remplacement adapté",
    ],
    benefits: [
      {
        title: "Résiliation à l'échéance annuelle",
        description:
          "Vous pouvez toujours résilier votre contrat à sa date anniversaire en respectant un préavis de 2 mois. Votre assureur est tenu de vous notifier cette échéance.",
      },
      {
        title: "Résiliation loi Hamon (après 1 an)",
        description:
          "Depuis 2015, vous pouvez résilier votre assurance auto à tout moment après 12 mois de souscription, sans frais et sans justification. C'est votre nouvel assureur qui s'occupe des démarches.",
      },
      {
        title: "Résiliation pour changement de situation",
        description:
          "Certains événements (vente du véhicule, déménagement, mariage, retraite) ouvrent droit à une résiliation hors délai dans les 3 mois suivant l'événement.",
      },
    ],
    differentiators: [
      {
        title: "Lecture claire des contrats",
        description:
          "Nous aidons à arbitrer entre prix, franchise, garanties et exclusions afin d'éviter les choix approximatifs et les mauvaises surprises au moment du sinistre.",
      },
      {
        title: "Accompagnement sur des profils sensibles",
        description:
          "LTA COURTAGE traite aussi les dossiers plus complexes, notamment les besoins après résiliation, malus, changement de situation familiale ou activité indépendante.",
      },
      {
        title: "Expérience pensée pour la conversion utile",
        description:
          "Chaque page articule information, réassurance et prise de contact afin de transformer une recherche d'assurance en échange commercial qualifié.",
      },
    ],
    faq: [
      {
        question: "Dois-je attendre la fin du contrat pour changer d'assurance ?",
        answer:
          "Non, après 12 mois de contrat, la loi Hamon vous permet de résilier à tout moment. Votre nouvel assureur peut gérer les formalités à votre place.",
      },
      {
        question: "Mon assureur peut-il résilier mon contrat ?",
        answer:
          "Oui, en cas de non-paiement, de sinistre aggravant le risque ou de fausse déclaration. Les raisons et délais sont encadrés par le Code des assurances.",
      },
      {
        question: "Que faire si j'ai été résilié par mon assureur ?",
        answer:
          "Vous pouvez saisir un courtier comme LTA COURTAGE qui vous aidera à repositionner votre dossier et à trouver une alternative crédible, y compris via le BCT.",
      },
    ],
    ctaLabel: "Trouver un contrat de remplacement",
  },
  formulesAuto: {
    slug: "formulesAuto",
    path: "/assurance-auto/formules",
    shortTitle: "Formules auto",
    eyebrow: "Guide assurance auto",
    title: "Assurance auto : tiers, intermédiaire ou tous risques — comment choisir ?",
    description:
      "Choisir la bonne formule d'assurance auto dépend de votre véhicule, de votre profil et de votre usage. LTA COURTAGE vous aide à comparer les niveaux de couverture et à éviter les sous-assurances ou les garanties inutiles.",
    seoTitle: "Formules assurance auto : tiers vs tous risques",
    seoDescription:
      "Comprendre les différences entre l'assurance au tiers, intermédiaire et tous risques pour choisir la couverture la plus adaptée à votre profil.",
    sourceKind: "seo",
    insuranceType: "auto",
    heroHighlights: [
      "Comparatif tiers / intermédiaire / tous risques",
      "Adapter la formule à la valeur et l'usage du véhicule",
      "Rappel conseiller pour affiner votre choix",
    ],
    benefits: [
      {
        title: "Le tiers (responsabilité civile)",
        description:
          "Formule obligatoire minimale. Elle couvre les dommages causés aux tiers mais pas ceux subis par votre propre véhicule. Adaptée aux véhicules anciens ou de faible valeur.",
      },
      {
        title: "La formule intermédiaire",
        description:
          "Elle ajoute généralement le vol, l'incendie, le bris de glace et certains événements climatiques. Un bon compromis pour les véhicules d'occasion de valeur moyenne.",
      },
      {
        title: "Le tous risques",
        description:
          "La couverture la plus complète : elle inclut aussi les dommages à votre propre véhicule, même en cas d'accident responsable. Recommandée pour les véhicules récents ou à crédit.",
      },
    ],
    differentiators: [
      {
        title: "Lecture claire des contrats",
        description:
          "Nous aidons à arbitrer entre prix, franchise, garanties et exclusions afin d'éviter les choix approximatifs et les mauvaises surprises au moment du sinistre.",
      },
      {
        title: "Accompagnement sur des profils sensibles",
        description:
          "LTA COURTAGE traite aussi les dossiers plus complexes, notamment les besoins après résiliation, malus, changement de situation familiale ou activité indépendante.",
      },
      {
        title: "Expérience pensée pour la conversion utile",
        description:
          "Chaque page articule information, réassurance et prise de contact afin de transformer une recherche d'assurance en échange commercial qualifié.",
      },
    ],
    faq: [
      {
        question: "Comment choisir entre tiers et tous risques ?",
        answer:
          "Si la valeur de votre véhicule est inférieure à 5 000 €, une formule tiers est souvent suffisante. Au-delà, l'option intermédiaire ou tous risques est généralement plus rentable.",
      },
      {
        question: "La garantie bris de glace est-elle incluse dans le tiers ?",
        answer:
          "Non. Elle fait partie des garanties optionnelles ou de la formule intermédiaire. Il est possible de l'ajouter en option selon votre contrat.",
      },
      {
        question: "Peut-on changer de formule en cours de contrat ?",
        answer:
          "Oui, généralement à tout moment. Une montée en niveau de couverture est possible immédiatement, une baisse peut nécessiter de respecter des conditions contractuelles.",
      },
    ],
    ctaLabel: "Choisir ma formule avec un conseiller",
  },
};

export const seoPages = [
  pageContentBySlug.auto,
  pageContentBySlug.sante,
  pageContentBySlug.prevoyance,
  pageContentBySlug.malusse,
  pageContentBySlug.resilie,
  pageContentBySlug.jeuneConducteur,
  pageContentBySlug.senior,
  pageContentBySlug.independant,
];

