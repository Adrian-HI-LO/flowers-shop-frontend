import api from '../utils/api';
import { demoCategories } from '../data/demoData';


export const categoryService = {
  getAll: async () => {
    try {
      return { data: demoCategories };
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  getBySlug: async (slug) => {
    try {
      const category = demoCategories.find(cat => cat.slug === slug);
      return { data: category };
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const category = demoCategories.find(cat => cat.id === id);
      return { data: category };
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  },
};

export default categoryService;
