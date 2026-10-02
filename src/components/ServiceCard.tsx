import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Heart,
  FileCheck2,
  Building,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { Service } from '../types';
import { useApp } from '../context/AppContext';
import { VerifiedBadge } from './VerifiedBadge';

interface ServiceCardProps {
  service: Service;
  matchedDocs?: string[];
  showProgress?: boolean;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  matchedDocs,
  showProgress = true,
  className = '',
}) => {
  const { isFavorite, toggleFavorite, getChecklistProgress, t } = useApp();
  const favorited = isFavorite(service.service_id);
  const docCount = service.documents?.length || 0;
  const progress = getChecklistProgress(service.service_id, docCount);

  return (
    <div
      className={`group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 hover:border-sky-300 dark:hover:border-sky-800 hover:shadow-card transition-all duration-200 flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Top Badges & Favorite */}
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
              {service.jurisdiction === 'central'
                ? 'Central'
                : service.jurisdiction}
            </span>

            <VerifiedBadge status={service.verification_status} />
          </div>

          {/* Favorite button */}
          <button
            type="button"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(service.service_id);
            }}
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            className="p-2 -mr-1 text-slate-400 hover:text-rose-500 rounded-full hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 transition-transform active:scale-125 ${
                favorited
                  ? 'fill-rose-500 text-rose-500'
                  : 'text-slate-400 group-hover:text-slate-500 dark:text-slate-500'
              }`}
            />
          </button>
        </div>

        {/* Title and Short Description */}
        <Link
          to={`/service/${service.service_id}`}
          className="block group/link focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg"
        >
          <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover/link:text-sky-600 dark:group-hover/link:text-sky-400 transition-colors line-clamp-1 mb-1">
            {service.service_name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
            {service.description}
          </p>
        </Link>

        {/* Highlighted Matched Document (for Search page) */}
        {matchedDocs && matchedDocs.length > 0 && (
          <div className="mb-3 px-2.5 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/50 text-xs text-sky-800 dark:text-sky-300 flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-sky-950 dark:text-sky-200">
              {t.requiresDocument}:
            </span>
            <span className="font-medium underline decoration-sky-300">
              {matchedDocs.join(', ')}
            </span>
          </div>
        )}

        {/* Department / Portal info */}
        <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 mb-3 flex-wrap">
          <span className="inline-flex items-center gap-1 truncate max-w-[180px]">
            <Building className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{service.department}</span>
          </span>
          <span className="inline-flex items-center gap-1 truncate max-w-[150px]">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{service.portal_name}</span>
          </span>
        </div>
      </div>

      {/* Card Footer: Document count & Action Arrow */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
          <FileCheck2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span>
            {showProgress && progress.completed > 0 ? (
              <span className="text-sky-700 dark:text-sky-300 font-semibold">
                {progress.completed}/{docCount} {t.documentsReady}
              </span>
            ) : (
              <span>{docCount} docs required</span>
            )}
          </span>
        </div>

        <Link
          to={`/service/${service.service_id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 group-hover:translate-x-0.5 transition-transform min-h-[44px] min-w-[44px] justify-end"
          aria-label={`View required documents for ${service.service_name}`}
        >
          <span>View</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
