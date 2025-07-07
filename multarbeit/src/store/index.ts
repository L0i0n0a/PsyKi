import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ParticipantStore {
  code: string;
  setCode: (code: string) => void;
  correctCount: number;
  totalCount: number;
  incrementAccuracy: (isCorrect: boolean) => void;
  hits: number;
  misses: number;
  falseAlarms: number;
  correctRejections: number;
  setHits: (n: number) => void;
  setMisses: (n: number) => void;
  setFalseAlarms: (n: number) => void;
  setCorrectRejections: (n: number) => void;
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
      hits: 0,
      misses: 0,
      falseAlarms: 0,
      correctRejections: 0,
      setHits: (n) => set({ hits: n }),
      setMisses: (n) => set({ misses: n }),
      setFalseAlarms: (n) => set({ falseAlarms: n }),
      setCorrectRejections: (n) => set({ correctRejections: n }),
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'participant-store',
      partialize: (state) => ({
        code: state.code,
        correctCount: state.correctCount,
        totalCount: state.totalCount,
        hits: state.hits,
        misses: state.misses,
        falseAlarms: state.falseAlarms,
        correctRejections: state.correctRejections,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
