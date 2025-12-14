'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Region, Mission } from '@/lib/types';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

import 'leaflet/dist/leaflet.css';

interface TunisiaMapProps {
  regions: Region[];
  missions?: Mission[];
  onRegionClick?: (region: string) => void;
}


export default function TunisiaMap({ regions, missions = [], onRegionClick }: TunisiaMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Fix for default marker icons in Next.js
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });
    }
  }, []);

  const getMissionsByRegion = (regionName: string) => {
    return missions.filter(m => m.region === regionName);
  };

  if (!isClient) {
    return (
      <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
        <p className="text-gray-600">Chargement de la carte...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[34.0, 9.0]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {regions.map((region) => {
          const regionMissions = getMissionsByRegion(region.name);
          const missionCount = regionMissions.length;
          
          return (
            <Marker
              key={region.name}
              position={[region.lat, region.lng]}
              eventHandlers={{
                click: () => {
                  if (onRegionClick) {
                    onRegionClick(region.name);
                  }
                },
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg mb-2">{region.name}</h3>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">{missionCount}</span> mission{missionCount > 1 ? 's' : ''}
                  </p>
                  {missionCount > 0 && (
                    <div className="mt-2">
                      <p className="text-xs font-semibold text-gray-600">Missions:</p>
                      <ul className="text-xs text-gray-600 mt-1">
                        {regionMissions.slice(0, 3).map((mission) => (
                          <li key={mission.id}>• {mission.title}</li>
                        ))}
                        {regionMissions.length > 3 && (
                          <li className="text-primary-600">... et {regionMissions.length - 3} autres</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

