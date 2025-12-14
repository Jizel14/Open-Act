import { NextRequest, NextResponse } from 'next/server';
import { generateReportText } from '@/lib/ai-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { analysis } = body;

    if (!analysis) {
      return NextResponse.json(
        { error: 'Analysis data required' },
        { status: 400 }
      );
    }

    // Générer le texte du rapport
    const reportText = await generateReportText(analysis);

    return NextResponse.json({ reportText });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    );
  }
}

