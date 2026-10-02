import React from 'react';
import {
  FileCheck,
  CreditCard,
  GraduationCap,
  Briefcase,
  Building2,
  Coins,
  Car,
  HeartHandshake,
  Activity,
  Store,
  Scale,
  Sparkles,
} from 'lucide-react';
import { Category } from '../types';

interface CategoryChipProps {
  category: Category | { id: string; name: string; icon?: string };
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

const getCategoryIcon = (iconName?: string) => {
  switch (iconName) {
    case 'FileCheck':
      return FileCheck;
    case 'CreditCard':
      return CreditCard;
    case 'GraduationCap':
      return GraduationCap;
    case 'Briefcase':
      return Briefcase;
    case 'Building2':
      return Building2;
    case 'Coins':
      return Coins;
    case 'Car':
      return Car;
    case 'HeartHandshake':
      return HeartHandshake;
    case 'Activity':
      return Activity;
    case 'Store':
      return Store;
    case 'Scale':
      return Scale;
    default:
      return Sparkles;
  }
};

export const CategoryChip: React.FC<CategoryChipProps> = ({
  category,
  isActive,
  onClick,
  className = '',
}) => {
  const Icon = getCategoryIcon(category.icon);

  return (
    <button
      type="button"
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 min-h-[44px] cursor-pointer select-none ${
        isActive
          ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/20 active:bg-sky-700 dark:bg-sky-500'
          : 'bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-800/80 dark:hover:text-white'
      } ${className}`}
    >
      <Icon
        className={`w-4 h-4 flex-shrink-0 ${
          isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'
        }`}
      />
      <span>{category.name}</span>
    </button>
  );
};
