import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getMissionsByNGO, getSDGData } from '@/lib/data';
import { getNGOsSync, getMissionsSync } from '@/lib/data-server';
import KPICard from '@/components/ui/KPICard';
import SDGChart from '@/components/charts/SDGChart';
import RegionChart from '@/components/charts/RegionChart';
import MissionCard from '@/components/ui/MissionCard';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const ngos = getNGOsSync();
  return ngos.map((ngo) => ({
    name: ngo.name,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const ngoName = decodeURIComponent(params.name);
  const ngos = getNGOsSync();
  const ngo = ngos.find(n => n.name === ngoName);
  
  if (!ngo) {
    return {
      title: 'ONG non trouvée',
    };
  }

  return {
    title: `${ngo.name} - Impact Visible Tunisia`,
    description: ngo.description || `Découvrez l'impact de ${ngo.name} en Tunisie.`,
  };
}

export default function NGOPage({
  params,
}: {
  params: { name: string };
}) {
  const ngoName = decodeURIComponent(params.name);
  const ngos = getNGOsSync();
  const ngo = ngos.find(n => n.name === ngoName);
  const allMissions = getMissionsSync();
  const ngoMissions = getMissionsByNGO(allMissions, ngoName);

  if (!ngo) {
    notFound();
  }

  const sdgData = getSDGData(ngoMissions);
  
  const regionData = ngoMissions.reduce((acc, mission) => {
    const existing = acc.find(r => r.region === mission.region);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ region: mission.region, count: 1 });
    }
    return acc;
  }, [] as { region: string; count: number }[]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{ngo.name}</h1>
        {ngo.description && (
          <p className="text-lg text-gray-600 mb-6">{ngo.description}</p>
        )}
        <div className="flex flex-wrap gap-2">
          {ngo.sdgs.map((sdg) => (
            <span
              key={sdg}
              className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
            >
              {sdg}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <KPICard
          title="Missions réalisées"
          value={ngo.missions}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="primary"
        />
        <KPICard
          title="Volontaires mobilisés"
          value={ngo.volunteers}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          color="ngo"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Répartition par SDG</h2>
          {sdgData.length > 0 ? (
            <SDGChart data={sdgData} type="pie" />
          ) : (
            <p className="text-gray-600">Aucune donnée disponible</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Répartition par région</h2>
          {regionData.length > 0 ? (
            <RegionChart data={regionData} />
          ) : (
            <p className="text-gray-600">Aucune donnée disponible</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Missions réalisées</h2>
        {ngoMissions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">Aucune mission disponible pour cette ONG.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ngoMissions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

