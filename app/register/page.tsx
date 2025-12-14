'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Role = 'user' | 'ngo' | 'company' | null;

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    organization: '',
    phone: '',
    secteur: '',
  });
  const router = useRouter();

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler l'inscription (pas de backend)
    if (selectedRole) {
      // Stocker le rôle dans localStorage pour la démo
      localStorage.setItem('userRole', selectedRole);
      localStorage.setItem('userName', formData.name);
      if (selectedRole === 'company' && formData.secteur) {
        localStorage.setItem('companySecteur', formData.secteur);
      }
      
      // Rediriger vers la page appropriée
      if (selectedRole === 'ngo') {
        router.push('/dashboard/ngo');
      } else if (selectedRole === 'company') {
        router.push('/dashboard/company');
      } else {
        router.push('/dashboard/user');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-ngo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <div className="flex items-center space-x-2 justify-center">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">IV</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Impact Visible</h1>
                <p className="text-xs text-gray-600">Tunisia</p>
              </div>
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Rejoindre la plateforme</h2>
          <p className="text-gray-600">Choisissez votre profil pour commencer</p>
        </div>

        {!selectedRole ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => handleRoleSelect('user')}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all border-2 border-transparent hover:border-primary-500 text-left"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Utilisateur</h3>
              <p className="text-gray-600 text-sm">
                Rejoignez des missions, suivez votre impact et contribuez au changement.
              </p>
            </button>

            <button
              onClick={() => handleRoleSelect('ngo')}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all border-2 border-transparent hover:border-ngo-500 text-left"
            >
              <div className="w-16 h-16 bg-ngo-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-ngo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">ONG</h3>
              <p className="text-gray-600 text-sm">
                Créez et gérez vos missions, mobilisez des volontaires et mesurez votre impact.
              </p>
            </button>

            <button
              onClick={() => handleRoleSelect('company')}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all border-2 border-transparent hover:border-green-500 text-left"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Entreprise</h3>
              <p className="text-gray-600 text-sm">
                Engagez vos employés, soutenez des missions et valorisez votre RSE.
              </p>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <button
              onClick={() => setSelectedRole(null)}
              className="text-primary-600 hover:text-primary-700 mb-6 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour au choix du profil
            </button>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Inscription en tant que {selectedRole === 'user' ? 'Utilisateur' : selectedRole === 'ngo' ? 'ONG' : 'Entreprise'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {selectedRole === 'user' ? 'Nom complet' : selectedRole === 'ngo' ? 'Nom de l\'ONG' : 'Nom de l\'entreprise'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder={selectedRole === 'user' ? 'Votre nom' : selectedRole === 'ngo' ? 'Nom de l\'ONG' : 'Nom de l\'entreprise'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              {(selectedRole === 'ngo' || selectedRole === 'company') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {selectedRole === 'ngo' ? 'Numéro d\'enregistrement' : 'Numéro d\'entreprise'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={selectedRole === 'ngo' ? 'Numéro d\'enregistrement' : 'Numéro d\'entreprise'}
                  />
                </div>
              )}

              {selectedRole === 'company' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secteur d&apos;activité
                  </label>
                  <select
                    required
                    value={formData.secteur}
                    onChange={(e) => setFormData({ ...formData, secteur: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Sélectionnez un secteur</option>
                    <option value="Technologie">Technologie</option>
                    <option value="Finance">Finance</option>
                    <option value="Énergie">Énergie</option>
                    <option value="Distribution">Distribution</option>
                    <option value="Santé">Santé</option>
                    <option value="Éducation">Éducation</option>
                    <option value="Industrie">Industrie</option>
                    <option value="Services">Services</option>
                    <option value="Immobilier">Immobilier</option>
                    <option value="Transport">Transport</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="+216 XX XXX XXX"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg"
              >
                Créer mon compte
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

