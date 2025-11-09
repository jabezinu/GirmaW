import { create } from 'zustand';

const getInitialToken = () => localStorage.getItem('token') || '';
const getInitialUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const useAuthStore = create((set) => ({
  token: getInitialToken(),
  user: getInitialUser(),
  loading: false,
  error: '',

  login: async (phone, password) => {
    set({ loading: true, error: '' });
    // Simulate login with hardcoded credentials for demo
    if (phone === 'admin' && password === 'password') {
      const token = 'mock-token-' + Date.now();
      const user = { id: 1, name: 'Manager', phone };
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      set({ token, user, loading: false, error: '' });
      return true;
    } else {
      set({ error: 'Invalid credentials', loading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ token: '', user: null });
  },

  changePassword: async (oldPassword, newPassword) => {
    set({ loading: true, error: '' });
    // Simulate password change
    setTimeout(() => {
      set({ loading: false, error: '' });
      return true;
    }, 500);
  },

  changePhoneNumber: async (newPhone, password) => {
    set({ loading: true, error: '' });
    // Simulate phone change
    const currentUser = getInitialUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, phone: newPhone };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      set({ user: updatedUser, loading: false, error: '' });
      return { success: true, message: 'Phone number updated successfully' };
    } else {
      set({ error: 'User not found', loading: false });
      return { success: false, message: 'User not found' };
    }
  },
}));

export default useAuthStore;