import { getMissionsSync, getNGOsSync } from '@/lib/data-server';
import { getMissionsByNGO } from '@/lib/data';

export default function LeaderboardPage() {
  const missions = getMissionsSync();
  const ngos = getNGOsSync();

  // Calculate leaderboard data
  const leaderboard = ngos.map(ngo => {
    const ngoMissions = getMissionsByNGO(missions, ngo.name);
    const totalHours = ngoMissions.reduce((sum, m) => sum + (m.participants * 8), 0);
    const completedMissions = ngoMissions.filter(m => m.status === 'Validée').length;
    
    return {
      name: ngo.name,
      missionsCompleted: completedMissions,
      totalMissions: ngoMissions.length,
      totalHours,
      totalVolunteers: ngo.volunteers,
      score: completedMissions * 10 + (totalHours / 100), // Scoring system
    };
  }).sort((a, b) => b.score - a.score);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Classement des ONG</h1>
        <p className="text-gray-600 text-lg">
          Découvrez les ONG les plus actives en Tunisie basé sur leurs missions accomplies et heures de bénévolat
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Rang</th>
                <th className="px-6 py-4 text-left font-semibold">ONG</th>
                <th className="px-6 py-4 text-center font-semibold">Missions accomplies</th>
                <th className="px-6 py-4 text-center font-semibold">Heures de bénévolat</th>
                <th className="px-6 py-4 text-center font-semibold">Volontaires mobilisés</th>
                <th className="px-6 py-4 text-center font-semibold">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leaderboard.map((ngo, index) => (
                <tr
                  key={ngo.name}
                  className={`hover:bg-gray-50 transition-colors ${
                    index < 3 ? 'bg-yellow-50' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <span className="text-2xl font-bold">{getRankIcon(index + 1)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`/ongs/${encodeURIComponent(ngo.name)}`}
                      className="font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                    >
                      {ngo.name}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-bold text-primary-600 text-lg">{ngo.missionsCompleted}</span>
                    <span className="text-gray-500 text-sm ml-1">/ {ngo.totalMissions}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-semibold text-gray-900">{ngo.totalHours.toLocaleString()}h</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-semibold text-gray-900">{ngo.totalVolunteers.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full font-bold">
                      {Math.round(ngo.score)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Comment est calculé le score ?</h3>
        <p className="text-blue-800 text-sm">
          Le score est calculé en combinant le nombre de missions accomplies (10 points par mission) 
          et les heures de bénévolat (1 point pour 100 heures). Plus le score est élevé, plus l&apos;ONG est active !
        </p>
      </div>
    </div>
  );
}

