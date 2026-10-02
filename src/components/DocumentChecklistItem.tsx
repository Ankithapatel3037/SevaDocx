import React from 'react';
import { Info, Check } from 'lucide-react';
import { DocumentItem } from '../types';
import { useApp } from '../context/AppContext';

interface DocumentChecklistItemProps {
  document: DocumentItem;
  serviceId: string;
  isChecked: boolean;
  onToggle: () => void;
  onOpenDetails: (doc: DocumentItem) => void;
}

export const DocumentChecklistItem: React.FC<DocumentChecklistItemProps> = ({
  document,
  serviceId,
  isChecked,
  onToggle,
  onOpenDetails,
}) => {
  const { t } = useApp();
  const inputId = `doc-${serviceId}-${document.document_id}`;

  return (
    <div
      className={`group flex items-start justify-between gap-3 p-3.5 rounded-xl border transition-all duration-150 ${
        isChecked
          ? 'bg-sky-50/50 border-sky-200/80 dark:bg-sky-950/20 dark:border-sky-900/50'
          : 'bg-white border-slate-200/80 hover:border-slate-300 dark:bg-slate-900/80 dark:border-slate-800 dark:hover:border-slate-700'
      }`}
    >
      {/* Checkbox & Text */}
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <div className="pt-0.5 flex-shrink-0">
          <label
            htmlFor={inputId}
            className={`w-6 h-6 rounded-lg flex items-center justify-center cursor-pointer border transition-colors min-h-[44px] min-w-[44px] -m-2 p-2 ${
              isChecked
                ? 'text-sky-600 dark:text-sky-400'
                : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            <input
              id={inputId}
              type="checkbox"
              checked={isChecked}
              onChange={onToggle}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                isChecked
                  ? 'bg-sky-600 border-sky-600 text-white dark:bg-sky-500 dark:border-sky-500'
                  : 'bg-white border-slate-300 group-hover:border-sky-400 dark:bg-slate-800 dark:border-slate-600'
              }`}
            >
              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </label>
        </div>

        <div className="min-w-0 flex-1 select-none cursor-pointer" onClick={onToggle}>
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span
              className={`text-sm font-semibold transition-colors ${
                isChecked
                  ? 'text-slate-500 dark:text-slate-400 line-through'
                  : 'text-slate-900 dark:text-white'
              }`}
            >
              {document.document_name}
            </span>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                document.mandatory
                  ? 'bg-rose-50 text-rose-700 border border-rose-200/60 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/40'
                  : 'bg-slate-100 text-slate-600 border border-slate-200/60 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
              }`}
            >
              {document.mandatory ? t.mandatory : t.optional}
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {document.description}
          </p>
        </div>
      </div>

      {/* Info button */}
      <button
        type="button"
        onClick={() => onOpenDetails(document)}
        title={t.viewInfo}
        aria-label={`${t.viewInfo} for ${document.document_name}`}
        className="p-2 text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0 cursor-pointer"
      >
        <Info className="w-4 h-4" />
      </button>
    </div>
  );
};
