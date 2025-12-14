import { getSDGData } from '@/lib/data';
import { getMissionsSync, getNGOsSync, getCompaniesSync, getRegionsSync, getTopParticipantsSync } from '@/lib/data-server';
import KPICard from '@/components/ui/KPICard';
import SDGChart from '@/components/charts/SDGChart';
import RegionChart from '@/components/charts/RegionChart';
import TunisiaMap from '@/components/map/TunisiaMap';
import { WavyBackground } from '@/components/ui/wavy-background';
import HeroSection from '@/components/home/HeroSection';
import TopParticipants from '@/components/home/TopParticipants';

export default function Home() {
  const missions = getMissionsSync();
  const ngos = getNGOsSync();
  const companies = getCompaniesSync();
  const regions = getRegionsSync();
  const sdgData = getSDGData(missions);

  const totalMissions = missions.length;
  const totalVolunteers = missions.reduce((sum, m) => sum + m.participants, 0);
  const totalHours = missions.reduce((sum, m) => sum + (m.participants * 8), 0);
  const totalNGOs = ngos.length;
  const totalCompanies = companies.length;
  const totalEmployees = companies.reduce((sum, c) => sum + c.employees_engaged, 0);
  const topParticipants = getTopParticipantsSync();

  // Calculate region data for chart
  const regionData = missions.reduce((acc, mission) => {
    const existing = acc.find(r => r.region === mission.region);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ region: mission.region, count: 1 });
    }
    return acc;
  }, [] as { region: string; count: number }[]);

  return (
    <div>
      {/* Hero Section with Wavy Background */}
      <WavyBackground className="min-h-[80vh] flex flex-col items-center justify-center px-4">
        <HeroSection />
      </WavyBackground>

      <div className="container mx-auto px-4 py-12">
        {/* KPI Cards */}
        <section id="stats" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Impact National</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            <KPICard
              title="Missions réalisées"
              value={totalMissions}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              color="primary"
            />
            <KPICard
              title="Volontaires mobilisés"
              value={totalVolunteers}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              color="ngo"
            />
            <KPICard
              title="ONG partenaires"
              value={totalNGOs}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
              color="blue"
            />
            <KPICard
              title="Entreprises engagées"
              value={totalCompanies}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
              color="green"
            />
            <KPICard
              title="Heures de bénévolat"
              value={`${totalHours.toLocaleString()}h`}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              color="blue"
            />
            <KPICard
              title="Employés engagés"
              value={totalEmployees}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              color="ngo"
            />
          </div>
        </section>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* SDG Chart */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Répartition des missions par ODD</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <SDGChart data={sdgData} type="bar" />
            </div>
          </section>

          {/* Region Chart */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Missions par région</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <RegionChart data={regionData} />
            </div>
          </section>
        </div>

        {/* Map */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Carte interactive des missions</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <TunisiaMap regions={regions} missions={missions} />
          </div>
        </section>

        {/* Top Participants */}
        <section className="mb-16">
          <TopParticipants participants={topParticipants} />
        </section>
      </div>
    </div>
  );
}
