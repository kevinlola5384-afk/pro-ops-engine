import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, PlanType, SectorType } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email, pass) => {
        // Mock login
        const mockUser: User = {
          id: '1',
          name: 'Jean Dupont',
          email,
          role: 'OWNER',
          sector: 'BEAUTY',
          profession: 'Barbier',
          country: 'France',
          city: 'Paris',
          phone: '+33612345678',
          plan: 'PRO',
          workspaceId: 'ws_1'
        };
        set({ user: mockUser, isAuthenticated: true });
      },
      register: async (userData) => {
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          role: 'OWNER',
          workspaceId: `ws_${Math.random().toString(36).substr(2, 5)}`,
          name: userData.name || '',
          email: userData.email || '',
          sector: userData.sector || 'BEAUTY',
          profession: userData.profession || '',
          country: userData.country || '',
          city: userData.city || '',
          phone: userData.phone || '',
          plan: userData.plan || 'INTRO',
          ...userData
        };
        set({ user: newUser, isAuthenticated: true });
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (data) => set((state) => ({ 
        user: state.user ? { ...state.user, ...data } : null 
      })),
    }),
    { name: 'opus-auth-storage' }
  )
);
