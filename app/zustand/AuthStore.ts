import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  company: true | null;
  user: true | null;
  role: 'company' | 'user' | null;
  setCompany: (company: true | null) => void;
  setUser: (user: true | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      company: null,
      user: null,
      role: null,
      setCompany: (company) =>
        set({
          company,
          user: null,
          role: company ? 'company' : null,
        }),
      setUser: (user) =>
        set({
          user,
          company: null,
          role: user ? 'user' : null,
        }),
      logout: () =>
        set({
          company: null,
          user: null,
          role: null,
        }),
    }),
    {
      name: 'auth-storage', // Key for localStorage
    }
  )
);
