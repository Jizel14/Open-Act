import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Missions - Impact Visible Tunisia',
  description: 'Découvrez toutes les missions d\'impact social et environnemental réalisées en Tunisie.',
};

export default function MissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

