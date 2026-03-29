import api from '../utils/api';
import { demoPackages } from '../data/demoData';


export const packageService = {
  getAll: async (filters = {}) => {
    try {
      let packages = [...demoPackages];

      if (filters.featured) {
        packages = packages.filter(p => p.isFeatured);
      }

      return { data: packages };
    } catch (error) {
      console.error('Error fetching packages:', error);
      throw error;
    }
  },

  getBySlug: async (slug) => {
    try {
      const pkg = demoPackages.find(p => p.slug === slug);
      return { data: pkg };
    } catch (error) {
      console.error('Error fetching package:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const pkg = demoPackages.find(p => p.id === id);
      return { data: pkg };
    } catch (error) {
      console.error('Error fetching package:', error);
      throw error;
    }
  },

  getFeatured: async () => {
    try {
      const featured = demoPackages.filter(p => p.isFeatured);
      return { data: featured };
    } catch (error) {
      console.error('Error fetching featured packages:', error);
      throw error;
    }
  },
};

export default packageService;
