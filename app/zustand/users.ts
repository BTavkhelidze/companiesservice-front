import axios from 'axios';
import { create } from 'zustand';

interface IUsers {
  fullName: string;
  email: string;
  password: string;
}

interface IZustand {
  users: IUsers[];
  error: string | null;
  fetchUsers: () => Promise<void>;
  addUser: (newUser: IUsers) => Promise<void>;
}

export const useUsers = create<IZustand>((set) => ({
  users: [],
  error: null,
  fetchUsers: async () => {
    const response = await axios.get('/api/users', { withCredentials: true });
    set({ users: response.data.data });
  },
  addUser: async (newUser) => {
    set({ error: null });
    try {
      set((state) => {
        const userExists = state.users.some(
          (user) => user.email === newUser.email
        );
        if (!userExists) {
          return { users: [...state.users, newUser] };
        }
        return state;
      });
      const res = await axios.post('/api/signUp-user', newUser, {
        withCredentials: true,
      });
      console.log(res.data.status, res.data.message, 'ssssssssssssssressa');
      if (res.data.status === 400) {
        set({ error: res.data.message });
      } else {
        useUsers.getState().fetchUsers();
      }
    } catch (err) {
      set((state) => ({
        users: state.users.filter((user) => user.email !== newUser.email),
      }));
      console.error(err);
    }
  },
}));
