# Impact Visible Tunisia

Plateforme frontend pour visualiser l'impact social et environnemental des ONG et entreprises en Tunisie.

## 🚀 Fonctionnalités

- **Visualisation de l'impact** : KPIs, graphiques, cartes interactives
- **Gestion des missions** : Liste, détails, filtres
- **Dashboards par rôle** : Utilisateur, ONG, Entreprise
- **Analyse IA** : Analyse intelligente des données avec DeepSeek V3.1 (réservé aux entreprises)
- **Génération de rapports PDF** : Rapports RSE automatisés
- **Leaderboard** : Classement des ONG
- **Feedbacks** : Système d'avis et de notation

## 🛠️ Technologies

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Recharts (graphiques)
- Leaflet (cartes)
- jsPDF (génération PDF)
- OpenRouter API (DeepSeek V3.1)

## 📦 Installation

```bash
npm install
```

## ⚙️ Configuration

### API OpenRouter (pour l'analyse IA)

Créez un fichier `.env.local` à la racine du projet :

```env
OPENROUTER_API_KEY=votre_clé_api_ici
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Pour obtenir une clé API OpenRouter :
1. Visitez [OpenRouter](https://openrouter.ai/)
2. Créez un compte
3. Générez une clé API
4. Ajoutez-la dans `.env.local`

## 🏃 Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🏗️ Build

```bash
npm run build
npm start
```

## 📁 Structure du projet

```
/
├── app/                    # Pages Next.js
│   ├── api/               # Routes API
│   ├── dashboard/         # Dashboards par rôle
│   ├── missions/          # Pages missions
│   └── ...
├── components/            # Composants React
│   ├── ui/               # Composants UI
│   ├── charts/           # Graphiques
│   └── ...
├── lib/                   # Utilitaires
│   ├── ai-service.ts     # Service IA
│   ├── data.ts           # Gestion données
│   └── ...
└── public/
    └── data/             # Données mock JSON
```

## 🤖 Fonctionnalité IA (Entreprises uniquement)

L'analyse IA utilise le modèle DeepSeek V3.1 via OpenRouter pour :
- Analyser les missions et feedbacks
- Générer des statistiques et insights
- Créer des recommandations stratégiques
- Générer des rapports PDF professionnels

Accès : Dashboard Entreprise → Section "Analyse IA de l'impact RSE"

## 📊 Données Mock

Les données sont stockées dans `/public/data/` :
- `missions.json` : Missions d'impact
- `ngos.json` : Organisations
- `companies.json` : Entreprises
- `feedbacks.json` : Avis utilisateurs
- `top-participants.json` : Meilleurs participants
- `regions.json` : Données géographiques

## 🚢 Déploiement

Le projet est prêt pour le déploiement sur Vercel.

### Déploiement Rapide

1. **Connectez votre dépôt GitHub à Vercel** :
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "Add New Project"
   - Importez le dépôt : `https://github.com/Jizel14/Open-Act.git`

2. **Ajoutez les variables d'environnement** :
   - `OPENROUTER_API_KEY` : `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`
   - `NEXT_PUBLIC_SITE_URL` : sera défini automatiquement par Vercel

3. **Déployez !** Vercel détectera automatiquement Next.js et déploiera.

📖 **Guide détaillé** : Voir [DEPLOYMENT.md](./DEPLOYMENT.md) pour les instructions complètes.

## 📝 Licence

Ce projet est un projet de démonstration.

