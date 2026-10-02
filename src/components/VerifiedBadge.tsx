import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { VerificationStatus } from '../types';
import { useApp } from '../context/AppContext';

interface VerifiedBadgeProps {
  status: VerificationStatus;
  date?: string;
  showDate?: boolean;
  className?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  status,
  date,
  showDate = false,
  className = '',
}) => {
  const { t } = useApp();
  const isVerified = status === 'verified';

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium tracking-wide transition-colors ${
        isVerified
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60'
          : 'bg-amber-50 text-amber-800 border border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/60'
      } ${className}`}
      title={
        isVerified
          ? `${t.verified}${date ? ` on ${date}` : ''}`
          : `${t.needsReview} - Information should be cross-checked on official portal`
      }
    >
      {isVerified ? (
        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
      ) : (
        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
      )}
      <span>{isVerified ? t.verified : t.needsReview}</span>
      {showDate && date && (
        <span className="text-[11px] opacity-75 font-normal pl-0.5">({date})</span>
      )}
    </div>
  );
};
