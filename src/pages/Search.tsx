import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Sparkles, Filter } from 'lucide-react';
import { Service, Category } from '../types';
import { api } from '../services/api';
import { useApp } from '../context/AppContext';
import { SearchBar } from '../components/SearchBar';
import { ServiceCard } from '../components/ServiceCard';
import { EmptyState } from '../components/EmptyState';

export const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useApp();

  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';
  const initialJurisdiction = searchParams.get('jurisdiction') || 'all';

  const [query, setQuery] = useState<string>(initialQuery);
  const [category, setCategory] = useState<string>(initialCategory);
  const [jurisdiction, setJurisdiction] = useState<string>(initialJurisdiction);
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [matchedDocsMap, setMatchedDocsMap] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [showFilterDrawer, setShowFilterDrawer] = useState<boolean>(false);

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await api.getCategories();
        setCategories(cats);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };
    fetchCategories();
  }, []);

  // Execute search when query or filters change
  useEffect(() => {
    let isCancelled = false;

    const executeSearch = async () => {
      setLoading(true);
      try {
        const { services: results, matchedDocuments } = await api.searchServices(query, {
          category: category !== 'all' ? category : undefined,
          jurisdiction: jurisdiction !== 'all' ? jurisdiction : undefined,
        });

        if (!isCancelled) {
          setServices(results);
          setMatchedDocsMap(matchedDocuments);
        }
      } catch (err) {
        console.error('Search failed', err);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    executeSearch();

    // Sync query params in URL
    const params: Record<string, string> = {};
    if (query) params.q = query;
    if (category !== 'all') params.category = category;
    if (jurisdiction !== 'all') params.jurisdiction = jurisdiction;
    setSearchParams(params, { replace: true });

    return () => {
      isCancelled = true;
    };
  }, [query, category, jurisdiction, setSearchParams]);

  const handleResetFilters = () => {
    setQuery('');
    setCategory('all');
    setJurisdiction('all');
  };

  const hasActiveFilters = category !== 'all' || jurisdiction !== 'all';

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in pb-12">
      {/* Search Header */}
      <div className="space-y-3">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          {t.navSearch} Services & Required Documents
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Find services by service name, department, or required document (e.g. searching "Income" will show both the Income Certificate and all scholarships requiring it).
        </p>

        {/* Search input with live debouncing */}
        <SearchBar
          value={query}
          onChange={val => setQuery(val)}
          placeholder={t.searchPlaceholder}
          autoFocus={!initialQuery}
          showFiltersTrigger
          onOpenFilters={() => setShowFilterDrawer(!showFilterDrawer)}
        />
      </div>

      {/* Filter Chips / Selectors Bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Category Filter */}
          <div className="relative">
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              aria-label="Filter by category"
              className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-xl px-3 py-2 pr-7 hover:border-slate-300 dark:hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer min-h-[38px]"
            >
              <option value="all">{t.allCategories}</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
              ▾
            </div>
          </div>

          {/* Jurisdiction Filter */}
          <div className="relative">
            <select
              value={jurisdiction}
              onChange={e => setJurisdiction(e.target.value)}
              aria-label="Filter by jurisdiction"
              className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-xl px-3 py-2 pr-7 hover:border-slate-300 dark:hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer min-h-[38px]"
            >
              <option value="all">{t.allJurisdictions}</option>
              <option value="central">{t.central}</option>
              <option value="Telangana">{t.telangana}</option>
              <option value="Andhra Pradesh">{t.andhraPradesh}</option>
            </select>
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
              ▾
            </div>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 px-2 py-1 rounded-lg hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Results Counter */}
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Showing <strong>{services.length}</strong> {services.length === 1 ? 'service' : 'services'}
        </div>
      </div>

      {/* Results Grid / Empty State */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(n => (
            <div
              key={n}
              className="h-44 rounded-2xl bg-slate-100 dark:bg-slate-800/40 animate-pulse border border-slate-200/60 dark:border-slate-800"
            />
          ))}
        </div>
      ) : services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map(service => (
            <ServiceCard
              key={service.service_id}
              service={service}
              matchedDocs={matchedDocsMap[service.service_id]}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={t.noServicesFound}
          description={`No services matched "${query || category}". Try searching for specific documents like Aadhaar, Income, Caste, Bonafide or Ration Card.`}
          onSelectSuggestion={suggested => setQuery(suggested)}
          onReset={handleResetFilters}
        />
      )}
    </div>
  );
};
