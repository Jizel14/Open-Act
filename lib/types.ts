export interface Mission {
  id: number;
  title: string;
  ngo: string;
  sdg: string;
  region: string;
  date: string;
  participants: number;
  companies: string[];
  status: 'Validée' | 'Terminée' | 'En cours';
  description: string;
  objective: string;
}

export interface NGO {
  name: string;
  missions: number;
  volunteers: number;
  sdgs: string[];
  logo?: string;
  description?: string;
}

export interface Company {
  name: string;
  employees_engaged: number;
  missions: number;
  sdgs: string[];
  logo?: string;
  description?: string;
  timeline: TimelineEvent[];
  secteur?: string;
}

export interface TimelineEvent {
  date: string;
  event: string;
  mission?: string;
}

export interface Feedback {
  id: number;
  userId: string;
  userName: string;
  userIcon: string;
  rating: number;
  comment: string;
  date: string;
  missionId: number;
}

export interface Region {
  name: string;
  lat: number;
  lng: number;
  missions_count: number;
}

export interface SDGData {
  sdg: string;
  count: number;
}

