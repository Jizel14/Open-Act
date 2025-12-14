const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'nex-agi/deepseek-v3.1-nex-n1:free';

export interface AIAnalysisResult {
  summary: string;
  statistics: {
    totalImpact: number;
    averageRating: number;
    topThemes: string[];
    sentiment: 'positive' | 'neutral' | 'negative';
    recommendations: string[];
  };
  insights: string[];
  generatedNumbers: {
    [key: string]: number;
  };
}

export async function analyzeDataWithAI(
  missions: any[],
  feedbacks: any[],
  companies: any[]
): Promise<AIAnalysisResult> {
  // Préparer les données pour l'analyse
  const missionsText = missions.map(m => 
    `Mission: ${m.title}. Description: ${m.description}. Participants: ${m.participants}. SDG: ${m.sdg}. Région: ${m.region}.`
  ).join('\n');

  const feedbacksText = feedbacks.length > 0 
    ? feedbacks.map(f => 
        `Feedback: ${f.comment}. Rating: ${f.rating}/5.`
      ).join('\n')
    : 'Aucun feedback disponible pour le moment.';

  const companiesText = companies.map(c => 
    `Entreprise: ${c.name}. Employés engagés: ${c.employees_engaged}. Missions soutenues: ${c.missions}.`
  ).join('\n');

  const totalParticipants = missions.reduce((sum, m) => sum + m.participants, 0);
  const totalHours = missions.reduce((sum, m) => sum + (m.participants * 8), 0);
  const avgRating = feedbacks.length > 0 
    ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
    : 'N/A';

  const prompt = `Tu es un analyste expert en RSE et impact social. Analyse les données suivantes et génère un rapport détaillé.

CONTEXTE:
- Total participants: ${totalParticipants}
- Total heures de bénévolat: ${totalHours}h
- Note moyenne: ${avgRating}/5
- Nombre de missions: ${missions.length}

MISSIONS:
${missionsText}

FEEDBACKS UTILISATEURS:
${feedbacksText}

ENTREPRISES:
${companiesText}

Génère une analyse complète avec:
1. Un résumé exécutif (2-3 phrases)
2. Des statistiques clés (impact total, note moyenne, thèmes principaux, sentiment général)
3. Des insights actionnables (3-5 points)
4. Des recommandations stratégiques (3-5 recommandations)
5. Des chiffres générés basés sur l'analyse (ex: pourcentage d'engagement, ROI estimé, etc.)

Réponds UNIQUEMENT en JSON valide avec cette structure:
{
  "summary": "résumé exécutif",
  "statistics": {
    "totalImpact": nombre,
    "averageRating": nombre,
    "topThemes": ["thème1", "thème2", "thème3"],
    "sentiment": "positive" | "neutral" | "negative",
    "recommendations": ["reco1", "reco2", "reco3"]
  },
  "insights": ["insight1", "insight2", "insight3"],
  "generatedNumbers": {
    "engagementRate": nombre,
    "satisfactionScore": nombre,
    "roiEstimate": nombre
  }
}`;

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'Impact Visible Tunisia',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert en analyse de données RSE et impact social. Tu génères toujours des réponses en JSON valide.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000, // Augmenté pour permettre des réponses plus détaillées
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenRouter API error: ${error}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '{}';

    // Extraire le JSON de la réponse
    let jsonContent = content;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonContent = jsonMatch[0];
    }

    const analysis = JSON.parse(jsonContent) as AIAnalysisResult;

    return analysis;
  } catch (error) {
    console.error('Error calling AI service:', error);
    // Retourner une analyse par défaut en cas d'erreur
    return {
      summary: 'Analyse en cours...',
      statistics: {
        totalImpact: missions.reduce((sum, m) => sum + m.participants, 0),
        averageRating: feedbacks.length > 0 
          ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length 
          : 0,
        topThemes: ['Environnement', 'Éducation', 'Santé'],
        sentiment: 'positive',
        recommendations: ['Continuer les efforts', 'Élargir les partenariats'],
      },
      insights: ['Impact positif mesuré', 'Engagement croissant'],
      generatedNumbers: {
        engagementRate: 75,
        satisfactionScore: 4.5,
        roiEstimate: 120,
      },
    };
  }
}

export async function generateReportText(analysis: AIAnalysisResult): Promise<string> {
  const prompt = `Génère un rapport PDF professionnel en français basé sur cette analyse:

${JSON.stringify(analysis, null, 2)}

Le rapport doit inclure:
- Page de garde avec titre
- Résumé exécutif
- Statistiques détaillées
- Insights et recommandations
- Conclusion

Format: Markdown pour conversion en PDF`;

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'Impact Visible Tunisia',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert en rédaction de rapports RSE professionnels.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000, // Augmenté pour des rapports plus complets
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate report');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error generating report:', error);
    return 'Erreur lors de la génération du rapport.';
  }
}

