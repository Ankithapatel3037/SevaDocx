import React, { useEffect } from 'react';
import { X, FileText, CheckCircle, Info, ShieldCheck, Clock } from 'lucide-react';
import { DocumentItem } from '../types';
import { useApp } from '../context/AppContext';

interface DocumentDetailModalProps {
  document: DocumentItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentDetailModal: React.FC<DocumentDetailModalProps> = ({
  document,
  isOpen,
  onClose,
}) => {
  const { t } = useApp();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !document) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="doc-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all p-6 relative max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    document.mandatory
                      ? 'bg-rose-50 text-rose-700 border border-rose-200/80 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/40'
                      : 'bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                  }`}
                >
                  {document.mandatory ? t.mandatory : t.optional}
                </span>
                {document.validity && (
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {document.validity}
                  </span>
                )}
              </div>
              <h3
                id="doc-modal-title"
                className="text-lg font-bold text-slate-900 dark:text-white"
              >
                {document.document_name}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close document details"
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto py-4 space-y-4 text-sm text-slate-700 dark:text-slate-300">
          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              What is this document?
            </h4>
            <p className="leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200">
              {document.description}
            </p>
          </div>

          {/* Accepted examples */}
          {document.accepted_examples && document.accepted_examples.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                Accepted Formats & Examples
              </h4>
              <ul className="space-y-2">
                {document.accepted_examples.map((example, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-900/30 text-xs sm:text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Issuing Authority / Advisory */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Citizen Tip:</strong> When uploading to official portals, ensure scanned
                PDFs are clear, under 100-200KB as per portal limits, and have no cropped corners.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-xl dark:bg-sky-600 dark:hover:bg-sky-500 transition-colors min-h-[44px] cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
