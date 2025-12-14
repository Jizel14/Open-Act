import jsPDF from 'jspdf';

export function generatePDF(
  analysis: any,
  companyName: string,
  reportText?: string
): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Page de garde
  doc.setFontSize(24);
  doc.setTextColor(34, 197, 94); // Primary green
  doc.text('Rapport d\'Impact RSE', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 10;
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text(companyName, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 10;
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(
    `Généré le ${new Date().toLocaleDateString('fr-FR')}`,
    pageWidth / 2,
    yPosition,
    { align: 'center' }
  );

  // Nouvelle page
  doc.addPage();
  yPosition = 20;

  // Résumé exécutif
  doc.setFontSize(18);
  doc.setTextColor(34, 197, 94);
  doc.text('Résumé Exécutif', 20, yPosition);
  
  yPosition += 10;
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  const summaryLines = doc.splitTextToSize(analysis.summary || 'Aucun résumé disponible', pageWidth - 40);
  doc.text(summaryLines, 20, yPosition);
  yPosition += summaryLines.length * 6 + 10;

  // Statistiques
  doc.setFontSize(18);
  doc.setTextColor(34, 197, 94);
  doc.text('Statistiques Clés', 20, yPosition);
  yPosition += 10;

  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text(`Impact Total: ${analysis.statistics?.totalImpact || 0} participants`, 20, yPosition);
  yPosition += 7;
  doc.text(`Note Moyenne: ${(analysis.statistics?.averageRating || 0).toFixed(1)}/5`, 20, yPosition);
  yPosition += 7;
  doc.text(`Sentiment: ${analysis.statistics?.sentiment || 'N/A'}`, 20, yPosition);
  yPosition += 10;

  // Thèmes principaux
  if (analysis.statistics?.topThemes && analysis.statistics.topThemes.length > 0) {
    doc.setFontSize(14);
    doc.setTextColor(34, 197, 94);
    doc.text('Thèmes Principaux', 20, yPosition);
    yPosition += 8;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    analysis.statistics.topThemes.forEach((theme: string) => {
      doc.text(`• ${theme}`, 25, yPosition);
      yPosition += 7;
    });
    yPosition += 5;
  }

  // Nouvelle page si nécessaire
  if (yPosition > pageHeight - 40) {
    doc.addPage();
    yPosition = 20;
  }

  // Insights
  if (analysis.insights && analysis.insights.length > 0) {
    doc.setFontSize(18);
    doc.setTextColor(34, 197, 94);
    doc.text('Insights', 20, yPosition);
    yPosition += 10;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    analysis.insights.forEach((insight: string, index: number) => {
      const insightLines = doc.splitTextToSize(`${index + 1}. ${insight}`, pageWidth - 40);
      doc.text(insightLines, 20, yPosition);
      yPosition += insightLines.length * 6 + 5;
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = 20;
      }
    });
  }

  // Recommandations
  if (analysis.statistics?.recommendations && analysis.statistics.recommendations.length > 0) {
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = 20;
    }
    doc.setFontSize(18);
    doc.setTextColor(34, 197, 94);
    doc.text('Recommandations', 20, yPosition);
    yPosition += 10;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    analysis.statistics.recommendations.forEach((rec: string, index: number) => {
      const recLines = doc.splitTextToSize(`${index + 1}. ${rec}`, pageWidth - 40);
      doc.text(recLines, 20, yPosition);
      yPosition += recLines.length * 6 + 5;
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = 20;
      }
    });
  }

  // Chiffres générés
  if (analysis.generatedNumbers) {
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = 20;
    }
    doc.setFontSize(18);
    doc.setTextColor(34, 197, 94);
    doc.text('Métriques Générées', 20, yPosition);
    yPosition += 10;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    Object.entries(analysis.generatedNumbers).forEach(([key, value]) => {
      const label = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
      doc.text(`${label}: ${value}${key.includes('Rate') || key.includes('Score') ? '%' : ''}`, 20, yPosition);
      yPosition += 7;
    });
  }

  // Télécharger le PDF
  doc.save(`rapport-rse-${companyName}-${new Date().toISOString().split('T')[0]}.pdf`);
}

