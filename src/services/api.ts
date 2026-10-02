import { Service, Category, MasterDocument } from '../types';
import seedServices from '../data/services.json';
import seedCategories from '../data/categories.json';
import seedDocuments from '../data/documents.json';
import {
  getStoredServicesOverride,
  saveStoredServicesOverride,
  resetStoredServices,
} from './storage';

// Helper to simulate lightweight async response
const delay = (ms = 50) => new Promise(resolve => setTimeout(resolve, ms));

// Load active working set of services (local overrides or JSON seeds)
export const getActiveServices = (): Service[] => {
  const overridden = getStoredServicesOverride();
  if (overridden && Array.isArray(overridden) && overridden.length > 0) {
    return overridden;
  }
  return seedServices as unknown as Service[];
};

export const api = {
  /**
   * Fetch all services with optional filters
   */
  async getServices(filters?: {
    category?: string;
    jurisdiction?: string;
    needsReview?: boolean;
    popular?: boolean;
  }): Promise<Service[]> {
    await delay();
    let services = getActiveServices();

    if (filters?.category && filters.category !== 'all') {
      services = services.filter(s => s.category.toLowerCase() === filters.category?.toLowerCase());
    }

    if (filters?.jurisdiction && filters.jurisdiction !== 'all') {
      services = services.filter(
        s => s.jurisdiction.toLowerCase() === filters.jurisdiction?.toLowerCase()
      );
    }

    if (filters?.needsReview !== undefined) {
      services = services.filter(s =>
        filters.needsReview ? s.verification_status === 'needs_review' : true
      );
    }

    if (filters?.popular) {
      services = services.filter(s => s.popular);
    }

    return services;
  },

  /**
   * Fetch single service by ID
   */
  async getServiceById(id: string): Promise<Service | null> {
    await delay();
    const services = getActiveServices();
    return services.find(s => s.service_id === id) || null;
  },

  /**
   * Get related services by array of IDs
   */
  async getRelatedServices(ids: string[]): Promise<Service[]> {
    if (!ids || ids.length === 0) return [];
    await delay();
    const services = getActiveServices();
    return services.filter(s => ids.includes(s.service_id));
  },

  /**
   * Fetch all categories
   */
  async getCategories(): Promise<Category[]> {
    await delay();
    return seedCategories as Category[];
  },

  /**
   * Fetch master documents list
   */
  async getMasterDocuments(): Promise<MasterDocument[]> {
    await delay();
    return seedDocuments as MasterDocument[];
  },

  /**
   * Search services with typo tolerance, keyword, category, and document matching
   */
  async searchServices(
    query: string,
    filters?: {
      category?: string;
      jurisdiction?: string;
      department?: string;
    }
  ): Promise<{
    services: Service[];
    matchedDocuments: Record<string, string[]>;
  }> {
    await delay(60);
    const services = getActiveServices();
    const cleanQuery = query.trim().toLowerCase();

    // Map to hold which documents matched for each service
    const matchedDocuments: Record<string, string[]> = {};

    let results = services;

    // Apply categorical filters
    if (filters?.category && filters.category !== 'all') {
      results = results.filter(
        s => s.category.toLowerCase() === filters.category?.toLowerCase()
      );
    }

    if (filters?.jurisdiction && filters.jurisdiction !== 'all') {
      results = results.filter(
        s => s.jurisdiction.toLowerCase() === filters.jurisdiction?.toLowerCase()
      );
    }

    if (filters?.department && filters.department !== 'all') {
      results = results.filter(
        s => s.department.toLowerCase().includes(filters.department?.toLowerCase() || '')
      );
    }

    if (!cleanQuery) {
      return { services: results, matchedDocuments };
    }

    // Split words for fuzzy/multi-term search
    const terms = cleanQuery.split(/\s+/).filter(Boolean);

    results = results.filter(service => {
      const name = service.service_name.toLowerCase();
      const desc = service.description.toLowerCase();
      const dept = service.department.toLowerCase();
      const portal = service.portal_name.toLowerCase();
      const category = service.category.toLowerCase();
      const keywords = (service.keywords || []).map(k => k.toLowerCase());

      // Check document matches
      const matchingDocs: string[] = [];
      (service.documents || []).forEach(doc => {
        const docName = doc.document_name.toLowerCase();
        const docDesc = doc.description.toLowerCase();
        const docExamples = (doc.accepted_examples || []).join(' ').toLowerCase();

        const docMatched = terms.some(
          t => docName.includes(t) || docDesc.includes(t) || docExamples.includes(t)
        );

        if (docMatched) {
          matchingDocs.push(doc.document_name);
        }
      });

      if (matchingDocs.length > 0) {
        matchedDocuments[service.service_id] = matchingDocs;
      }

      // Check service fields
      const serviceMatch = terms.some(t => {
        return (
          name.includes(t) ||
          desc.includes(t) ||
          dept.includes(t) ||
          portal.includes(t) ||
          category.includes(t) ||
          keywords.some(k => k.includes(t))
        );
      });

      return serviceMatch || matchingDocs.length > 0;
    });

    return { services: results, matchedDocuments };
  },

  /**
   * Save (Create or Update) a service
   */
  async saveService(service: Service): Promise<Service> {
    await delay();
    const current = getActiveServices();
    const index = current.findIndex(s => s.service_id === service.service_id);

    let updated: Service[];
    if (index >= 0) {
      updated = [...current];
      updated[index] = service;
    } else {
      updated = [service, ...current];
    }

    saveStoredServicesOverride(updated);
    return service;
  },

  /**
   * Delete a service by ID
   */
  async deleteService(serviceId: string): Promise<boolean> {
    await delay();
    const current = getActiveServices();
    const filtered = current.filter(s => s.service_id !== serviceId);
    saveStoredServicesOverride(filtered);
    return true;
  },

  /**
   * Bulk export all services as formatted JSON string
   */
  async exportServices(): Promise<string> {
    await delay();
    const services = getActiveServices();
    return JSON.stringify(services, null, 2);
  },

  /**
   * Bulk import services from JSON string
   */
  async importServices(
    jsonString: string,
    mode: 'merge' | 'replace' = 'merge'
  ): Promise<{ success: boolean; count: number; message: string }> {
    await delay();
    try {
      const parsed = JSON.parse(jsonString);
      if (!Array.isArray(parsed)) {
        return {
          success: false,
          count: 0,
          message: 'Invalid JSON format: Expected an array of services.',
        };
      }

      // Basic validation
      const validServices: Service[] = parsed.filter(item => {
        return (
          item.service_id &&
          item.service_name &&
          item.category &&
          Array.isArray(item.documents)
        );
      });

      if (validServices.length === 0) {
        return {
          success: false,
          count: 0,
          message: 'No valid services found in the JSON payload.',
        };
      }

      if (mode === 'replace') {
        saveStoredServicesOverride(validServices);
        return {
          success: true,
          count: validServices.length,
          message: `Successfully replaced catalog with ${validServices.length} services.`,
        };
      } else {
        const current = getActiveServices();
        const map = new Map<string, Service>();
        current.forEach(s => map.set(s.service_id, s));
        validServices.forEach(s => map.set(s.service_id, s));

        const merged = Array.from(map.values());
        saveStoredServicesOverride(merged);
        return {
          success: true,
          count: validServices.length,
          message: `Successfully merged ${validServices.length} services. Total catalog is now ${merged.length}.`,
        };
      }
    } catch (e: any) {
      return {
        success: false,
        count: 0,
        message: `Failed to parse JSON: ${e.message}`,
      };
    }
  },

  /**
   * Reset services to factory seed catalog
   */
  async resetCatalog(): Promise<Service[]> {
    await delay();
    resetStoredServices();
    return seedServices as unknown as Service[];
  },
};
