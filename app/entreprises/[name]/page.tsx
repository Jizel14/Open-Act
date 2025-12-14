import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getMissionsByCompany } from '@/lib/data';
import { getCompaniesSync, getMissionsSync } from '@/lib/data-server';
import KPICard from '@/components/ui/KPICard';
import MissionCard from '@/components/ui/MissionCard';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const companies = getCompaniesSync();
  return companies.map((company) => ({
    name: company.name,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const companyName = decodeURIComponent(params.name);
  const companies = getCompaniesSync();
  const company = companies.find(c => c.name === companyName);
  
  if (!company) {
    return {
      title: 'Entreprise non trouvée',
    };
  }

  return {
    title: `${company.name} - Impact Visible Tunisia`,
    description: company.description || `Découvrez l'engagement RSE de ${company.name} en Tunisie.`,
  };
}

export default function CompanyPage({
  params,
}: {
  params: { name: string };
}) {
  const companyName = decodeURIComponent(params.name);
  const companies = getCompaniesSync();
  const company = companies.find(c => c.name === companyName);
  const allMissions = getMissionsSync();
  const companyMissions = getMissionsByCompany(allMissions, companyName);

  if (!company) {
    notFound();
  }

  const sortedTimeline = [...company.timeline].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{company.name}</h1>
        {company.description && (
          <p className="text-lg text-gray-600 mb-6">{company.description}</p>
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">SDG couverts:</h3>
          <div className="flex flex-wrap gap-2">
            {company.sdgs.map((sdg) => (
              <span
                key={sdg}
                className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
              >
                {sdg}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <KPICard
          title="Missions soutenues"
          value={company.missions}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="primary"
        />
        <KPICard
          title="Employés engagés"
          value={company.employees_engaged}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          color="ngo"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Timeline des engagements</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
          <div className="space-y-6">
            {sortedTimeline.map((event, index) => (
              <div key={index} className="relative pl-12">
                <div className="absolute left-2 top-2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-md"></div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-primary-600">
                      {new Date(event.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="text-gray-900 font-medium">{event.event}</p>
                  {event.mission && (
                    <p className="text-sm text-gray-600 mt-1">Mission: {event.mission}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Missions soutenues</h2>
        {companyMissions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">Aucune mission disponible pour cette entreprise.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyMissions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

