import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ParticipantStore {
  code: string;
  setCode: (code: string) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useParticipantStore = create<ParticipantStore>()(
  persist(
    (set) => ({
      code: '',
      setCode: (code) => set({ code }),
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'participant-store',
      partialize: (state) => ({ code: state.code }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
