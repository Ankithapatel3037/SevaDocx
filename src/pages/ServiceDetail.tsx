import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ExternalLink,
  ChevronLeft,
  Building,
  MapPin,
  Clock,
  IndianRupee,
  HelpCircle,
  FileCheck2,
  ListOrdered,
  AlertTriangle,
  MapPinned,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Service, DocumentItem } from '../types';
import { api } from '../services/api';
import { useApp } from '../context/AppContext';
import { VerifiedBadge } from '../components/VerifiedBadge';
import { DocumentChecklistItem } from '../components/DocumentChecklistItem';
import { ProgressBar } from '../components/ProgressBar';
import { AccordionSection } from '../components/AccordionSection';
import { DocumentDetailModal } from '../components/DocumentDetailModal';
import { ServiceCard } from '../components/ServiceCard';

export const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    t,
    isFavorite,
    toggleFavorite,
    addRecentService,
    isDocumentChecked,
    toggleDocumentCheck,
    getChecklistProgress,
  } = useApp();

  const [service, setService] = useState<Service | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDocForModal, setSelectedDocForModal] = useState<DocumentItem | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchServiceData = async () => {
      setLoading(true);
      try {
        const found = await api.getServiceById(id);
        if (found) {
          setService(found);
          addRecentService(found.service_id);

          if (found.related_service_ids && found.related_service_ids.length > 0) {
            const related = await api.getRelatedServices(found.related_service_ids);
            setRelatedServices(related);
          } else {
            setRelatedServices([]);
          }
        } else {
          setService(null);
        }
      } catch (err) {
        console.error('Error fetching service details', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto animate-pulse py-6">
        <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        <div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          <div className="h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="max-w-md mx-auto text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          Service Not Found
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
          The requested service ID could not be located in our catalog.
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const favorited = isFavorite(service.service_id);
  const totalDocs = service.documents?.length || 0;
  const progress = getChecklistProgress(service.service_id, totalDocs);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in pb-10">
      {/* Back breadcrumb */}
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors min-h-[44px] cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Favorite button */}
        <button
          type="button"
          onClick={() => toggleFavorite(service.service_id)}
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all min-h-[44px] cursor-pointer ${
            favorited
              ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900/60'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
          }`}
        >
          <Heart
            className={`w-4 h-4 ${
              favorited ? 'fill-rose-500 text-rose-500' : 'text-slate-400'
            }`}
          />
          <span>{favorited ? 'Saved' : 'Save'}</span>
        </button>
      </div>

      {/* Header Info Card */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-subtle">
        {/* Badges row */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {service.jurisdiction === 'central'
              ? 'Central Government'
              : `${service.jurisdiction} Government`}
          </span>

          <VerifiedBadge
            status={service.verification_status}
            date={service.last_verified}
            showDate
          />

          <span className="text-xs text-slate-400 dark:text-slate-500 ml-auto hidden sm:inline">
            ID: <code className="text-[11px] font-mono">{service.service_id}</code>
          </span>
        </div>

        {/* Title & Description */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          {service.service_name}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 max-w-3xl">
          {service.description}
        </p>

        {/* Metadata Badges */}
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 flex-wrap pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <Building className="w-4 h-4 text-sky-600 dark:text-sky-400 flex-shrink-0" />
            <span>
              <strong>Dept:</strong> {service.department}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-sky-600 dark:text-sky-400 flex-shrink-0" />
            <span>
              <strong>Portal:</strong> {service.portal_name}
            </span>
          </div>
        </div>
      </section>

      {/* Mandatory Requirements Warning Banner */}
      <aside
        aria-label="Portal disclaimer"
        className="px-4 py-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-900 dark:bg-amber-950/20 dark:border-amber-900/40 dark:text-amber-300 text-xs sm:text-sm flex items-start gap-2.5"
      >
        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <span className="leading-snug">{t.requirementsWarning}</span>
      </aside>

      {/* 2-COLUMN DESKTOP LAYOUT (Minimizes scrolling on desktop & tablet) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Checklist & Readiness Progress (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-subtle space-y-5">
            {/* Checklist Header & Progress */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  <span>{t.documentsRequired}</span>
                </h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                  {totalDocs} total
                </span>
              </div>

              {/* Progress bar */}
              <ProgressBar
                completed={progress.completed}
                total={totalDocs}
                showPercent
              />
            </div>

            {/* Checklist Items list */}
            <div className="space-y-2.5" role="group" aria-label="Documents checklist">
              {service.documents.map(doc => (
                <DocumentChecklistItem
                  key={doc.document_id}
                  document={doc}
                  serviceId={service.service_id}
                  isChecked={isDocumentChecked(service.service_id, doc.document_id)}
                  onToggle={() => toggleDocumentCheck(service.service_id, doc.document_id)}
                  onOpenDetails={d => setSelectedDocForModal(d)}
                />
              ))}
            </div>

            {/* Official Portal Apply Button */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <a
                href={service.application_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm sm:text-base shadow-sm shadow-sky-600/30 active:scale-[0.99] transition-all min-h-[48px]"
              >
                <span>{t.applyOnOfficialPortal}</span>
                <ExternalLink className="w-4 h-4 stroke-[2.2]" />
              </a>

              <p className="text-[11px] text-center text-slate-400 dark:text-slate-500">
                Opens official government portal: <span className="font-mono text-slate-600 dark:text-slate-400">{new URL(service.application_url).hostname}</span>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Accordions for Secondary Info (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-3">
          {/* Eligibility Accordion */}
          {service.eligibility && service.eligibility.length > 0 && (
            <AccordionSection
              title={t.eligibility}
              icon={ShieldCheck}
              defaultOpen={true}
            >
              <ul className="space-y-2 pt-2 text-xs sm:text-sm">
                {service.eligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AccordionSection>
          )}

          {/* Application Process Steps */}
          {service.application_process && service.application_process.length > 0 && (
            <AccordionSection
              title={t.applicationProcess}
              icon={ListOrdered}
              defaultOpen={true}
              badge={`${service.application_process.length} steps`}
            >
              <ol className="space-y-3 pt-2 text-xs sm:text-sm">
                {service.application_process.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 leading-relaxed">
                    <span className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">{step}</span>
                  </li>
                ))}
              </ol>
            </AccordionSection>
          )}

          {/* Fees Accordion */}
          <AccordionSection title={t.fees} icon={IndianRupee}>
            <div className="pt-2 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
              {service.fees || 'Verify on official portal'}
            </div>
          </AccordionSection>

          {/* Processing Time Accordion */}
          <AccordionSection title={t.processingTime} icon={Clock}>
            <div className="pt-2 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
              {service.processing_time || 'Verify on official portal'}
            </div>
          </AccordionSection>

          {/* Where to Apply */}
          {service.where_to_apply && (
            <AccordionSection title={t.whereToApply} icon={MapPinned}>
              <div className="pt-2 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {service.where_to_apply}
              </div>
            </AccordionSection>
          )}

          {/* Important Notes */}
          {service.important_notes && service.important_notes.length > 0 && (
            <AccordionSection
              title={t.importantNotes}
              icon={AlertTriangle}
              defaultOpen={false}
            >
              <ul className="space-y-2 pt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {service.important_notes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </AccordionSection>
          )}
        </div>
      </div>

      {/* Related Services Row */}
      {relatedServices.length > 0 && (
        <section className="pt-8 border-t border-slate-200/80 dark:border-slate-800">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4">
            {t.relatedServices}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedServices.map(rel => (
              <ServiceCard key={rel.service_id} service={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Accessible Document Details Modal */}
      <DocumentDetailModal
        document={selectedDocForModal}
        isOpen={!!selectedDocForModal}
        onClose={() => setSelectedDocForModal(null)}
      />
    </div>
  );
};
