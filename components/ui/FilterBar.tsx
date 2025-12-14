'use client';

import React from 'react';

interface FilterBarProps {
  sdgs: string[];
  regions: string[];
  ngos: string[];
  selectedSDG: string;
  selectedRegion: string;
  selectedNGO: string;
  searchQuery: string;
  onSDGChange: (sdg: string) => void;
  onRegionChange: (region: string) => void;
  onNGOChange: (ngo: string) => void;
  onSearchChange: (query: string) => void;
}

export default function FilterBar({
  sdgs,
  regions,
  ngos,
  selectedSDG,
  selectedRegion,
  selectedNGO,
  searchQuery,
  onSDGChange,
  onRegionChange,
  onNGOChange,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recherche
          </label>
          <input
            type="text"
            placeholder="Rechercher une mission..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SDG
          </label>
          <select
            value={selectedSDG}
            onChange={(e) => onSDGChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Tous les SDG</option>
            {sdgs.map((sdg) => (
              <option key={sdg} value={sdg}>
                {sdg}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Région
          </label>
          <select
            value={selectedRegion}
            onChange={(e) => onRegionChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Toutes les régions</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ONG
          </label>
          <select
            value={selectedNGO}
            onChange={(e) => onNGOChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Toutes les ONG</option>
            {ngos.map((ngo) => (
              <option key={ngo} value={ngo}>
                {ngo}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

