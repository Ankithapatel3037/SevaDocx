import React from 'react';
import { ShieldAlert, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface DisclaimerBannerProps {
  variant?: 'compact' | 'full' | 'subtle';
  className?: string;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const { t } = useApp();

  if (variant === 'subtle') {
    return (
      <div
        className={`flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 py-1 px-2 ${className}`}
      >
        <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0 text-slate-400 dark:text-slate-500" />
        <span>{t.disclaimerShort}</span>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <aside
        aria-label="Official Disclaimer"
        className={`p-4 rounded-xl bg-amber-50/70 border border-amber-200/70 text-amber-900 dark:bg-amber-950/20 dark:border-amber-900/40 dark:text-amber-300 text-xs sm:text-sm leading-relaxed ${className}`}
      >
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 flex-shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-amber-950 dark:text-amber-200">
              Non-Government Citizen Initiative
            </p>
            <p className="text-amber-900/90 dark:text-amber-300/90">{t.disclaimerFull}</p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Notice"
      className={`px-3 py-2 rounded-lg bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between gap-2 ${className}`}
    >
      <div className="flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 flex-shrink-0 text-slate-500 dark:text-slate-400" />
        <span className="font-medium">{t.disclaimerShort}</span>
      </div>
      <a
        href="https://india.gov.in"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-[11px] text-sky-700 hover:text-sky-800 dark:text-sky-400 hover:underline flex-shrink-0"
        title="National Portal of India"
      >
        <span>india.gov.in</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    </aside>
  );
};
