import { create } from 'zustand';

interface AuthState {
  company: { id: string; name: string } | null;
  user: { id: string; name: string; role: 'user' | 'admin' } | null;
  isAuthenticated: boolean;
  setCompany: (company: { id: string; name: string } | null) => void;
  setUser: (
    user: { id: string; name: string; role: 'user' | 'admin' } | null
  ) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  company: null,
  user: null,
  isAuthenticated: false,
  setCompany: (company) => set({ company, isAuthenticated: !!company }),
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ company: null, user: null, isAuthenticated: false }),
}));
