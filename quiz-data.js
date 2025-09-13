// Configuration des données pour les 3 types d'évaluations
const assessmentData = {
    1: {
        title: "Profil BA Camerounais",
        description: "Évaluation basée sur les données des enquêtes IIBA Cameroun 2023-2024",
        questions: [
            {
                id: 1,
                category: "Expérience Professionnelle",
                question: "Combien d'années d'expérience avez-vous en Business Analysis ?",
                type: "single",
                options: [
                    { value: "0-1", text: "Moins de 2 ans (Junior)", score: 1 },
                    { value: "2-5", text: "2-5 ans (Intermédiaire)", score: 3 },
                    { value: "5-10", text: "5-10 ans (Expérimenté)", score: 4 },
                    { value: "10+", text: "Plus de 10 ans (Senior)", score: 5 }
                ]
            },
            {
                id: 2,
                category: "Secteur d'Activité",
                question: "Dans quel(s) secteur(s) avez-vous principalement travaillé ?",
                type: "multiple",
                options: [
                    { value: "banking", text: "Banque/Finance", score: 2, prevalence: 35 },
                    { value: "telecom", text: "Télécommunications", score: 2, prevalence: 25 },
                    { value: "energy", text: "Énergie/Pétrole", score: 2, prevalence: 15 },
                    { value: "public", text: "Secteur Public", score: 1, prevalence: 10 },
                    { value: "manufacturing", text: "Industrie/Manufacturing", score: 1, prevalence: 8 },
                    { value: "other", text: "Autres secteurs", score: 1, prevalence: 7 }
                ]
            },
            {
                id: 3,
                category: "Formation",
                question: "Quel est votre niveau de formation le plus élevé ?",
                type: "single",
                options: [
                    { value: "bachelor", text: "Licence/Bachelor", score: 2 },
                    { value: "master", text: "Master/Ingénieur", score: 3 },
                    { value: "phd", text: "Doctorat", score: 4 },
                    { value: "other", text: "Autre formation professionnelle", score: 1 }
                ]
            },
            {
                id: 4,
                category: "Certifications",
                question: "Possédez-vous une certification IIBA ?",
                type: "single",
                options: [
                    { value: "none", text: "Aucune certification", score: 1 },
                    { value: "ecba", text: "ECBA", score: 3 },
                    { value: "ccba", text: "CCBA", score: 4 },
                    { value: "cbap", text: "CBAP", score: 5 },
                    { value: "planning", text: "En préparation", score: 2 }
                ]
            },
            {
                id: 5,
                category: "Outils Techniques",
                question: "Quels outils utilisez-vous régulièrement ?",
                type: "multiple",
                options: [
                    { value: "excel", text: "Microsoft Excel", score: 1, prevalence: 85 },
                    { value: "visio", text: "Microsoft Visio", score: 2, prevalence: 60 },
                    { value: "powerbi", text: "Power BI", score: 2, prevalence: 45 },
                    { value: "jira", text: "Jira", score: 2, prevalence: 40 },
                    { value: "confluence", text: "Confluence", score: 2, prevalence: 35 },
                    { value: "sql", text: "SQL", score: 3, prevalence: 30 }
                ]
            },
            {
                id: 6,
                category: "Compétences Linguistiques",
                question: "Dans quelles langues travaillez-vous couramment ?",
                type: "multiple",
                options: [
                    { value: "french", text: "Français", score: 1, prevalence: 95 },
                    { value: "english", text: "Anglais", score: 2, prevalence: 75 },
                    { value: "local", text: "Langues locales", score: 1, prevalence: 60 },
                    { value: "other", text: "Autres langues internationales", score: 2, prevalence: 20 }
                ]
            },
            {
                id: 7,
                category: "Défis Professionnels",
                question: "Quel est votre principal défi en tant que BA au Cameroun ?",
                type: "single",
                options: [
                    { value: "recognition", text: "Reconnaissance du rôle BA", score: 3 },
                    { value: "tools", text: "Accès aux outils modernes", score: 2 },
                    { value: "training", text: "Formation continue", score: 2 },
                    { value: "stakeholders", text: "Gestion des parties prenantes", score: 3 },
                    { value: "documentation", text: "Qualité de la documentation", score: 1 }
                ]
            },
            {
                id: 8,
                category: "Aspirations",
                question: "Où vous voyez-vous dans 3 ans ?",
                type: "single",
                options: [
                    { value: "senior_ba", text: "Senior Business Analyst", score: 2 },
                    { value: "lead_ba", text: "Lead Business Analyst", score: 3 },
                    { value: "manager", text: "Manager/Chef de projet", score: 3 },
                    { value: "consultant", text: "Consultant indépendant", score: 4 },
                    { value: "other", text: "Autre domaine", score: 1 }
                ]
            }
        ]
    },
    2: {
        title: "IIBA Adapté Cameroun",
        description: "Questionnaire basé sur le BABOK v3 adapté au contexte camerounais",
        questions: [
            {
                id: 1,
                category: "Planification BA",
                question: "Comment planifiez-vous vos activités de Business Analysis ?",
                type: "single",
                options: [
                    { value: "informal", text: "Approche informelle, selon les besoins", score: 1 },
                    { value: "basic", text: "Planification de base avec calendrier", score: 2 },
                    { value: "structured", text: "Approche structurée avec méthodologies", score: 3 },
                    { value: "advanced", text: "Planification avancée intégrée au PMO", score: 4 }
                ]
            },
            {
                id: 2,
                category: "Élicitation",
                question: "Quelles techniques d'élicitation maîtrisez-vous le mieux ?",
                type: "multiple",
                options: [
                    { value: "interviews", text: "Entretiens individuels", score: 2 },
                    { value: "workshops", text: "Ateliers de groupe", score: 3 },
                    { value: "observation", text: "Observation sur le terrain", score: 2 },
                    { value: "surveys", text: "Enquêtes/Questionnaires", score: 1 },
                    { value: "brainstorming", text: "Brainstorming", score: 2 },
                    { value: "prototyping", text: "Prototypage", score: 3 }
                ]
            },
            {
                id: 3,
                category: "Gestion Exigences",
                question: "Comment gérez-vous le cycle de vie des exigences ?",
                type: "single",
                options: [
                    { value: "basic", text: "Documents Word/Excel basiques", score: 1 },
                    { value: "templates", text: "Templates structurés", score: 2 },
                    { value: "tools", text: "Outils dédiés (Jira, Azure DevOps)", score: 3 },
                    { value: "integrated", text: "Processus intégré avec traçabilité", score: 4 }
                ]
            },
            {
                id: 4,
                category: "Analyse Stratégique",
                question: "Participez-vous à l'analyse stratégique de votre organisation ?",
                type: "single",
                options: [
                    { value: "none", text: "Pas d'implication stratégique", score: 1 },
                    { value: "occasional", text: "Participation occasionnelle", score: 2 },
                    { value: "regular", text: "Implication régulière", score: 3 },
                    { value: "lead", text: "Je pilote des analyses stratégiques", score: 4 }
                ]
            },
            {
                id: 5,
                category: "Contexte Multiculturel",
                question: "Comment adaptez-vous votre approche au contexte multiculturel camerounais ?",
                type: "multiple",
                options: [
                    { value: "languages", text: "Utilisation des langues locales", score: 2 },
                    { value: "customs", text: "Respect des coutumes locales", score: 2 },
                    { value: "hierarchies", text: "Adaptation aux hiérarchies traditionnelles", score: 3 },
                    { value: "communication", text: "Styles de communication adaptés", score: 3 },
                    { value: "none", text: "Approche standardisée uniquement", score: 1 }
                ]
            },
            {
                id: 6,
                category: "Évaluation Solutions",
                question: "Comment évaluez-vous les solutions proposées ?",
                type: "single",
                options: [
                    { value: "basic", text: "Évaluation informelle/intuitive", score: 1 },
                    { value: "criteria", text: "Critères définis mais basiques", score: 2 },
                    { value: "structured", text: "Matrice de décision structurée", score: 3 },
                    { value: "advanced", text: "Analyse coût-bénéfice approfondie", score: 4 }
                ]
            }
        ]
    },
    3: {
        title: "Mixte DISC + BABOK",
        description: "Évaluation combinant le profil DISC, les compétences BABOK et le contexte camerounais",
        questions: [
            // Questions DISC
            {
                id: 1,
                category: "DISC - Dominance",
                question: "Face à un problème complexe, vous préférez :",
                type: "single",
                options: [
                    { value: "take_charge", text: "Prendre les choses en main rapidement", score: 4, disc: "D" },
                    { value: "discuss", text: "En discuter avec l'équipe d'abord", score: 2, disc: "I" },
                    { value: "analyze", text: "Analyser en profondeur avant d'agir", score: 1, disc: "C" },
                    { value: "support", text: "Soutenir la décision du groupe", score: 3, disc: "S" }
                ]
            },
            {
                id: 2,
                category: "DISC - Influence",
                question: "Lors de réunions avec les parties prenantes, vous :",
                type: "single",
                options: [
                    { value: "lead", text: "Dirigez naturellement la discussion", score: 1, disc: "D" },
                    { value: "engage", text: "Engagez activement tous les participants", score: 4, disc: "I" },
                    { value: "listen", text: "Écoutez et prenez des notes détaillées", score: 3, disc: "C" },
                    { value: "facilitate", text: "Facilitez les échanges calmement", score: 2, disc: "S" }
                ]
            },
            {
                id: 3,
                category: "DISC - Stabilité",
                question: "Face aux changements organisationnels, vous :",
                type: "single",
                options: [
                    { value: "adapt_fast", text: "Vous adaptez rapidement", score: 2, disc: "D" },
                    { value: "embrace", text: "Embrassez le changement avec enthousiasme", score: 3, disc: "I" },
                    { value: "need_time", text: "Avez besoin de temps pour vous adapter", score: 4, disc: "S" },
                    { value: "plan_carefully", text: "Planifiez soigneusement la transition", score: 1, disc: "C" }
                ]
            },
            {
                id: 4,
                category: "DISC - Conformité",
                question: "Pour la documentation de vos livrables :",
                type: "single",
                options: [
                    { value: "results_focus", text: "Vous focalisez sur les résultats", score: 3, disc: "D" },
                    { value: "visual_engaging", text: "Privilégiez le visuel et l'engagement", score: 2, disc: "I" },
                    { value: "collaborative", text: "Travaillez en collaboration", score: 1, disc: "S" },
                    { value: "detailed_accurate", text: "Êtes très détaillé et précis", score: 4, disc: "C" }
                ]
            },
            // Questions compétences sous-jacentes BABOK
            {
                id: 5,
                category: "Pensée Analytique",
                question: "Comment abordez-vous la résolution de problèmes complexes ?",
                type: "single",
                options: [
                    { value: "decompose", text: "Je décompose en sous-problèmes", score: 4 },
                    { value: "brainstorm", text: "J'organise des sessions créatives", score: 3 },
                    { value: "research", text: "Je fais des recherches approfondies", score: 3 },
                    { value: "intuition", text: "Je fais confiance à mon intuition", score: 2 }
                ]
            },
            {
                id: 6,
                category: "Connaissances Métier",
                question: "Votre connaissance des secteurs camerounais vous permet de :",
                type: "multiple",
                options: [
                    { value: "regulations", text: "Naviguer dans les réglementations locales", score: 3 },
                    { value: "stakeholders", text: "Identifier les bonnes parties prenantes", score: 3 },
                    { value: "cultural", text: "Adapter vos approches culturellement", score: 2 },
                    { value: "benchmarks", text: "Proposer des benchmarks locaux", score: 2 }
                ]
            },
            {
                id: 7,
                category: "Compétences Interaction",
                question: "Dans un contexte camerounais, vous excellez à :",
                type: "multiple",
                options: [
                    { value: "facilitation", text: "Faciliter des réunions multiculturelles", score: 3 },
                    { value: "negotiation", text: "Négocier avec respect des hiérarchies", score: 3 },
                    { value: "leadership", text: "Exercer un leadership adaptatif", score: 2 },
                    { value: "teamwork", text: "Travailler en équipe diverse", score: 2 }
                ]
            },
            {
                id: 8,
                category: "Alignement Profil Local",
                question: "Votre style de travail correspond le mieux à :",
                type: "single",
                options: [
                    { value: "structured", text: "Approche structurée avec processus clairs", score: 3 },
                    { value: "flexible", text: "Adaptation flexible aux contextes", score: 4 },
                    { value: "collaborative", text: "Collaboration intensive", score: 3 },
                    { value: "results", text: "Orientation forte résultats", score: 2 }
                ]
            }
        ]
    }
};

// Profil type du BA camerounais (basé sur les enquêtes)
const cameroonianBAProfile = {
    experience: { junior: 35, intermediate: 49, senior: 16 },
    sectors: { banking: 35, telecom: 25, energy: 15, public: 10, manufacturing: 8, other: 7 },
    tools: { excel: 85, visio: 60, powerbi: 45, jira: 40, confluence: 35, sql: 30 },
    languages: { french: 95, english: 75, local: 60 },
    challenges: { recognition: 40, tools: 25, training: 20, stakeholders: 15 },
    aspirations: { senior_ba: 30, lead_ba: 25, manager: 25, consultant: 15, other: 5 },
    discProfile: { D: 25, I: 30, S: 35, C: 10 } // Profil DISC moyen des BA camerounais
};

// Recommandations basées sur les profils
const recommendations = {
    experience: {
        low: [
            "Rejoignez la communauté IIBA Cameroun pour le networking",
            "Participez aux webinaires 'BA pour les nuls' du lundi soir",
            "Envisagez la formation de 3 mois IIBA Cameroun"
        ],
        medium: [
            "Préparez-vous pour la certification ECBA ou CCBA",
            "Développez votre expertise dans un secteur spécifique",
            "Mentoriser les juniors BA"
        ],
        high: [
            "Visez la certification CBAP",
            "Devenez formateur ou mentor IIBA Cameroun",
            "Lancez-vous en consulting indépendant"
        ]
    },
    tools: {
        low: [
            "Maîtrisez Excel et Power BI pour l'analyse de données",
            "Apprenez Visio pour la modélisation de processus",
            "Familiarisez-vous avec Jira pour la gestion d'exigences"
        ],
        medium: [
            "Explorez les outils cloud (Azure DevOps, Confluence)",
            "Développez des compétences en SQL",
            "Maîtrisez les techniques de modélisation avancées"
        ],
        high: [
            "Partagez vos bonnes pratiques avec la communauté",
            "Formez d'autres professionnels sur les outils",
            "Évaluez et recommandez de nouveaux outils"
        ]
    },
    disc: {
        D: [
            "Développez votre patience pour l'écoute active",
            "Travaillez sur la collaboration plutôt que la directive",
            "Utilisez votre leadership pour motiver les équipes"
        ],
        I: [
            "Structurez davantage vos livrables",
            "Développez vos compétences analytiques",
            "Utilisez votre charisme pour l'adoption du changement"
        ],
        S: [
            "Développez votre assertivité dans les négociations",
            "Prenez plus d'initiatives dans les projets",
            "Utilisez votre stabilité pour rassurer les équipes"
        ],
        C: [
            "Travaillez sur vos compétences de présentation",
            "Développez votre flexibilité face au changement",
            "Utilisez votre précision pour améliorer la qualité"
        ]
    }
};