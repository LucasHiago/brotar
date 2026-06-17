// Estado global com Zustand + persist (mesmo padrão do specialist-app do Steply).
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  nome: string | null;
  setAuth: (token: string, nome: string) => void;
  clear: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      nome: null,
      setAuth: (token, nome) => set({ token, nome }),
      clear: () => set({ token: null, nome: null }),
    }),
    {
      name: 'brotar-auth',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
