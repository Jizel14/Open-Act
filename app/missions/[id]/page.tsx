import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getMissionsSync, getFeedbacksSync } from '@/lib/data-server';
import ImpactBadge from '@/components/ui/ImpactBadge';
import FeedbackCard from '@/components/ui/FeedbackCard';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const missions = getMissionsSync();
  return missions.map((mission) => ({
    id: mission.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const missions = getMissionsSync();
  const mission = missions.find(m => m.id === parseInt(params.id));
  
  if (!mission) {
    return {
      title: 'Mission non trouvée',
    };
  }

  return {
    title: `${mission.title} - Impact Visible Tunisia`,
    description: mission.description,
  };
}

export default function MissionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const missions = getMissionsSync();
  const mission = missions.find(m => m.id === parseInt(params.id));
  const allFeedbacks = getFeedbacksSync();
  const missionFeedbacks = allFeedbacks.filter(f => f.missionId === parseInt(params.id));
  const averageRating = missionFeedbacks.length > 0
    ? (missionFeedbacks.reduce((sum, f) => sum + f.rating, 0) / missionFeedbacks.length).toFixed(1)
    : '0';

  if (!mission) {
    notFound();
  }

  // Calculate hours (simulate 8 hours per participant)
  const totalHours = mission.participants * 8;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/missions"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Retour aux missions
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8 text-white">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">{mission.title}</h1>
            <ImpactBadge status={mission.status} size="lg" />
          </div>
          <p className="text-primary-100 text-lg">{mission.sdg}</p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Informations principales</h2>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-gray-700">ONG organisatrice:</span>
                  <Link
                    href={`/ongs/${encodeURIComponent(mission.ngo)}`}
                    className="ml-2 text-ngo-600 hover:text-ngo-700 font-medium"
                  >
                    {mission.ngo}
                  </Link>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Région:</span>
                  <span className="ml-2 text-gray-900">{mission.region}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Date:</span>
                  <span className="ml-2 text-gray-900">
                    {new Date(mission.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Nombre de participants:</span>
                  <span className="ml-2 text-primary-600 font-bold text-lg">{mission.participants}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Heures de bénévolat:</span>
                  <span className="ml-2 text-primary-600 font-bold text-lg">{totalHours.toLocaleString()}h</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Note moyenne:</span>
                  <span className="ml-2 text-yellow-500 font-bold text-lg">
                    {averageRating} ⭐ ({missionFeedbacks.length} avis)
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Entreprises participantes</h2>
              <div className="flex flex-wrap gap-3">
                {mission.companies.map((company) => (
                  <Link
                    key={company}
                    href={`/entreprises/${encodeURIComponent(company)}`}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800 font-medium transition-colors"
                  >
                    {company}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{mission.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Objectif</h2>
            <p className="text-gray-700 leading-relaxed">{mission.objective}</p>
          </div>

          <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Impact validé</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Mission validée</p>
                  <p className="text-sm text-gray-600">Statut confirmé</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Participants confirmés</p>
                  <p className="text-sm text-gray-600">{mission.participants} volontaires</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Impact comptabilisé</p>
                  <p className="text-sm text-gray-600">Données vérifiées</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feedbacks Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Avis des participants ({missionFeedbacks.length})
            </h2>
            {missionFeedbacks.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-600">Aucun avis pour le moment. Soyez le premier à partager votre expérience !</p>
              </div>
            ) : (
              <div className="space-y-4">
                {missionFeedbacks.map((feedback) => (
                  <FeedbackCard key={feedback.id} feedback={feedback} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

