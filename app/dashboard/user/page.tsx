'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getMissions } from '@/lib/data';
import { Mission } from '@/lib/types';
import MissionCard from '@/components/ui/MissionCard';
import KPICard from '@/components/ui/KPICard';

export default function UserDashboard() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [myMissions, setMyMissions] = useState<Mission[]>([]);
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const name = localStorage.getItem('userName');
    
    if (!role || role !== 'user') {
      router.push('/register');
      return;
    }
    
    setUserRole(role);
    setUserName(name);
    loadMissions();
  }, [router]);

  const loadMissions = async () => {
    try {
      const data = await getMissions();
      setMissions(data);
      // Simuler des missions auxquelles l'utilisateur participe
      setMyMissions(data.slice(0, 3));
    } catch (error) {
      console.error('Error loading missions:', error);
    }
  };

  if (!userRole) {
    return null;
  }

  const totalParticipations = myMissions.length;
  const totalHours = myMissions.reduce((sum, m) => sum + 8, 0); // Simuler 8h par mission

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Bienvenue, {userName || 'Utilisateur'} !
        </h1>
        <p className="text-gray-600">Tableau de bord utilisateur</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPICard
          title="Missions participées"
          value={totalParticipations}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="primary"
        />
        <KPICard
          title="Heures de bénévolat"
          value={totalHours}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="ngo"
        />
        <KPICard
          title="Impact créé"
          value={`${totalParticipations * 50}+`}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
          color="green"
        />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Mes missions</h2>
        {myMissions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">Vous n&apos;avez pas encore participé à des missions.</p>
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

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Missions disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.slice(0, 6).map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/missions"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Voir toutes les missions
          </Link>
        </div>
      </div>
    </div>
  );
}

