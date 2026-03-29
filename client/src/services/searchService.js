import { demoProducts } from '../data/demoData';


export const searchService = {
  search: async (query, filters = {}) => {
    try {

      if (!query || query.trim() === '') {
        return { data: [] };
      }

      const searchTerm = query.toLowerCase().trim();

      const productResults = demoProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );

      return { data: productResults };
    } catch (error) {
      console.error('Error searching:', error);
      throw error;
    }
  },
};

export default searchService;
