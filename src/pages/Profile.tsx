import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Clock,
  CheckSquare,
  Trash2,
  ArrowRight,
  Sparkles,
  Shield,
  FileCheck,
} from 'lucide-react';
import { Service } from '../types';
import { api } from '../services/api';
import { useApp } from '../context/AppContext';
import { ServiceCard } from '../components/ServiceCard';
import { ProgressBar } from '../components/ProgressBar';

export const Profile: React.FC = () => {
  const {
    t,
    favorites,
    recents,
    checklists,
    getChecklistProgress,
    clearUserData,
  } = useApp();

  const [favoriteServices, setFavoriteServices] = useState<Service[]>([]);
  const [recentServices, setRecentServices] = useState<Service[]>([]);
  const [checklistServices, setChecklistServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'checklists' | 'favorites' | 'recents'>(
    'checklists'
  );

  useEffect(() => {
    const loadProfileData = async () => {
      setLoading(true);
      try {
        const all = await api.getServices();

        // 1. Favorites
        setFavoriteServices(all.filter(s => favorites.includes(s.service_id)));

        // 2. Recents
        const orderedRecents = recents
          .map(id => all.find(s => s.service_id === id))
          .filter((s): s is Service => !!s);
        setRecentServices(orderedRecents);

        // 3. Active checklists (services that have at least 1 checked document)
        const checklistIds = Object.keys(checklists).filter(
          id => (checklists[id]?.checkedDocumentIds?.length || 0) > 0
        );
        setChecklistServices(all.filter(s => checklistIds.includes(s.service_id)));
      } catch (err) {
        console.error('Failed to load profile data', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [favorites, recents, checklists]);

  const handleClearData = () => {
    if (window.confirm(t.clearHistoryConfirm)) {
      clearUserData();
      setFavoriteServices([]);
      setRecentServices([]);
      setChecklistServices([]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-lg flex-shrink-0">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              My Citizen Desk
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Personal checklist tracker & bookmarked services (saved privately on your device)
            </p>
          </div>
        </div>

        {(favoriteServices.length > 0 ||
          recentServices.length > 0 ||
          checklistServices.length > 0) && (
          <button
            type="button"
            onClick={handleClearData}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors border border-rose-200/60 dark:border-rose-900/40 min-h-[40px] cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.clearHistory}</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('checklists')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all min-h-[44px] cursor-pointer ${
            activeTab === 'checklists'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>{t.savedChecklists}</span>
          <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-white/20">
            {checklistServices.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('favorites')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all min-h-[44px] cursor-pointer ${
            activeTab === 'favorites'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>{t.favorites}</span>
          <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-white/20">
            {favoriteServices.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('recents')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all min-h-[44px] cursor-pointer ${
            activeTab === 'recents'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>{t.recentlyViewed}</span>
          <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-white/20">
            {recentServices.length}
          </span>
        </button>
      </div>

      {/* Tab Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map(n => (
            <div
              key={n}
              className="h-40 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse border border-slate-200 dark:border-slate-800"
            />
          ))}
        </div>
      ) : activeTab === 'checklists' ? (
        <div>
          {checklistServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {checklistServices.map(service => {
                const total = service.documents?.length || 0;
                const progress = getChecklistProgress(service.service_id, total);
                return (
                  <div
                    key={service.service_id}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-subtle hover:border-sky-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {service.jurisdiction}
                        </span>
                        <span className="text-xs text-slate-400">
                          {progress.percent}% ready
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 line-clamp-1">
                        {service.service_name}
                      </h3>

                      <div className="my-3">
                        <ProgressBar
                          completed={progress.completed}
                          total={total}
                          showPercent={false}
                        />
                      </div>
                    </div>

                    <Link
                      to={`/service/${service.service_id}`}
                      className="mt-2 inline-flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-sky-50 dark:bg-slate-800 dark:hover:bg-slate-800/80 text-sky-700 dark:text-sky-300 text-xs font-semibold transition-colors"
                    >
                      <span>Continue checklist</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-14 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8">
              <CheckSquare className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                {t.noChecklists}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-5">
                Open any service and start ticking the required documents you have ready to track your preparation.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explore Services</span>
              </Link>
            </div>
          )}
        </div>
      ) : activeTab === 'favorites' ? (
        <div>
          {favoriteServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favoriteServices.map(service => (
                <ServiceCard key={service.service_id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-14 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8">
              <Heart className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                {t.noFavorites}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-5">
                Tap the heart icon on any service card to bookmark it for instant access.
              </p>
              <Link
                to="/search"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors"
              >
                <span>Find Services</span>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div>
          {recentServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentServices.map(service => (
                <ServiceCard key={`profile-recent-${service.service_id}`} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-14 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8">
              <Clock className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                {t.noRecents}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-5">
                Services you view will automatically be saved here for quick retrieval.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors"
              >
                <span>Browse Catalog</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
