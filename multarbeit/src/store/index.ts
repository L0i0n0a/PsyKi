import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Response {
  index: number;
  color: number;
  sliderValue: number;
  timestamp?: string;
  buttonPressed?: 'orange' | 'blue';
}

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
  testphaseFinished: boolean;
  setTestphaseFinished: (finished: boolean) => void;
  feedbackCount: number;
  setFeedbackCount: (count: number) => void;

  // Testphase (live)
  testphaseResponses: Response[];
  addTestphaseResponse: (response: Response) => void;
  clearTestphaseResponses: () => void;

  // Finalized testphase data (immutable after testphase)
  finalTestphaseResponses: Response[];
  setFinalTestphaseResponses: (responses: Response[]) => void;

  // Mainphase
  mainphaseResponses: Response[];
  addMainphaseResponse: (response: Response) => void;
  clearMainphaseResponses: () => void;
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
      testphaseFinished: false,
      setTestphaseFinished: (finished) => set({ testphaseFinished: finished }),
      feedbackCount: 0,
      setFeedbackCount: (count) => set({ feedbackCount: count }),

      // Testphase (live)
      testphaseResponses: [],
      addTestphaseResponse: (response) =>
        set((state) => ({
          testphaseResponses: [...state.testphaseResponses, response],
        })),
      clearTestphaseResponses: () => set({ testphaseResponses: [] }),

      // Finalized testphase data (immutable after testphase)
      finalTestphaseResponses: [],
      setFinalTestphaseResponses: (responses) => set({ finalTestphaseResponses: responses }),

      // Mainphase
      mainphaseResponses: [],
      addMainphaseResponse: (response) =>
        set((state) => ({
          mainphaseResponses: [...state.mainphaseResponses, response],
        })),
      clearMainphaseResponses: () => set({ mainphaseResponses: [] }),
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
        testphaseResponses: state.testphaseResponses,
        finalTestphaseResponses: state.finalTestphaseResponses,
        mainphaseResponses: state.mainphaseResponses,
        testphaseFinished: state.testphaseFinished,
        feedbackCount: state.feedbackCount,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
