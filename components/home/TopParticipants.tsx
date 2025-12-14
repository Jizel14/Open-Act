"use client";

import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

export interface Participant {
  id: number;
  name: string;
  hours: number;
  missions: number;
  image: string;
  designation: string;
}

interface TopParticipantsProps {
  participants: Participant[];
}

export default function TopParticipants({ participants }: TopParticipantsProps) {
  const tooltipItems = participants.map(p => ({
    id: p.id,
    name: p.name,
    designation: p.designation,
    image: p.image,
  }));

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Meilleurs participants 🏆
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Classement basé sur le nombre d&apos;heures de bénévolat
      </p>
      <div className="flex flex-row items-center justify-center mb-10 w-full">
        <AnimatedTooltip items={tooltipItems} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {participants.map((participant, index) => (
          <div
            key={participant.id}
            className="bg-gradient-to-br from-primary-50 to-ngo-50 rounded-lg p-4 border border-primary-200"
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-bold text-primary-600">
                #{index + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{participant.name}</h3>
                <p className="text-sm text-gray-600">
                  {participant.hours}h • {participant.missions} missions
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

