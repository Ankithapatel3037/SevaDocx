import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Clock,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  FileCheck,
} from 'lucide-react';
import { Service, Category } from '../types';
import { api } from '../services/api';
import { useApp } from '../context/AppContext';
import { SearchBar } from '../components/SearchBar';
import { CategoryChip } from '../components/CategoryChip';
import { ServiceCard } from '../components/ServiceCard';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t, recents } = useApp();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [jurisdiction, setJurisdiction] = useState<string>('all');
  const [services, setServices] = useState<Service[]>([]);
  const [recentServices, setRecentServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load categories and initial popular services
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [cats, allServs] = await Promise.all([
          api.getCategories(),
          api.getServices(),
        ]);
        setCategories(cats);
        setServices(allServs);

        // Load recently viewed services if any
        if (recents.length > 0) {
          const recentsLoaded = allServs.filter(s => recents.includes(s.service_id));
          setRecentServices(recentsLoaded);
        }
      } catch (err) {
        console.error('Failed to load home data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [recents]);

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/search');
    }
  };

  // Filtered services for display
  const displayedServices = services.filter(service => {
    const matchesCategory =
      selectedCategory === 'all' ||
      service.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesJurisdiction =
      jurisdiction === 'all' ||
      service.jurisdiction.toLowerCase() === jurisdiction.toLowerCase();
    return matchesCategory && matchesJurisdiction;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Top Disclaimer Notification */}
      <DisclaimerBanner variant="subtle" />

      {/* Hero / Quick Search Section - Compact & Purposeful */}
      <section className="bg-gradient-to-b from-sky-50/70 to-transparent dark:from-slate-900/60 dark:to-transparent rounded-3xl p-5 sm:p-7 border border-sky-100/60 dark:border-slate-800">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-800 text-sky-700 dark:text-sky-300 text-xs font-semibold shadow-subtle border border-sky-100 dark:border-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>MeeSeva & Central Citizen Portal Guide</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Know what you need <br className="hidden sm:inline" />
            <span className="text-sky-600 dark:text-sky-400">before you apply.</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
            Check verified required documents, fees, eligibility, and step-by-step procedures
            for state and central government services.
          </p>

          {/* Search bar */}
          <div className="pt-2 max-w-xl mx-auto">
            <SearchBar
              variant="large"
              onSubmit={handleSearchSubmit}
              placeholder={t.searchPlaceholder}
            />
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
              {t.searchHint}
            </p>
          </div>
        </div>
      </section>

      {/* Category Chips - Horizontally scrollable */}
      <section aria-label="Service Categories">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>{t.allCategories}</span>
          </h2>

          {/* Jurisdiction Quick Filter */}
          <div className="flex items-center gap-1">
            <label htmlFor="home-jurisdiction" className="text-xs text-slate-400 sr-only">
              Jurisdiction
            </label>
            <select
              id="home-jurisdiction"
              value={jurisdiction}
              onChange={e => setJurisdiction(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer min-h-[36px]"
            >
              <option value="all">All Jurisdictions</option>
              <option value="central">Central Gov</option>
              <option value="Telangana">Telangana (MeeSeva)</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
            </select>
          </div>
        </div>

        {/* Scrollable container */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <CategoryChip
            category={{ id: 'all', name: 'All Services', icon: 'Sparkles' }}
            isActive={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')}
          />
          {categories.map(cat => (
            <CategoryChip
              key={cat.id}
              category={cat}
              isActive={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
            />
          ))}
        </div>
      </section>

      {/* Recently Viewed Row (if any) */}
      {recentServices.length > 0 && (
        <section aria-label="Recently Viewed Services">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>{t.recentlyViewed}</span>
            </h2>
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-0.5"
            >
              <span>View all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {recentServices.slice(0, 3).map(service => (
              <ServiceCard key={`recent-${service.service_id}`} service={service} />
            ))}
          </div>
        </section>
      )}

      {/* Popular / Filtered Services Section - Compact 2-column layout */}
      <section aria-label="Services Catalog">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              {selectedCategory === 'all' ? t.popularServices : 'Available Services'}
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {displayedServices.length}
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/search')}
            className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-0.5"
          >
            <span>Search all</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 4, 5].map(i => (
              <div
                key={i}
                className="h-40 rounded-2xl bg-slate-100 dark:bg-slate-800/50 animate-pulse border border-slate-200/60 dark:border-slate-800"
              />
            ))}
          </div>
        ) : displayedServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedServices.map(service => (
              <ServiceCard key={service.service_id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6">
            <FileCheck className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No services match the selected filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setJurisdiction('all');
              }}
              className="mt-3 text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* Quick Citizen Tips Callout */}
      <section className="bg-slate-100/70 dark:bg-slate-800/40 rounded-2xl p-4 sm:p-5 border border-slate-200/60 dark:border-slate-700/50 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
        <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          <span>Quick Citizen Checklist Tips</span>
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          <li className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/50 dark:border-slate-800">
            <strong>1. Check Name Consistency:</strong> Ensure spelling on Aadhaar matches your SSC marks memo exactly.
          </li>
          <li className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/50 dark:border-slate-800">
            <strong>2. Keep 2 Photocopies:</strong> Carry original documents along with 2 signed photocopies to MeeSeva/CSC counters.
          </li>
          <li className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/50 dark:border-slate-800">
            <strong>3. Active Mobile Number:</strong> Ensure your mobile number is linked to Aadhaar for instant OTP verifications.
          </li>
        </ul>
      </section>
    </div>
  );
};
