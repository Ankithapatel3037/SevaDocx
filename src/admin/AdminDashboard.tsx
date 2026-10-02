import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Plus,
  Download,
  Upload,
  Search,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  LogOut,
  Lock,
  ExternalLink,
  Filter,
  X,
} from 'lucide-react';
import { Service, Category } from '../types';
import { api } from '../services/api';
import { useApp } from '../context/AppContext';
import { VerifiedBadge } from '../components/VerifiedBadge';
import { ServiceEditorModal } from './ServiceEditorModal';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin, setAdmin } = useApp();

  // Auth gate state
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Catalog State
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [needsReviewOnly, setNeedsReviewOnly] = useState(false);

  // Editor Modal
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Import Modal
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importMode, setImportMode] = useState<'merge' | 'replace'>('merge');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Load catalog
  const loadCatalog = async () => {
    setLoading(true);
    try {
      const [cats, allServs] = await Promise.all([
        api.getCategories(),
        api.getServices(),
      ]);
      setCategories(cats);
      setServices(allServs);
    } catch (err) {
      console.error('Failed to load services for admin', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadCatalog();
    }
  }, [isAdmin]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check: allows "admin123" or "admin"
    if (passwordInput === 'admin123' || passwordInput === 'admin') {
      setAdmin(true);
      setAuthError('');
    } else {
      setAuthError('Invalid password. Default demo password is "admin123".');
    }
  };

  const handleLogout = () => {
    setAdmin(false);
  };

  const handleDeleteService = async (serviceId: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" (${serviceId})?`)) {
      await api.deleteService(serviceId);
      await loadCatalog();
    }
  };

  const handleSaveService = async (saved: Service) => {
    await api.saveService(saved);
    setIsEditorOpen(false);
    setEditingService(null);
    await loadCatalog();
  };

  const handleExportJson = async () => {
    const jsonStr = await api.exportServices();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sevdocs_services_catalog_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = async () => {
    if (!importJsonText.trim()) return;
    setImportStatus('Processing import...');
    const result = await api.importServices(importJsonText, importMode);
    setImportStatus(result.message);
    if (result.success) {
      setTimeout(() => {
        setIsImportModalOpen(false);
        setImportJsonText('');
        setImportStatus(null);
        loadCatalog();
      }, 1000);
    }
  };

  const handleResetToSeeds = async () => {
    if (
      window.confirm(
        'Are you sure you want to reset the catalog back to original seed data? Any local edits will be discarded.'
      )
    ) {
      await api.resetCatalog();
      await loadCatalog();
    }
  };

  // If not logged in, show Password Login Screen
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 animate-fade-in">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-card text-center">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
            Admin Authentication
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Enter administrator password to manage catalog services, verification dates, and documents.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-pass" className="sr-only">
                Password
              </label>
              <input
                id="admin-pass"
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="Enter password (e.g. admin123)"
                autoFocus
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              {authError && (
                <p className="text-xs text-rose-500 mt-2 text-left">{authError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm shadow-sky-600/30 cursor-pointer"
            >
              Sign In to Admin
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
            Demo passcode: <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-slate-700 dark:text-slate-300">admin123</code>
          </div>
        </div>
      </div>
    );
  }

  // Filtered services
  const filteredServices = services.filter(s => {
    const matchesQuery =
      !searchQuery ||
      s.service_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.service_id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      s.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesReview = needsReviewOnly
      ? s.verification_status === 'needs_review'
      : true;

    return matchesQuery && matchesCategory && matchesReview;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in pb-16">
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Service Catalog Manager
              </h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                Admin Active
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage Indian government service requirements, verify official URLs, and edit checklists.
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => {
              setEditingService(null);
              setIsEditorOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer min-h-[40px]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>

          <button
            type="button"
            onClick={handleExportJson}
            title="Download full catalog as JSON"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer min-h-[40px]"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON</span>
          </button>

          <button
            type="button"
            onClick={() => setIsImportModalOpen(true)}
            title="Bulk import services from JSON"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer min-h-[40px]"
          >
            <Upload className="w-4 h-4" />
            <span>Import JSON</span>
          </button>

          <button
            type="button"
            onClick={handleResetToSeeds}
            title="Reset catalog back to initial seeds"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer min-h-[40px]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1 px-3 py-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl text-xs font-semibold transition-colors cursor-pointer min-h-[40px]"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full md:w-auto flex-1">
          {/* Search box */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name, department, or ID..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Category filter */}
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Needs Review Filter Toggle */}
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={needsReviewOnly}
            onChange={e => setNeedsReviewOnly(e.target.checked)}
            className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
          />
          <span className="flex items-center gap-1 text-amber-700 dark:text-amber-400">
            <AlertTriangle className="w-3.5 h-3.5" />
            Show "Needs Review" Only
          </span>
        </label>
      </div>

      {/* Services Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Service Name & Dept</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Jurisdiction</th>
                <th className="py-3.5 px-4">Verification</th>
                <th className="py-3.5 px-4">Documents</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Loading catalog...
                  </td>
                </tr>
              ) : filteredServices.length > 0 ? (
                filteredServices.map(service => (
                  <tr
                    key={service.service_id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    {/* Name & Dept */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {service.service_name}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span>{service.department}</span>
                        <span>•</span>
                        <a
                          href={service.application_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-sky-600 inline-flex items-center gap-0.5"
                          title="Open application URL"
                        >
                          <span>{service.portal_name}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="capitalize px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs">
                        {service.category}
                      </span>
                    </td>

                    {/* Jurisdiction */}
                    <td className="py-3.5 px-4 font-medium text-xs">
                      {service.jurisdiction}
                    </td>

                    {/* Verification Status & Date */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-1 items-start">
                        <VerifiedBadge status={service.verification_status} />
                        {service.last_verified && (
                          <span className="text-[10px] text-slate-400">
                            {service.last_verified}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Documents count */}
                    <td className="py-3.5 px-4 font-semibold text-xs text-sky-700 dark:text-sky-400">
                      {service.documents?.length || 0} docs
                    </td>

                    {/* Action buttons */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingService(service);
                            setIsEditorOpen(true);
                          }}
                          aria-label={`Edit ${service.service_name}`}
                          className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteService(service.service_id, service.service_name)
                          }
                          aria-label={`Delete ${service.service_name}`}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No services found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer info */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 flex items-center justify-between">
          <span>
            Total Services: <strong>{services.length}</strong> (Showing {filteredServices.length})
          </span>
          <span>
            Needs Review: <strong>{services.filter(s => s.verification_status === 'needs_review').length}</strong>
          </span>
        </div>
      </div>

      {/* Service Editor Modal */}
      <ServiceEditorModal
        isOpen={isEditorOpen}
        service={editingService}
        categories={categories}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingService(null);
        }}
        onSave={handleSaveService}
      />

      {/* Bulk Import JSON Modal */}
      {isImportModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-sky-600" />
                <span>Bulk Import Services JSON</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsImportModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Paste a JSON array of services to seed or bulk-update the catalog.
            </p>

            <textarea
              rows={8}
              value={importJsonText}
              onChange={e => setImportJsonText(e.target.value)}
              placeholder='[ { "service_id": "...", "service_name": "...", ... } ]'
              className="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

            <div className="flex items-center gap-4 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="importMode"
                  value="merge"
                  checked={importMode === 'merge'}
                  onChange={() => setImportMode('merge')}
                  className="text-sky-600"
                />
                <span>Merge with existing (add or overwrite by ID)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="importMode"
                  value="replace"
                  checked={importMode === 'replace'}
                  onChange={() => setImportMode('replace')}
                  className="text-sky-600"
                />
                <span>Replace entire catalog</span>
              </label>
            </div>

            {importStatus && (
              <div className="p-3 bg-sky-50 dark:bg-sky-950 text-sky-800 dark:text-sky-200 text-xs rounded-xl">
                {importStatus}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImportSubmit}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white"
              >
                Import Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
