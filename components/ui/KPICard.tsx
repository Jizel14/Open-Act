import React from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: 'primary' | 'ngo' | 'blue' | 'green';
}

export default function KPICard({ title, value, icon, color = 'primary' }: KPICardProps) {
  const colorClasses = {
    primary: 'bg-primary-500 text-white',
    ngo: 'bg-ngo-500 text-white',
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className={`text-3xl font-bold ${colorClasses[color]}`}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
        <div className={`${colorClasses[color]} p-3 rounded-full`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

