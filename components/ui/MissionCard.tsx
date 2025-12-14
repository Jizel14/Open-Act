"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Mission } from '@/lib/types';
import ImpactBadge from './ImpactBadge';
import { CardBody, CardContainer, CardItem } from './3d-card';
import { getMissionImage } from '@/lib/mission-images';

interface MissionCardProps {
  mission: Mission;
}

export default function MissionCard({ mission }: MissionCardProps) {
  const missionImage = getMissionImage(mission.id, mission.title, mission.sdg);

  return (
    <CardContainer className="inter-var h-full" containerClassName="py-0">
      <Link href={`/missions/${mission.id}`} className="h-full block">
        <CardBody className="bg-white relative group/card hover:shadow-2xl hover:shadow-primary-500/[0.1] border-black/[0.1] w-full h-full rounded-xl p-6 border flex flex-col cursor-pointer">
          <CardItem
            translateZ="100"
            className="w-full mb-4 relative h-48 overflow-hidden rounded-xl"
          >
            <Image
              src={missionImage}
              fill
              className="object-cover rounded-xl group-hover/card:shadow-xl transition-shadow"
              alt={mission.title}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </CardItem>

          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-800 mb-2 line-clamp-2"
          >
            {mission.title}
          </CardItem>

          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-600 text-sm mb-4 line-clamp-2 flex-1"
          >
            {mission.description}
          </CardItem>

          <CardItem translateZ="40" className="space-y-2 mb-4 flex-1">
            <div className="flex items-center text-sm text-gray-700">
              <span className="font-semibold mr-2">ONG:</span>
              <span className="text-ngo-600">{mission.ngo}</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <span className="font-semibold mr-2">SDG:</span>
              <span className="text-primary-600">{mission.sdg}</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <span className="font-semibold mr-2">Région:</span>
              <span>{mission.region}</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <span className="font-semibold mr-2">Participants:</span>
              <span className="font-bold text-primary-600">{mission.participants}</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <span className="font-semibold mr-2">Date:</span>
              <span>{new Date(mission.date).toLocaleDateString('fr-FR')}</span>
            </div>
          </CardItem>

          <CardItem
            translateZ={20}
            className="flex items-center justify-between pt-4 border-t"
          >
            <ImpactBadge status={mission.status} />
            <div className="text-xs text-gray-500">
              {mission.companies.length} entreprise{mission.companies.length > 1 ? 's' : ''}
            </div>
          </CardItem>
        </CardBody>
      </Link>
    </CardContainer>
  );
}
