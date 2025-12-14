'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getMissions, getCompanies } from '@/lib/data';
import { Mission, Company } from '@/lib/types';
import MissionCard from '@/components/ui/MissionCard';
import KPICard from '@/components/ui/KPICard';
import SDGChart from '@/components/charts/SDGChart';
import { getSDGData } from '@/lib/data';

export default function NGODashboard() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [myMissions, setMyMissions] = useState<Mission[]>([]);
  const [partners, setPartners] = useState<Company[]>([]);
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const name = localStorage.getItem('userName');
    
    if (!role || role !== 'ngo') {
      router.push('/register');
      return;
    }
    
    setUserRole(role);
    setUserName(name);
  }, [router]);

  useEffect(() => {
    if (userRole && userName) {
      loadMissions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRole, userName]);

  const loadMissions = async () => {
    try {
      const data = await getMissions();
      setMissions(data);
      // Simuler les missions de cette ONG
      const ngoMissions = data.filter(m => m.ngo === (userName || 'Croissant Rouge Tunisien'));
      setMyMissions(ngoMissions);
      
      // Get partner companies
      const companiesData = await getCompanies();
      const partnerNames = new Set<string>();
      ngoMissions.forEach(m => {
        m.companies.forEach(c => partnerNames.add(c));
      });
      const partnerCompanies = companiesData.filter(c => partnerNames.has(c.name));
      setPartners(partnerCompanies);
    } catch (error) {
      console.error('Error loading missions:', error);
    }
  };

  if (!userRole) {
    return null;
  }

  const totalMissions = myMissions.length;
  const totalVolunteers = myMissions.reduce((sum, m) => sum + m.participants, 0);
  const totalHours = myMissions.reduce((sum, m) => sum + (m.participants * 8), 0);
  const sdgData = getSDGData(myMissions);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Tableau de bord ONG - {userName || 'Votre ONG'}
        </h1>
        <p className="text-gray-600">Gérez vos missions et mesurez votre impact</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Missions créées"
          value={totalMissions}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="primary"
        />
        <KPICard
          title="Volontaires mobilisés"
          value={totalVolunteers}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          color="ngo"
        />
        <KPICard
          title="Heures de bénévolat"
          value={`${totalHours.toLocaleString()}h`}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="blue"
        />
        <KPICard
          title="Missions validées"
          value={myMissions.filter(m => m.status === 'Validée').length}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          }
          color="green"
        />
      </div>

      {sdgData.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Répartition par SDG</h2>
          <SDGChart data={sdgData} type="pie" />
        </div>
      )}

      {/* Partners Section */}
      {partners.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos partenaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{partner.name}</h3>
                {partner.description && (
                  <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                )}
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="font-semibold text-gray-700 mr-2">Missions soutenues:</span>
                    <span className="text-primary-600 font-bold">{partner.missions}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-semibold text-gray-700 mr-2">Employés engagés:</span>
                    <span className="text-primary-600 font-bold">{partner.employees_engaged}</span>
                  </div>
                  <div className="mt-3">
                    <span className="text-xs font-semibold text-gray-600">SDG couverts:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {partner.sdgs.map((sdg) => (
                        <span
                          key={sdg}
                          className="px-2 py-1 bg-primary-100 text-primary-800 rounded text-xs font-medium"
                        >
                          {sdg}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/entreprises/${encodeURIComponent(partner.name)}`}
                    className="inline-block mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    Voir le profil →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Mes missions</h2>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            + Créer une mission
          </button>
        </div>
        {myMissions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">Vous n&apos;avez pas encore créé de missions.</p>
            <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Créer ma première mission
            </button>
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

