import { fetchCurrentCompany } from '@/service/api';
import { create } from 'zustand';
import { ICompany } from '../(dashboard)/home/page';

interface CompanyState {
  company: ICompany | undefined;
  loading: boolean;
  error: string | null;
  fetchCompany: () => Promise<void>;
}

export const UseCurrentCompany = create<CompanyState>((set) => ({
  company: undefined,
  loading: false,
  error: null,
  fetchCompany: async () => {
    set({ loading: true });
    try {
      const data = await fetchCurrentCompany();
      if (data.status === 200) {
        set({ company: data.data, loading: false });
      }
      console.log(data.status, 'dataaaaaaaaaaaaa');
      set({ loading: false, error: data.data });
    } catch (err) {
      console.error(err);
      set({ loading: false, error: 'failed to fetch company' });
    }
  },
}));
