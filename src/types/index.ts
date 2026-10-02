export type Jurisdiction = 'central' | 'Telangana' | 'Andhra Pradesh' | string;
export type VerificationStatus = 'verified' | 'needs_review';

export interface DocumentItem {
  document_id: string;
  document_name: string;
  description: string;
  mandatory: boolean;
  accepted_examples?: string[];
  issuing_authority?: string;
  validity?: string;
}

export interface MasterDocument {
  document_id: string;
  document_name: string;
  description: string;
  category?: string;
  accepted_examples: string[];
  typical_validity?: string;
}

export interface Service {
  service_id: string;
  service_name: string;
  category: string;
  department: string;
  portal_name: string;
  jurisdiction: Jurisdiction;
  description: string;
  keywords: string[];
  eligibility: string[];
  documents: DocumentItem[];
  application_process: string[]; // ordered steps
  fees: string;
  processing_time: string;
  application_url: string;
  where_to_apply?: string;
  important_notes: string[];
  related_service_ids?: string[];
  last_verified: string; // YYYY-MM-DD
  verification_status: VerificationStatus;
  popular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Lucide icon key
  description: string;
}

export interface UserChecklistState {
  [serviceId: string]: {
    checkedDocumentIds: string[];
    updatedAt: string;
  };
}

export interface UserSettings {
  language: 'en' | 'te' | 'hi';
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
}
