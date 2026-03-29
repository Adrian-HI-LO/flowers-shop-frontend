import api from '../utils/api';
import { demoProducts } from '../data/demoData';


export const productService = {
  getAll: async (filters = {}) => {
    try {
      let products = [...demoProducts];

      if (filters.categoryId) {
        products = products.filter(p => p.categoryId === filters.categoryId);
      }

      return { data: products };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getBySlug: async (slug) => {
    try {
      const product = demoProducts.find(p => p.slug === slug);
      return { data: product };
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const product = demoProducts.find(p => p.id === id);
      return { data: product };
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  getByCategory: async (categorySlug) => {
    try {
      const { demoCategories } = await import('../data/demoData');
      const category = demoCategories.find(c => c.slug === categorySlug);

      if (!category) {
        return { data: [] };
      }

      const products = demoProducts.filter(p => p.categoryId === category.id);
      return { data: products };
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },
};

export default productService;
