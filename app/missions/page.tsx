'use client';

import { useEffect, useState } from 'react';
import { Mission } from '@/lib/types';
import MissionCard from '@/components/ui/MissionCard';
import FilterBar from '@/components/ui/FilterBar';
import { getMissions, filterMissions, getUniqueSDGs, getUniqueRegions, getUniqueNGOs } from '@/lib/data';

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [filteredMissions, setFilteredMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSDG, setSelectedSDG] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedNGO, setSelectedNGO] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadMissions() {
      try {
        const data = await getMissions();
        setMissions(data);
        setFilteredMissions(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading missions:', err);
        setError('Erreur lors du chargement des missions');
        setLoading(false);
      }
    }
    loadMissions();
  }, []);

  useEffect(() => {
    const filtered = filterMissions(missions, {
      sdg: selectedSDG || undefined,
      region: selectedRegion || undefined,
      ngo: selectedNGO || undefined,
      search: searchQuery || undefined,
    });
    setFilteredMissions(filtered);
  }, [missions, selectedSDG, selectedRegion, selectedNGO, searchQuery]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Chargement des missions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  const sdgs = getUniqueSDGs(missions);
  const regions = getUniqueRegions(missions);
  const ngos = getUniqueNGOs(missions);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Missions</h1>
        <p className="text-xl text-gray-600">
          Découvrez toutes les missions d&apos;impact social et environnemental réalisées en Tunisie.
        </p>
      </div>

      <FilterBar
        sdgs={sdgs}
        regions={regions}
        ngos={ngos}
        selectedSDG={selectedSDG}
        selectedRegion={selectedRegion}
        selectedNGO={selectedNGO}
        searchQuery={searchQuery}
        onSDGChange={setSelectedSDG}
        onRegionChange={setSelectedRegion}
        onNGOChange={setSelectedNGO}
        onSearchChange={setSearchQuery}
      />

      <div className="mb-4">
        <p className="text-gray-600">
          {filteredMissions.length} mission{filteredMissions.length > 1 ? 's' : ''} trouvée{filteredMissions.length > 1 ? 's' : ''}
        </p>
      </div>

      {filteredMissions.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600 text-lg">Aucune mission ne correspond à vos critères de recherche.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMissions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
      )}
    </div>
  );
}
