import { readFileSync } from 'fs';
import { join } from 'path';
import { Mission, NGO, Company, Region, Feedback } from './types';

const dataDir = join(process.cwd(), 'public', 'data');

export function getMissionsSync(): Mission[] {
  const filePath = join(dataDir, 'missions.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export function getNGOsSync(): NGO[] {
  const filePath = join(dataDir, 'ngos.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export function getCompaniesSync(): Company[] {
  const filePath = join(dataDir, 'companies.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export function getRegionsSync(): Region[] {
  const filePath = join(dataDir, 'regions.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export function getFeedbacksSync(): Feedback[] {
  const filePath = join(dataDir, 'feedbacks.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export interface TopParticipant {
  id: number;
  name: string;
  hours: number;
  missions: number;
  image: string;
  designation: string;
}

export function getTopParticipantsSync(): TopParticipant[] {
  const filePath = join(dataDir, 'top-participants.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}
