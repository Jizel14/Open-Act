# 🚀 Guide de Déploiement sur Vercel

## ✅ Prérequis

- Compte GitHub : ✅ (Jizel14)
- Dépôt GitHub : ✅ (https://github.com/Jizel14/Open-Act.git)
- Compte Vercel : À créer sur [vercel.com](https://vercel.com)

## 📋 Étapes de Déploiement

### 1. Créer un compte Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Sign Up"**
3. Choisissez **"Continue with GitHub"**
4. Autorisez Vercel à accéder à votre compte GitHub

### 2. Importer le Projet

1. Dans le dashboard Vercel, cliquez sur **"Add New..."** → **"Project"**
2. Sélectionnez le dépôt **"Open-Act"** (https://github.com/Jizel14/Open-Act.git)
3. Vercel détectera automatiquement que c'est un projet Next.js

### 3. Configuration du Projet

Vercel détectera automatiquement :
- **Framework Preset** : Next.js
- **Root Directory** : `./` (racine)
- **Build Command** : `npm run build` (automatique)
- **Output Directory** : `.next` (automatique)
- **Install Command** : `npm install` (automatique)

### 4. Variables d'Environnement

**⚠️ IMPORTANT :** Ajoutez ces variables d'environnement dans Vercel :

1. Dans la section **"Environment Variables"**, ajoutez :

   ```
   OPENROUTER_API_KEY = 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
   ```

2. Pour `NEXT_PUBLIC_SITE_URL`, Vercel le définira automatiquement, mais vous pouvez l'ajouter manuellement après le premier déploiement :
   ```
   NEXT_PUBLIC_SITE_URL = https://votre-projet.vercel.app
   ```

### 5. Déployer

1. Cliquez sur **"Deploy"**
2. Vercel va :
   - Installer les dépendances
   - Builder le projet
   - Déployer l'application
3. Le déploiement prend généralement 2-3 minutes

### 6. Vérifier le Déploiement

Une fois le déploiement terminé :
- Vous recevrez une URL : `https://votre-projet.vercel.app`
- Cliquez sur **"Visit"** pour voir votre application en ligne

## 🔄 Déploiements Automatiques

Vercel déploiera automatiquement :
- ✅ Chaque push sur `main` → **Production**
- ✅ Chaque pull request → **Preview Deployment**

## 🔧 Configuration Post-Déploiement

### Mettre à jour NEXT_PUBLIC_SITE_URL

1. Allez dans **Settings** → **Environment Variables**
2. Ajoutez ou modifiez :
   ```
   NEXT_PUBLIC_SITE_URL = https://votre-projet.vercel.app
   ```
3. Redéployez (ou attendez le prochain push)

## 📝 Commandes Utiles

### Déploiement Local avec Vercel CLI (optionnel)

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
```

## 🐛 Dépannage

### Erreur de Build

- Vérifiez que toutes les dépendances sont dans `package.json`
- Vérifiez les logs de build dans Vercel Dashboard

### Variables d'Environnement

- Assurez-vous que `OPENROUTER_API_KEY` est bien définie
- Les variables doivent être ajoutées pour **Production**, **Preview**, et **Development**

### Erreur 404 sur les Routes API

- Vérifiez que les routes API sont dans `app/api/`
- Vérifiez les logs de fonction serverless dans Vercel

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Next.js sur Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Variables d'environnement Vercel](https://vercel.com/docs/environment-variables)

## ✅ Checklist de Déploiement

- [x] Code poussé sur GitHub
- [ ] Compte Vercel créé
- [ ] Projet importé depuis GitHub
- [ ] Variable `OPENROUTER_API_KEY` ajoutée
- [ ] Déploiement réussi
- [ ] Application accessible en ligne
- [ ] Test de l'analyse IA (dashboard entreprise)

---

**🎉 Félicitations ! Votre application est maintenant en ligne !**

