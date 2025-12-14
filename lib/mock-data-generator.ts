import { Mission, Company, Feedback } from './types';

// Mapping des secteurs vers les ODD pertinents
const secteurToSDGs: { [key: string]: string[] } = {
  'Technologie': ['ODD 4', 'ODD 8', 'ODD 9', 'ODD 11'],
  'Finance': ['ODD 4', 'ODD 5', 'ODD 8', 'ODD 10'],
  'Énergie': ['ODD 7', 'ODD 13', 'ODD 15'],
  'Distribution': ['ODD 2', 'ODD 12', 'ODD 13'],
  'Santé': ['ODD 3', 'ODD 6', 'ODD 10'],
  'Éducation': ['ODD 4', 'ODD 5', 'ODD 10'],
  'Industrie': ['ODD 8', 'ODD 9', 'ODD 12', 'ODD 13'],
  'Services': ['ODD 4', 'ODD 8', 'ODD 10'],
  'Immobilier': ['ODD 11', 'ODD 13', 'ODD 15'],
  'Transport': ['ODD 11', 'ODD 13', 'ODD 15'],
};

// Descriptions de missions par secteur
const secteurMissions: { [key: string]: { title: string; description: string; objective: string; sdg: string; region: string }[] } = {
  'Technologie': [
    {
      title: 'Formation en compétences numériques',
      description: 'Programme de formation aux outils numériques pour les jeunes défavorisés',
      objective: 'Réduire la fracture numérique et améliorer l\'employabilité',
      sdg: 'ODD 4 – Éducation de qualité',
      region: 'Tunis'
    },
    {
      title: 'Installation de salles informatiques',
      description: 'Équipement d\'écoles en matériel informatique et connexion internet',
      objective: 'Faciliter l\'accès à l\'éducation numérique',
      sdg: 'ODD 4 – Éducation de qualité',
      region: 'Sfax'
    },
    {
      title: 'Hackathon pour l\'innovation sociale',
      description: 'Compétition de développement d\'applications pour résoudre des problèmes sociaux',
      objective: 'Encourager l\'innovation et l\'entrepreneuriat social',
      sdg: 'ODD 8 – Travail décent et croissance économique',
      region: 'Tunis'
    }
  ],
  'Finance': [
    {
      title: 'Programme de microfinance pour femmes',
      description: 'Accès au crédit et formation en gestion financière pour entrepreneures',
      objective: 'Autonomiser les femmes et promouvoir l\'égalité des genres',
      sdg: 'ODD 5 – Égalité entre les sexes',
      region: 'Tunis'
    },
    {
      title: 'Formation en éducation financière',
      description: 'Sensibilisation à la gestion budgétaire et à l\'épargne',
      objective: 'Améliorer la littératie financière des populations',
      sdg: 'ODD 4 – Éducation de qualité',
      region: 'Sousse'
    },
    {
      title: 'Soutien à l\'entrepreneuriat jeune',
      description: 'Accompagnement et financement de projets de jeunes entrepreneurs',
      objective: 'Créer des opportunités d\'emploi et de croissance',
      sdg: 'ODD 8 – Travail décent et croissance économique',
      region: 'Sfax'
    }
  ],
  'Énergie': [
    {
      title: 'Installation de panneaux solaires',
      description: 'Électrification de villages isolés avec énergie renouvelable',
      objective: 'Assurer l\'accès à une énergie propre et abordable',
      sdg: 'ODD 7 – Énergie propre et d\'un coût abordable',
      region: 'Gafsa'
    },
    {
      title: 'Programme d\'efficacité énergétique',
      description: 'Sensibilisation et installation d\'équipements économes en énergie',
      objective: 'Réduire la consommation énergétique et les émissions',
      sdg: 'ODD 13 – Mesures relatives à la lutte contre les changements climatiques',
      region: 'Tunis'
    },
    {
      title: 'Reboisement et protection des forêts',
      description: 'Plantation d\'arbres et protection des écosystèmes forestiers',
      objective: 'Lutter contre le changement climatique et préserver la biodiversité',
      sdg: 'ODD 15 – Vie terrestre',
      region: 'Kasserine'
    }
  ],
  'Distribution': [
    {
      title: 'Lutte contre le gaspillage alimentaire',
      description: 'Collecte et redistribution de produits alimentaires invendus',
      objective: 'Réduire le gaspillage et lutter contre la faim',
      sdg: 'ODD 2 – Faim zéro',
      region: 'Tunis'
    },
    {
      title: 'Programme de tri sélectif',
      description: 'Installation de points de collecte et sensibilisation au recyclage',
      objective: 'Promouvoir une consommation et une production responsables',
      sdg: 'ODD 12 – Consommation et production responsables',
      region: 'Sfax'
    },
    {
      title: 'Distribution de produits de première nécessité',
      description: 'Aide alimentaire et produits d\'hygiène pour familles démunies',
      objective: 'Améliorer les conditions de vie des populations vulnérables',
      sdg: 'ODD 2 – Faim zéro',
      region: 'Sousse'
    }
  ],
  'Santé': [
    {
      title: 'Campagne de sensibilisation santé',
      description: 'Ateliers de prévention et dépistage gratuit',
      objective: 'Améliorer l\'accès aux soins et la prévention',
      sdg: 'ODD 3 – Bonne santé et bien-être',
      region: 'Tunis'
    },
    {
      title: 'Équipement de centres de santé',
      description: 'Don de matériel médical et formation du personnel',
      objective: 'Renforcer les capacités des structures de santé',
      sdg: 'ODD 3 – Bonne santé et bien-être',
      region: 'Sfax'
    },
    {
      title: 'Programme d\'accès à l\'eau potable',
      description: 'Installation de systèmes de filtration d\'eau dans les zones rurales',
      objective: 'Garantir l\'accès à l\'eau potable et à l\'assainissement',
      sdg: 'ODD 6 – Eau propre et assainissement',
      region: 'Gafsa'
    }
  ],
  'Éducation': [
    {
      title: 'Réhabilitation d\'écoles',
      description: 'Rénovation et équipement d\'établissements scolaires',
      objective: 'Améliorer les conditions d\'apprentissage',
      sdg: 'ODD 4 – Éducation de qualité',
      region: 'Sidi Bouzid'
    },
    {
      title: 'Programme de soutien scolaire',
      description: 'Cours de soutien et accompagnement pédagogique',
      objective: 'Réduire le décrochage scolaire',
      sdg: 'ODD 4 – Éducation de qualité',
      region: 'Tunis'
    },
    {
      title: 'Formation professionnelle',
      description: 'Formation aux métiers pour jeunes sans emploi',
      objective: 'Améliorer l\'employabilité et l\'insertion professionnelle',
      sdg: 'ODD 4 – Éducation de qualité',
      region: 'Sfax'
    }
  ],
  'Industrie': [
    {
      title: 'Programme de formation professionnelle',
      description: 'Formation aux métiers industriels et techniques',
      objective: 'Développer les compétences et créer des emplois',
      sdg: 'ODD 8 – Travail décent et croissance économique',
      region: 'Sfax'
    },
    {
      title: 'Réduction des déchets industriels',
      description: 'Optimisation des processus et recyclage des déchets',
      objective: 'Promouvoir une production durable',
      sdg: 'ODD 12 – Consommation et production responsables',
      region: 'Tunis'
    },
    {
      title: 'Amélioration de la sécurité au travail',
      description: 'Formation et équipement pour la sécurité des travailleurs',
      objective: 'Protéger les travailleurs et améliorer les conditions de travail',
      sdg: 'ODD 8 – Travail décent et croissance économique',
      region: 'Sousse'
    }
  ],
  'Services': [
    {
      title: 'Formation en compétences professionnelles',
      description: 'Développement des compétences pour le secteur des services',
      objective: 'Améliorer l\'employabilité dans les services',
      sdg: 'ODD 4 – Éducation de qualité',
      region: 'Tunis'
    },
    {
      title: 'Programme d\'insertion professionnelle',
      description: 'Accompagnement vers l\'emploi pour personnes en difficulté',
      objective: 'Réduire les inégalités et promouvoir l\'inclusion',
      sdg: 'ODD 10 – Inégalités réduites',
      region: 'Sfax'
    }
  ],
  'Immobilier': [
    {
      title: 'Rénovation de logements sociaux',
      description: 'Réhabilitation de logements pour familles défavorisées',
      objective: 'Améliorer les conditions de vie et l\'accès au logement',
      sdg: 'ODD 11 – Villes et communautés durables',
      region: 'Tunis'
    },
    {
      title: 'Construction écologique',
      description: 'Promotion de techniques de construction durables',
      objective: 'Réduire l\'impact environnemental du secteur',
      sdg: 'ODD 13 – Mesures relatives à la lutte contre les changements climatiques',
      region: 'Sfax'
    }
  ],
  'Transport': [
    {
      title: 'Promotion de la mobilité durable',
      description: 'Installation de pistes cyclables et promotion du transport en commun',
      objective: 'Réduire les émissions et améliorer la qualité de l\'air',
      sdg: 'ODD 11 – Villes et communautés durables',
      region: 'Tunis'
    },
    {
      title: 'Programme de véhicules électriques',
      description: 'Sensibilisation et incitation à l\'utilisation de véhicules propres',
      objective: 'Lutter contre le changement climatique',
      sdg: 'ODD 13 – Mesures relatives à la lutte contre les changements climatiques',
      region: 'Sfax'
    }
  ]
};

// ONGs par secteur (basées sur les ODD pertinents)
const secteurNGOs: { [key: string]: string[] } = {
  'Technologie': ['UNICEF Tunisie', 'Croissant Rouge Tunisien'],
  'Finance': ['Croissant Rouge Tunisien', 'Association Tunisienne pour la Protection de la Nature'],
  'Énergie': ['Association Tunisienne pour la Protection de la Nature', 'WWF Tunisie'],
  'Distribution': ['Croissant Rouge Tunisien', 'Banque Alimentaire Tunisie'],
  'Santé': ['Croissant Rouge Tunisien', 'UNICEF Tunisie'],
  'Éducation': ['UNICEF Tunisie', 'Croissant Rouge Tunisien'],
  'Industrie': ['Association Tunisienne pour la Protection de la Nature', 'Croissant Rouge Tunisien'],
  'Services': ['Croissant Rouge Tunisien', 'UNICEF Tunisie'],
  'Immobilier': ['Association Tunisienne pour la Protection de la Nature', 'WWF Tunisie'],
  'Transport': ['Association Tunisienne pour la Protection de la Nature', 'WWF Tunisie'],
};

export function generateMockDataForCompany(companyName: string, secteur: string): {
  missions: Mission[];
  feedbacks: Feedback[];
  company: Company;
} {
  const sdgs = secteurToSDGs[secteur] || ['ODD 4', 'ODD 8', 'ODD 13'];
  const missionTemplates = secteurMissions[secteur] || secteurMissions['Services'];
  const ngos = secteurNGOs[secteur] || ['Croissant Rouge Tunisien'];

  // Générer 3-5 missions mock
  const numMissions = Math.floor(Math.random() * 3) + 3;
  const missions: Mission[] = [];
  const feedbacks: Feedback[] = [];
  
  let missionId = 1000; // IDs élevés pour éviter les conflits

  for (let i = 0; i < numMissions; i++) {
    const template = missionTemplates[i % missionTemplates.length];
    const participants = Math.floor(Math.random() * 100) + 30;
    const ngo = ngos[Math.floor(Math.random() * ngos.length)];
    const date = new Date();
    date.setMonth(date.getMonth() - Math.floor(Math.random() * 6));
    
    const mission: Mission = {
      id: missionId++,
      title: template.title,
      ngo: ngo,
      sdg: template.sdg,
      region: template.region,
      date: date.toISOString().split('T')[0],
      participants: participants,
      companies: [companyName],
      status: Math.random() > 0.5 ? 'Terminée' : 'En cours',
      description: template.description,
      objective: template.objective,
    };

    missions.push(mission);

    // Générer 2-4 feedbacks par mission
    const numFeedbacks = Math.floor(Math.random() * 3) + 2;
    const userNames = ['Ahmed Ben Ali', 'Fatma Trabelsi', 'Mohamed Jebali', 'Salma Khelifi', 'Youssef Hammami'];
    const userIcons = [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    ];

    for (let j = 0; j < numFeedbacks; j++) {
      const feedbackDate = new Date(mission.date);
      feedbackDate.setDate(feedbackDate.getDate() + Math.floor(Math.random() * 30));
      
      feedbacks.push({
        id: missionId * 100 + j,
        userId: `user_${j}`,
        userName: userNames[j % userNames.length],
        userIcon: userIcons[j % userIcons.length],
        rating: Math.floor(Math.random() * 2) + 4, // 4 ou 5
        comment: [
          'Mission très enrichissante et bien organisée !',
          'Excellente expérience, je recommande vivement.',
          'Impact réel et mesurable, bravo à l\'équipe !',
          'Superbe initiative, j\'ai appris beaucoup.',
          'Engagement concret et résultats visibles.',
        ][j % 5],
        date: feedbackDate.toISOString().split('T')[0],
        missionId: mission.id,
      });
    }
  }

  const totalEmployees = missions.reduce((sum, m) => sum + Math.floor(m.participants * 0.3), 0);
  const timeline: any[] = missions.slice(0, 3).map((m, idx) => ({
    date: m.date,
    event: `Participation à "${m.title}"`,
    mission: m.title,
  }));

  const company: Company = {
    name: companyName,
    employees_engaged: totalEmployees,
    missions: missions.length,
    sdgs: sdgs,
    description: `Entreprise du secteur ${secteur} engagée dans la RSE et l'impact social.`,
    timeline: timeline,
    secteur: secteur,
  };

  return { missions, feedbacks, company };
}

