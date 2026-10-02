import React, { useState } from 'react';
import { ChevronDown, LucideIcon } from 'lucide-react';

interface AccordionSectionProps {
  title: string;
  icon?: LucideIcon;
  defaultOpen?: boolean;
  badge?: string;
  children: React.ReactNode;
  className?: string;
}

export const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  icon: Icon,
  defaultOpen = false,
  badge,
  children,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={`border border-slate-200/80 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 overflow-hidden transition-all shadow-subtle ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 min-h-[44px] cursor-pointer"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {Icon && (
            <Icon className="w-4 h-4 text-sky-600 dark:text-sky-400 flex-shrink-0" />
          )}
          <span className="truncate">{title}</span>
          {badge && (
            <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>

        <ChevronDown
          className={`w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-1 text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800/80 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};
