
const FAVORITES_KEY = 'flowerShop_favorites';

export const favoritesService = {
  getFavorites: () => {
    try {
      const favorites = localStorage.getItem(FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },

  addFavorite: (productId) => {
    try {
      const favorites = favoritesService.getFavorites();
      if (!favorites.includes(productId)) {
        favorites.push(productId);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      }
      return favorites;
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  },

  removeFavorite: (productId) => {
    try {
      let favorites = favoritesService.getFavorites();
      favorites = favorites.filter(id => id !== productId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return favorites;
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  },

  isFavorite: (productId) => {
    const favorites = favoritesService.getFavorites();
    return favorites.includes(productId);
  },

  toggleFavorite: (productId) => {
    if (favoritesService.isFavorite(productId)) {
      return favoritesService.removeFavorite(productId);
    } else {
      return favoritesService.addFavorite(productId);
    }
  },

  clearFavorites: () => {
    localStorage.removeItem(FAVORITES_KEY);
    return [];
  },

  getCount: () => {
    return favoritesService.getFavorites().length;
  },
};

export default favoritesService;
