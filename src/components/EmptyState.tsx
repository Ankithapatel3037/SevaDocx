import React from 'react';
import { SearchX, Sparkles, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface EmptyStateProps {
  title?: string;
  description?: string;
  suggestions?: string[];
  onSelectSuggestion?: (query: string) => void;
  onReset?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  suggestions = ['Income Certificate', 'Aadhaar Card', 'Caste Certificate', 'Driving Licence', 'Scholarship'],
  onSelectSuggestion,
  onReset,
  className = '',
}) => {
  const { t } = useApp();

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mb-4">
        <SearchX className="w-7 h-7" />
      </div>

      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1.5">
        {title || t.noServicesFound}
      </h3>

      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6 leading-relaxed">
        {description || t.tryAnotherKeyword}
      </p>

      {/* Suggested Search Terms */}
      {suggestions && suggestions.length > 0 && onSelectSuggestion && (
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mb-2 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Popular searches:</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectSuggestion(item)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-sky-950/40 dark:hover:text-sky-300 border border-slate-200/80 dark:border-slate-700 transition-colors min-h-[38px] cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-sky-600 hover:text-sky-700 hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-sky-950/30 transition-colors min-h-[44px] cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset all filters</span>
        </button>
      )}
    </div>
  );
};
