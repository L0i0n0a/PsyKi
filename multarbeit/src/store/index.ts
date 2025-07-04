import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ParticipantStore {
  code: string;
  setCode: (code: string) => void;
}

export const useParticipantStore = create<ParticipantStore>()(
  persist(
    (set) => ({
      code: '',
      setCode: (code) => set({ code }),
    }),
    {
      name: 'participant-store',
      partialize: (state) => ({ code: state.code }),
    }
  )
);
