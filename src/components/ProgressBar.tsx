import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ProgressBarProps {
  completed: number;
  total: number;
  label?: string;
  showPercent?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  completed,
  total,
  label,
  showPercent = false,
  className = '',
}) => {
  const { t } = useApp();
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isComplete = total > 0 && completed >= total;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
        <span className="flex items-center gap-1.5">
          {isComplete && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
          <span>
            <strong className="text-slate-900 dark:text-white font-semibold">
              {completed}
            </strong>{' '}
            / {total} {label || t.documentsReady}
          </span>
        </span>
        {showPercent && (
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {percent}%
          </span>
        )}
      </div>

      <div
        className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={completed}
        aria-valuemin={0}
        aria-valuemax={total}
      >
        <div
          className={`h-full transition-all duration-300 rounded-full ${
            isComplete
              ? 'bg-emerald-500'
              : completed > 0
              ? 'bg-sky-500'
              : 'bg-transparent'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
