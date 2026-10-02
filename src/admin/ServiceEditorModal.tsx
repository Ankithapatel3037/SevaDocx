import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  AlertCircle,
  Calendar,
  FileText,
  ListOrdered,
  Sparkles,
} from 'lucide-react';
import { Service, DocumentItem, Category, MasterDocument, VerificationStatus } from '../types';
import { api } from '../services/api';

interface ServiceEditorModalProps {
  isOpen: boolean;
  service: Service | null; // null means create new
  categories: Category[];
  onClose: () => void;
  onSave: (savedService: Service) => void;
}

export const ServiceEditorModal: React.FC<ServiceEditorModalProps> = ({
  isOpen,
  service,
  categories,
  onClose,
  onSave,
}) => {
  const isEditing = !!service;

  // Master documents for quick document selection
  const [masterDocs, setMasterDocs] = useState<MasterDocument[]>([]);

  // Form State
  const [serviceId, setServiceId] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [category, setCategory] = useState(categories[0]?.id || 'certificates');
  const [department, setDepartment] = useState('');
  const [portalName, setPortalName] = useState('');
  const [jurisdiction, setJurisdiction] = useState('central');
  const [description, setDescription] = useState('');
  const [applicationUrl, setApplicationUrl] = useState('');
  const [fees, setFees] = useState('');
  const [processingTime, setProcessingTime] = useState('');
  const [whereToApply, setWhereToApply] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('verified');
  const [lastVerified, setLastVerified] = useState('');
  const [keywordsInput, setKeywordsInput] = useState('');
  const [eligibilityInput, setEligibilityInput] = useState('');
  const [importantNotesInput, setImportantNotesInput] = useState('');
  const [processSteps, setProcessSteps] = useState<string[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    api.getMasterDocuments().then(setMasterDocs);
  }, []);

  // Initialize or reset form
  useEffect(() => {
    if (service) {
      setServiceId(service.service_id);
      setServiceName(service.service_name);
      setCategory(service.category);
      setDepartment(service.department);
      setPortalName(service.portal_name);
      setJurisdiction(service.jurisdiction);
      setDescription(service.description);
      setApplicationUrl(service.application_url);
      setFees(service.fees || '');
      setProcessingTime(service.processing_time || '');
      setWhereToApply(service.where_to_apply || '');
      setVerificationStatus(service.verification_status);
      setLastVerified(service.last_verified || new Date().toISOString().split('T')[0]);
      setKeywordsInput((service.keywords || []).join(', '));
      setEligibilityInput((service.eligibility || []).join('\n'));
      setImportantNotesInput((service.important_notes || []).join('\n'));
      setProcessSteps(service.application_process || []);
      setDocuments(service.documents || []);
    } else {
      const today = new Date().toISOString().split('T')[0];
      setServiceId(`service_${Date.now()}`);
      setServiceName('');
      setCategory(categories[0]?.id || 'certificates');
      setDepartment('');
      setPortalName('');
      setJurisdiction('Telangana');
      setDescription('');
      setApplicationUrl('');
      setFees('Free of cost');
      setProcessingTime('7 working days');
      setWhereToApply('MeeSeva Centre or citizen portal');
      setVerificationStatus('verified');
      setLastVerified(today);
      setKeywordsInput('');
      setEligibilityInput('');
      setImportantNotesInput('');
      setProcessSteps(['Submit application form.', 'Attach required documents.', 'Pay applicable fee and collect receipt.']);
      setDocuments([
        {
          document_id: 'doc_aadhaar',
          document_name: 'Aadhaar Card',
          description: 'Valid Aadhaar card proof.',
          mandatory: true,
          accepted_examples: ['Original or e-Aadhaar'],
        },
      ]);
    }
    setErrors({});
  }, [service, isOpen, categories]);

  if (!isOpen) return null;

  // Mark as verified today helper
  const handleMarkVerifiedToday = () => {
    const today = new Date().toISOString().split('T')[0];
    setLastVerified(today);
    setVerificationStatus('verified');
  };

  // Process Steps helpers
  const handleAddStep = () => {
    setProcessSteps(prev => [...prev, '']);
  };

  const handleUpdateStep = (index: number, text: string) => {
    setProcessSteps(prev => {
      const updated = [...prev];
      updated[index] = text;
      return updated;
    });
  };

  const handleRemoveStep = (index: number) => {
    setProcessSteps(prev => prev.filter((_, i) => i !== index));
  };

  const handleMoveStep = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === processSteps.length - 1)
    ) {
      return;
    }
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    setProcessSteps(prev => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      return updated;
    });
  };

  // Document management helpers
  const handleAddCustomDocument = () => {
    const newDoc: DocumentItem = {
      document_id: `doc_${Date.now()}`,
      document_name: 'New Required Document',
      description: 'Short explanation of this document.',
      mandatory: true,
      accepted_examples: ['Accepted document copy'],
    };
    setDocuments(prev => [...prev, newDoc]);
  };

  const handleAddFromMaster = (masterId: string) => {
    const found = masterDocs.find(m => m.document_id === masterId);
    if (!found) return;

    // Check if already in documents
    if (documents.some(d => d.document_id === found.document_id)) {
      alert(`"${found.document_name}" is already included in this service.`);
      return;
    }

    const doc: DocumentItem = {
      document_id: found.document_id,
      document_name: found.document_name,
      description: found.description,
      mandatory: true,
      accepted_examples: found.accepted_examples || [],
      validity: found.typical_validity,
    };
    setDocuments(prev => [...prev, doc]);
  };

  const handleUpdateDocument = (index: number, field: keyof DocumentItem, value: any) => {
    setDocuments(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleRemoveDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleMoveDocument = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === documents.length - 1)
    ) {
      return;
    }
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    setDocuments(prev => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      return updated;
    });
  };

  // Form Validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!serviceName.trim()) newErrors.serviceName = 'Service name is required';
    if (!department.trim()) newErrors.department = 'Department name is required';
    if (!portalName.trim()) newErrors.portalName = 'Portal name is required';
    if (!description.trim()) newErrors.description = 'Description is required';

    if (!applicationUrl.trim()) {
      newErrors.applicationUrl = 'Application URL is required';
    } else {
      try {
        new URL(applicationUrl);
      } catch {
        newErrors.applicationUrl = 'Must be a valid URL starting with http:// or https://';
      }
    }

    if (documents.length === 0) {
      newErrors.documents = 'At least one required document must be added';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const keywords = keywordsInput
      .split(',')
      .map(k => k.trim())
      .filter(Boolean);

    const eligibility = eligibilityInput
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    const importantNotes = importantNotesInput
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    const cleanedSteps = processSteps.map(s => s.trim()).filter(Boolean);

    const updatedService: Service = {
      service_id: serviceId.trim(),
      service_name: serviceName.trim(),
      category,
      department: department.trim(),
      portal_name: portalName.trim(),
      jurisdiction,
      description: description.trim(),
      keywords,
      eligibility,
      documents,
      application_process: cleanedSteps,
      fees: fees.trim() || 'Verify on official portal',
      processing_time: processingTime.trim() || 'Verify on official portal',
      application_url: applicationUrl.trim(),
      where_to_apply: whereToApply.trim() || undefined,
      important_notes: importantNotes,
      last_verified: lastVerified,
      verification_status: verificationStatus,
    };

    onSave(updatedService);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="editor-modal-title"
    >
      <div
        className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 id="editor-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
              {isEditing ? `Edit Service: ${service?.service_name}` : 'Add New Government Service'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Configure service parameters, documents checklist, process steps, and official URLs.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close editor"
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 text-sm">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-1">
              1. Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Service Name *
                </label>
                <input
                  type="text"
                  value={serviceName}
                  onChange={e => setServiceName(e.target.value)}
                  placeholder="e.g. Income Certificate"
                  className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                    errors.serviceName ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
                {errors.serviceName && (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.serviceName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Department *
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  placeholder="e.g. Revenue Department"
                  className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                    errors.department ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
                {errors.department && (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.department}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Portal Name *
                </label>
                <input
                  type="text"
                  value={portalName}
                  onChange={e => setPortalName(e.target.value)}
                  placeholder="e.g. MeeSeva Telangana"
                  className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                    errors.portalName ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
                {errors.portalName && (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.portalName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Jurisdiction *
                </label>
                <select
                  value={jurisdiction}
                  onChange={e => setJurisdiction(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="central">Central Government</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Application URL (Official Portal) *
                </label>
                <input
                  type="url"
                  value={applicationUrl}
                  onChange={e => setApplicationUrl(e.target.value)}
                  placeholder="https://meeseva.telangana.gov.in"
                  className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                    errors.applicationUrl ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
                {errors.applicationUrl && (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.applicationUrl}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Short Description *
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="One or two sentences explaining what this service is for."
                className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                  errors.description ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
              {errors.description && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Section 2: Verification Status & Dates */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-1">
              2. Verification & Portal Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Verification Status
                </label>
                <select
                  value={verificationStatus}
                  onChange={e => setVerificationStatus(e.target.value as VerificationStatus)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="verified">Verified (Accurate & Confirmed)</option>
                  <option value="needs_review">Needs Review (Uncertain/Estimated)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Last Verified Date
                </label>
                <input
                  type="date"
                  value={lastVerified}
                  onChange={e => setLastVerified(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleMarkVerifiedToday}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800 rounded-xl text-xs font-semibold transition-colors min-h-[38px] cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Mark as Verified Today</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Fees (or "Verify on official portal")
                </label>
                <input
                  type="text"
                  value={fees}
                  onChange={e => setFees(e.target.value)}
                  placeholder="e.g. ₹45 statutory fee"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Processing Time
                </label>
                <input
                  type="text"
                  value={processingTime}
                  onChange={e => setProcessingTime(e.target.value)}
                  placeholder="e.g. 7 to 15 working days"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Where to Apply
                </label>
                <input
                  type="text"
                  value={whereToApply}
                  onChange={e => setWhereToApply(e.target.value)}
                  placeholder="e.g. MeeSeva Centre or online portal"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Documents Checklist Editor (Add, remove, reorder, toggle mandatory) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1 flex-wrap gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                3. Documents Required ({documents.length}) *
              </h3>

              <div className="flex items-center gap-2">
                {/* Pick from Master */}
                <select
                  onChange={e => {
                    if (e.target.value) {
                      handleAddFromMaster(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  defaultValue=""
                  aria-label="Add from Master Documents"
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  <option value="" disabled>
                    + Add from Master Documents...
                  </option>
                  {masterDocs.map(m => (
                    <option key={m.document_id} value={m.document_id}>
                      {m.document_name}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={handleAddCustomDocument}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 rounded-lg text-xs font-semibold hover:bg-sky-100 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Custom Doc</span>
                </button>
              </div>
            </div>

            {errors.documents && (
              <p className="text-xs text-rose-500">{errors.documents}</p>
            )}

            <div className="space-y-3">
              {documents.map((doc, idx) => (
                <div
                  key={doc.document_id || idx}
                  className="p-3.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                      <input
                        type="text"
                        value={doc.document_name}
                        onChange={e => handleUpdateDocument(idx, 'document_name', e.target.value)}
                        placeholder="Document Name"
                        className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold bg-white dark:bg-slate-900 text-slate-900 dark:text-white flex-1"
                      />
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Toggle mandatory */}
                      <button
                        type="button"
                        onClick={() => handleUpdateDocument(idx, 'mandatory', !doc.mandatory)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-colors cursor-pointer ${
                          doc.mandatory
                            ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400'
                            : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {doc.mandatory ? 'Mandatory' : 'Optional'}
                      </button>

                      {/* Move up / down */}
                      <button
                        type="button"
                        onClick={() => handleMoveDocument(idx, 'up')}
                        disabled={idx === 0}
                        aria-label="Move document up"
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveDocument(idx, 'down')}
                        disabled={idx === documents.length - 1}
                        aria-label="Move document down"
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleRemoveDocument(idx)}
                        aria-label="Remove document"
                        className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-0.5">
                        Description / What it is:
                      </label>
                      <input
                        type="text"
                        value={doc.description}
                        onChange={e => handleUpdateDocument(idx, 'description', e.target.value)}
                        placeholder="Brief document explanation"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-0.5">
                        Accepted Examples (comma-separated):
                      </label>
                      <input
                        type="text"
                        value={(doc.accepted_examples || []).join(', ')}
                        onChange={e =>
                          handleUpdateDocument(
                            idx,
                            'accepted_examples',
                            e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                          )
                        }
                        placeholder="e.g. e-Aadhaar, PVC Card"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Process Steps, Eligibility & Notes */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-1">
              4. Application Process Steps & Additional Details
            </h3>

            {/* Application steps */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Ordered Process Steps ({processSteps.length})
                </label>
                <button
                  type="button"
                  onClick={handleAddStep}
                  className="inline-flex items-center gap-1 text-xs text-sky-600 dark:text-sky-400 font-semibold hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Step</span>
                </button>
              </div>

              {processSteps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={step}
                    onChange={e => handleUpdateStep(idx, e.target.value)}
                    placeholder={`Step ${idx + 1}`}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleMoveStep(idx, 'up')}
                    disabled={idx === 0}
                    aria-label="Move step up"
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveStep(idx, 'down')}
                    disabled={idx === processSteps.length - 1}
                    aria-label="Move step down"
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveStep(idx)}
                    aria-label="Delete step"
                    className="p-1 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Eligibility & Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Eligibility Criteria (One per line)
                </label>
                <textarea
                  rows={3}
                  value={eligibilityInput}
                  onChange={e => setEligibilityInput(e.target.value)}
                  placeholder="Resident of the state&#10;Income below specified ceiling"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Important Notes / Warnings (One per line)
                </label>
                <textarea
                  rows={3}
                  value={importantNotesInput}
                  onChange={e => setImportantNotesInput(e.target.value)}
                  placeholder="Certificate valid for 1 year&#10;Original documents required at counter"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Search Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={keywordsInput}
                onChange={e => setKeywordsInput(e.target.value)}
                placeholder="income, scholarship, tahsildar, meeseva, epass"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3 sticky bottom-0 bg-white dark:bg-slate-900 py-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-sm shadow-sky-600/30 min-h-[44px] cursor-pointer"
            >
              {isEditing ? 'Save Changes' : 'Create Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
