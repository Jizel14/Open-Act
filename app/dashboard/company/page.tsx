'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getMissions, getMissionsByCompany, getNGOs } from '@/lib/data';
import { Mission, NGO } from '@/lib/types';
import MissionCard from '@/components/ui/MissionCard';
import KPICard from '@/components/ui/KPICard';
import AIAnalysisPanel from '@/components/company/AIAnalysisPanel';
import RecommendationsPanel from '@/components/company/RecommendationsPanel';
import { generateMockDataForCompany } from '@/lib/mock-data-generator';

export default function CompanyDashboard() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [companySecteur, setCompanySecteur] = useState<string | null>(null);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [myMissions, setMyMissions] = useState<Mission[]>([]);
  const [allMissions, setAllMissions] = useState<Mission[]>([]);
  const [ngos, setNGOs] = useState<NGO[]>([]);
  const [usingMockData, setUsingMockData] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const name = localStorage.getItem('userName');
    const secteur = localStorage.getItem('companySecteur');
    
    if (!role || role !== 'company') {
      router.push('/register');
      return;
    }
    
    setUserRole(role);
    setUserName(name);
    setCompanySecteur(secteur);
  }, [router]);

  useEffect(() => {
    if (userRole && userName) {
      loadMissions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRole, userName, companySecteur]);

  const loadMissions = async () => {
    try {
      const data = await getMissions();
      setAllMissions(data);
      
      // Vérifier si l'entreprise a des missions réelles
      let companyMissions: Mission[] = [];
      if (userName) {
        companyMissions = getMissionsByCompany(data, userName);
      }
      
      // Si pas de missions réelles et qu'on a un secteur, générer des données mock
      if (companyMissions.length === 0 && companySecteur && userName) {
        const mockData = generateMockDataForCompany(userName, companySecteur);
        setMyMissions(mockData.missions);
        setMissions([...data, ...mockData.missions]); // Ajouter les missions mock à la liste complète
        setUsingMockData(true);
      } else {
        setMyMissions(companyMissions);
        setMissions(data);
        setUsingMockData(false);
      }

      // Charger les ONGs pour les recommandations
      const ngosData = await getNGOs();
      setNGOs(ngosData);
    } catch (error) {
      console.error('Error loading missions:', error);
    }
  };

  if (!userRole) {
    return null;
  }

  const totalMissions = myMissions.length;
  const totalEmployees = myMissions.reduce((sum, m) => sum + Math.floor(m.participants * 0.3), 0); // Simuler 30% d'employés
  const totalInvestment = totalMissions * 5000; // Simuler 5000 TND par mission

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Tableau de bord RSE - {userName || 'Votre Entreprise'}
        </h1>
        <p className="text-gray-600">Suivez votre engagement social et environnemental</p>
        {usingMockData && companySecteur && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>💡 Données de démonstration :</strong> Des données d&apos;exemple basées sur votre secteur ({companySecteur}) sont affichées. 
              Commencez à participer à des missions pour voir vos données réelles !
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPICard
          title="Missions soutenues"
          value={totalMissions}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="primary"
        />
        <KPICard
          title="Employés engagés"
          value={totalEmployees}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          color="ngo"
        />
        <KPICard
          title="Investissement RSE"
          value={`${totalInvestment.toLocaleString()} TND`}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="green"
        />
      </div>

      {/* Recommendations Panel */}
      {companySecteur && (
        <RecommendationsPanel 
          secteur={companySecteur} 
          missions={allMissions} 
          ngos={ngos}
        />
      )}

      {/* AI Analysis Panel */}
      <AIAnalysisPanel companyName={userName || 'Votre Entreprise'} missions={myMissions} />

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Missions soutenues</h2>
          <Link
            href="/missions"
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Explorer les missions
          </Link>
        </div>
        {myMissions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">Votre entreprise n&apos;a pas encore soutenu de missions.</p>
            <Link
              href="/missions"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Découvrir les missions
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myMissions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

