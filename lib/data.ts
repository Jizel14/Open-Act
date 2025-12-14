import { Mission, NGO, Company, Region, SDGData, Feedback } from './types';

export async function getMissions(): Promise<Mission[]> {
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/data/missions.json`);
  if (!res.ok) {
    throw new Error('Failed to fetch missions');
  }
  return res.json();
}

export async function getMissionById(id: number): Promise<Mission | undefined> {
  const missions = await getMissions();
  return missions.find(m => m.id === id);
}

export async function getNGOs(): Promise<NGO[]> {
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/data/ngos.json`);
  if (!res.ok) {
    throw new Error('Failed to fetch NGOs');
  }
  return res.json();
}

export async function getNGOByName(name: string): Promise<NGO | undefined> {
  const ngos = await getNGOs();
  return ngos.find(n => n.name === name);
}

export async function getCompanies(): Promise<Company[]> {
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/data/companies.json`);
  if (!res.ok) {
    throw new Error('Failed to fetch companies');
  }
  return res.json();
}

export async function getCompanyByName(name: string): Promise<Company | undefined> {
  const companies = await getCompanies();
  return companies.find(c => c.name === name);
}

export async function getRegions(): Promise<Region[]> {
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/data/regions.json`);
  if (!res.ok) {
    throw new Error('Failed to fetch regions');
  }
  return res.json();
}

export async function getFeedbacks(): Promise<Feedback[]> {
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/data/feedbacks.json`);
  if (!res.ok) {
    throw new Error('Failed to fetch feedbacks');
  }
  return res.json();
}

export function getFeedbacksByMission(feedbacks: Feedback[], missionId: number): Feedback[] {
  return feedbacks.filter(f => f.missionId === missionId);
}

export function filterMissions(
  missions: Mission[],
  filters: {
    sdg?: string;
    region?: string;
    ngo?: string;
    search?: string;
  }
): Mission[] {
  return missions.filter(mission => {
    if (filters.sdg && mission.sdg !== filters.sdg) return false;
    if (filters.region && mission.region !== filters.region) return false;
    if (filters.ngo && mission.ngo !== filters.ngo) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (
        !mission.title.toLowerCase().includes(searchLower) &&
        !mission.description.toLowerCase().includes(searchLower) &&
        !mission.ngo.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }
    return true;
  });
}

export function getSDGData(missions: Mission[]): SDGData[] {
  const sdgMap = new Map<string, number>();
  
  missions.forEach(mission => {
    const count = sdgMap.get(mission.sdg) || 0;
    sdgMap.set(mission.sdg, count + 1);
  });
  
  return Array.from(sdgMap.entries()).map(([sdg, count]) => ({
    sdg,
    count
  })).sort((a, b) => b.count - a.count);
}

export function getMissionsByNGO(missions: Mission[], ngoName: string): Mission[] {
  return missions.filter(m => m.ngo === ngoName);
}

export function getMissionsByCompany(missions: Mission[], companyName: string): Mission[] {
  return missions.filter(m => m.companies.includes(companyName));
}

export function getUniqueSDGs(missions: Mission[]): string[] {
  return Array.from(new Set(missions.map(m => m.sdg))).sort();
}

export function getUniqueRegions(missions: Mission[]): string[] {
  return Array.from(new Set(missions.map(m => m.region))).sort();
}

export function getUniqueNGOs(missions: Mission[]): string[] {
  return Array.from(new Set(missions.map(m => m.ngo))).sort();
}

