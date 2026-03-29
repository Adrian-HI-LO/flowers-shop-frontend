import api from '../utils/api';


export const authService = {
  login: async (email, password) => {
    try {

      const demoUser = {
        id: '1',
        email: email,
        firstName: 'Usuario',
        lastName: 'Demo',
        role: 'customer',
      };
      const demoToken = 'demo_token_123456789';

      localStorage.setItem('token', demoToken);
      localStorage.setItem('user', JSON.stringify(demoUser));

      return { data: { user: demoUser, token: demoToken } };
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {

      const demoUser = {
        id: '2',
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'customer',
      };
      const demoToken = 'demo_token_987654321';

      localStorage.setItem('token', demoToken);
      localStorage.setItem('user', JSON.stringify(demoUser));

      return { data: { user: demoUser, token: demoToken } };
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default authService;
