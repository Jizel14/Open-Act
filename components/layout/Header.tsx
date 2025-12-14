'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserRole(localStorage.getItem('userRole'));
      setUserName(localStorage.getItem('userName'));
    }
  }, [pathname]);

  const getDashboardPath = () => {
    if (userRole === 'ngo') return '/dashboard/ngo';
    if (userRole === 'company') return '/dashboard/company';
    if (userRole === 'user') return '/dashboard/user';
    return '/register';
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">IV</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Open Act</h1>
              <p className="text-xs text-gray-600">Tunisia</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Accueil
            </Link>
            <Link href="/missions" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Missions
            </Link>
            <Link href="/#stats" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Statistiques
            </Link>
            <Link href="/leaderboard" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Classement
            </Link>
            {userRole ? (
              <Link
                href={getDashboardPath()}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Mon tableau de bord
              </Link>
            ) : (
              <Link
                href="/register"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                S&apos;inscrire
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

