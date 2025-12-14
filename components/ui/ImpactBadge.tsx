import React from 'react';

interface ImpactBadgeProps {
  status: 'Validée' | 'Terminée' | 'En cours';
  size?: 'sm' | 'md' | 'lg';
}

export default function ImpactBadge({ status, size = 'md' }: ImpactBadgeProps) {
  const statusConfig = {
    'Validée': {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-300',
      icon: '✓',
    },
    'Terminée': {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-300',
      icon: '✓',
    },
    'En cours': {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-300',
      icon: '⟳',
    },
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]}`}
    >
      <span>{config.icon}</span>
      {status}
    </span>
  );
}

