import { NextRequest, NextResponse } from 'next/server';
import { analyzeDataWithAI } from '@/lib/ai-service';
import { getMissionsSync, getFeedbacksSync, getCompaniesSync } from '@/lib/data-server';
import { generateMockDataForCompany } from '@/lib/mock-data-generator';

export async function POST(request: NextRequest) {
  try {
    // Vérifier que l'utilisateur est une entreprise (dans un vrai projet, vérifier l'authentification)
    const body = await request.json();
    const { companyName, secteur } = body;

    if (!companyName) {
      return NextResponse.json(
        { error: 'Company name required' },
        { status: 400 }
      );
    }

    // Charger les données
    const missions = getMissionsSync();
    const feedbacks = getFeedbacksSync();
    const companies = getCompaniesSync();

    // Filtrer les données pertinentes pour l'entreprise
    let companyMissions = missions.filter(m => 
      m.companies.includes(companyName)
    );
    let companyFeedbacks = feedbacks.filter(f => 
      companyMissions.some(m => m.id === f.missionId)
    );
    let companyData = companies.filter(c => c.name === companyName);

    // Si pas de données réelles et qu'on a un secteur, générer des données mock
    if (companyMissions.length === 0 && secteur) {
      const mockData = generateMockDataForCompany(companyName, secteur);
      companyMissions = mockData.missions;
      companyFeedbacks = mockData.feedbacks;
      companyData = [mockData.company];
    }

    // Analyser avec l'IA
    const analysis = await analyzeDataWithAI(
      companyMissions,
      companyFeedbacks,
      companyData
    );

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error in AI analysis:', error);
    return NextResponse.json(
      { error: 'Failed to analyze data' },
      { status: 500 }
    );
  }
}

