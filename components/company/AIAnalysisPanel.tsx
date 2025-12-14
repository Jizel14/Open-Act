'use client';

import { useState } from 'react';
import { AIAnalysisResult } from '@/lib/ai-service';
import { generatePDF } from '@/lib/pdf-generator';
import SDGChart from '@/components/charts/SDGChart';
import { getSDGData } from '@/lib/data';
import { Mission } from '@/lib/types';

interface AIAnalysisPanelProps {
  companyName: string;
  missions: Mission[];
}

export default function AIAnalysisPanel({ companyName, missions }: AIAnalysisPanelProps) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);

    try {
      // Récupérer le secteur depuis localStorage
      const secteur = typeof window !== 'undefined' ? localStorage.getItem('companySecteur') : null;

      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyName, secteur }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'analyse');
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError('Erreur lors de l\'analyse des données. Veuillez réessayer.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePDF = () => {
    if (analysis) {
      generatePDF(analysis, companyName);
    }
  };

  const sdgData = getSDGData(missions);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Analyse IA de l&apos;impact RSE 🤖
        </h2>
        <p className="text-gray-600">
          Utilisez l&apos;intelligence artificielle pour analyser vos données et générer des insights
        </p>
      </div>

      {!analysis ? (
        <div className="text-center py-12">
          <div className="mb-6">
            <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
              <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Analysez vos données avec l&apos;IA
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Notre agent IA va analyser vos missions, les feedbacks des participants et générer
              des statistiques, insights et recommandations personnalisées.
            </p>
          </div>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyse en cours...
              </span>
            ) : (
              'Lancer l\'analyse IA'
            )}
          </button>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Résumé */}
          <div className="bg-gradient-to-r from-primary-50 to-ngo-50 rounded-lg p-6 border border-primary-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Résumé Exécutif</h3>
            <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Impact Total</div>
              <div className="text-2xl font-bold text-primary-600">
                {analysis.statistics?.totalImpact || 0}
              </div>
              <div className="text-xs text-gray-500 mt-1">participants</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Note Moyenne</div>
              <div className="text-2xl font-bold text-yellow-600">
                {(analysis.statistics?.averageRating || 0).toFixed(1)}
              </div>
              <div className="text-xs text-gray-500 mt-1">/ 5.0</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Sentiment</div>
              <div className={`text-2xl font-bold ${
                analysis.statistics?.sentiment === 'positive' ? 'text-green-600' :
                analysis.statistics?.sentiment === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {analysis.statistics?.sentiment === 'positive' ? '✓ Positif' :
                 analysis.statistics?.sentiment === 'negative' ? '✗ Négatif' : '○ Neutre'}
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Taux d&apos;Engagement</div>
              <div className="text-2xl font-bold text-blue-600">
                {analysis.generatedNumbers?.engagementRate || 0}%
              </div>
            </div>
          </div>

          {/* Graphique SDG */}
          {sdgData.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Répartition par SDG</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <SDGChart data={sdgData} type="bar" />
              </div>
            </div>
          )}

          {/* Thèmes principaux */}
          {analysis.statistics?.topThemes && analysis.statistics.topThemes.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Thèmes Principaux</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.statistics.topThemes.map((theme, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary-100 text-primary-800 rounded-full font-medium"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Insights */}
          {analysis.insights && analysis.insights.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Insights Clés</h3>
              <div className="space-y-3">
                {analysis.insights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 flex-1">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommandations */}
          {analysis.statistics?.recommendations && analysis.statistics.recommendations.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recommandations Stratégiques</h3>
              <div className="space-y-3">
                {analysis.statistics.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 flex-1">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Métriques générées */}
          {analysis.generatedNumbers && Object.keys(analysis.generatedNumbers).length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Métriques Générées par l&apos;IA</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(analysis.generatedNumbers).map(([key, value]) => {
                  const label = key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase());
                  return (
                    <div key={key} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">{label}</div>
                      <div className="text-xl font-bold text-gray-900">
                        {typeof value === 'number' ? value.toFixed(1) : value}
                        {key.includes('Rate') || key.includes('Score') ? '%' : ''}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
            <button
              onClick={handleGeneratePDF}
              className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Générer le rapport PDF
            </button>
            <button
              onClick={() => {
                setAnalysis(null);
                setError(null);
              }}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Nouvelle analyse
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

