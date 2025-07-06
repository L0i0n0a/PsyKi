import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ParticipantStore {
  code: string;
  setCode: (code: string) => void;
  correctCount: number;
  totalCount: number;
  incrementAccuracy: (isCorrect: boolean) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useParticipantStore = create<ParticipantStore>()(
  persist(
    (set) => ({
      code: '',
      setCode: (code) => set({ code }),
      correctCount: 0,
      totalCount: 0,
      incrementAccuracy: (isCorrect: boolean) =>
        set((state) => ({
          correctCount: state.correctCount + (isCorrect ? 1 : 0),
          totalCount: state.totalCount + 1,
        })),
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'participant-store',
      partialize: (state) => ({
        code: state.code,
        correctCount: state.correctCount,
        totalCount: state.totalCount,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
