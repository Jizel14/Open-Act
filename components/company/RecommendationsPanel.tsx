'use client';

import { Mission, NGO } from '@/lib/types';
import Link from 'next/link';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';

interface RecommendationsPanelProps {
  secteur: string;
  missions: Mission[];
  ngos: NGO[];
}

export default function RecommendationsPanel({ secteur, missions, ngos }: RecommendationsPanelProps) {
  // Filtrer les missions qui correspondent au secteur de l'entreprise
  const secteurToSDGs: { [key: string]: string[] } = {
    'Technologie': ['ODD 4', 'ODD 8', 'ODD 9', 'ODD 11'],
    'Finance': ['ODD 4', 'ODD 5', 'ODD 8', 'ODD 10'],
    'Énergie': ['ODD 7', 'ODD 13', 'ODD 15'],
    'Distribution': ['ODD 2', 'ODD 12', 'ODD 13'],
    'Santé': ['ODD 3', 'ODD 6', 'ODD 10'],
    'Éducation': ['ODD 4', 'ODD 5', 'ODD 10'],
    'Industrie': ['ODD 8', 'ODD 9', 'ODD 12', 'ODD 13'],
    'Services': ['ODD 4', 'ODD 8', 'ODD 10'],
    'Immobilier': ['ODD 11', 'ODD 13', 'ODD 15'],
    'Transport': ['ODD 11', 'ODD 13', 'ODD 15'],
  };

  const relevantSDGs = secteurToSDGs[secteur] || [];
  
  // Trouver les missions pertinentes (qui n'ont pas encore cette entreprise comme sponsor)
  const recommendedMissions = missions
    .filter(mission => {
      // Vérifier si la mission correspond aux ODD du secteur
      const matchesSDG = relevantSDGs.some(sdg => {
        const sdgNumber = sdg.split(' ')[1];
        return mission.sdg.includes(sdgNumber);
      });
      // Exclure les missions déjà terminées et celles où l'entreprise est déjà sponsor
      return matchesSDG && mission.status !== 'Terminée';
    })
    .slice(0, 6); // Limiter à 6 recommandations

  // Trouver les ONGs qui travaillent sur ces missions
  const recommendedNGOs = ngos.filter(ngo => 
    recommendedMissions.some(m => m.ngo === ngo.name)
  ).slice(0, 4);

  if (recommendedMissions.length === 0 && recommendedNGOs.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Recommandations pour votre secteur ({secteur})
      </h2>
      <p className="text-gray-600 mb-6">
        Découvrez les missions et ONGs alignées avec votre secteur d&apos;activité pour maximiser votre impact RSE.
      </p>

      {recommendedMissions.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Missions recommandées</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedMissions.map((mission) => (
              <CardContainer key={mission.id} className="inter-var">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                  <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white mb-2">
                    {mission.title}
                  </CardItem>
                  <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 line-clamp-2">
                    {mission.description}
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <div className="h-32 bg-gradient-to-br from-primary-100 to-ngo-100 rounded-lg flex items-center justify-center">
                      <span className="text-4xl">🌱</span>
                    </div>
                  </CardItem>
                  <div className="flex justify-between items-center mt-6">
                    <CardItem translateZ={20} as="div" className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white bg-primary-100 text-primary-800">
                      {mission.sdg.split('–')[0].trim()}
                    </CardItem>
                    <CardItem translateZ={20} as={Link} href={`/missions/${mission.id}`} className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:bg-gray-800">
                      Voir détails →
                    </CardItem>
                  </div>
                  <div className="mt-4">
                    <CardItem translateZ={20} as="p" className="text-xs text-gray-500">
                      📍 {mission.region} • 👥 {mission.participants} participants
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            ))}
          </div>
        </div>
      )}

      {recommendedNGOs.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">ONGs partenaires recommandées</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedNGOs.map((ngo) => (
              <Link
                key={ngo.name}
                href={`/ongs/${encodeURIComponent(ngo.name)}`}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-primary-500 hover:shadow-md transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-ngo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🏛️</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{ngo.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {ngo.missions} missions • {ngo.volunteers} volontaires
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ngo.sdgs.slice(0, 3).map((sdg, idx) => (
                        <span key={idx} className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded">
                          {sdg}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <Link
          href="/missions"
          className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
        >
          Explorer toutes les missions
        </Link>
      </div>
    </div>
  );
}

