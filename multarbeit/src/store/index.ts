import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/* ========================================
   TYPE DEFINITIONS
   ======================================== */

/**
 * Interface for individual participant response data
 *
 * Represents a single decision trial response from a participant,
 * containing all necessary information for Signal Detection Theory
 * analysis and research evaluation.
 */
export interface Response {
  /** Sequential trial number for ordering and analysis */
  index: number;
  /** Correct color category (0 or 1) for the trial stimulus */
  color: number;
  /** Participant's slider response value (-100 to +100 scale) */
  sliderValue: number;
  /** ISO timestamp of when the response was recorded */
  timestamp?: string;
  /** Derived binary decision from slider value (orange/blue) */
  buttonPressed?: 'orange' | 'blue';
}

/**
 * Interface for the participant store state and actions
 *
 * Defines the complete state management structure for participant
 * data, including responses, metrics, and research phase tracking.
 */
interface ParticipantStore {
  /* ========================================
     PARTICIPANT IDENTIFICATION
     ======================================== */

  /** Unique participant identification code */
  code: string;
  /** Set participant identification code */
  setCode: (code: string) => void;

  /* ========================================
     ACCURACY TRACKING
     ======================================== */

  /** Number of correct responses made by participant */
  correctCount: number;
  /** Total number of responses recorded */
  totalCount: number;
  /** Update accuracy counts based on response correctness */
  incrementAccuracy: (isCorrect: boolean) => void;

  /* ========================================
     SIGNAL DETECTION THEORY METRICS
     ======================================== */

  /** True positive responses (correct identification of target) */
  hits: number;
  /** False negative responses (missed targets) */
  misses: number;
  /** False positive responses (incorrect target identification) */
  falseAlarms: number;
  /** True negative responses (correct rejection of non-targets) */
  correctRejections: number;

  /** Set hits count for SDT analysis */
  setHits: (n: number) => void;
  /** Set misses count for SDT analysis */
  setMisses: (n: number) => void;
  /** Set false alarms count for SDT analysis */
  setFalseAlarms: (n: number) => void;
  /** Set correct rejections count for SDT analysis */
  setCorrectRejections: (n: number) => void;

  /* ========================================
     STATE HYDRATION MANAGEMENT
     ======================================== */

  /** Flag indicating whether store has been hydrated from persistence */
  _hasHydrated: boolean;
  /** Set hydration status for client-side state management */
  setHasHydrated: (state: boolean) => void;

  /* ========================================
     RESEARCH PHASE MANAGEMENT
     ======================================== */

  /** Flag indicating whether test phase has been completed */
  testphaseFinished: boolean;
  /** Set test phase completion status */
  setTestphaseFinished: (finished: boolean) => void;

  /** Count of feedback items provided to participant */
  feedbackCount: number;
  /** Set feedback count for progress tracking */
  setFeedbackCount: (count: number) => void;

  /* ========================================
     TEST PHASE DATA MANAGEMENT
     ======================================== */

  /** Live test phase responses (mutable during test phase) */
  testphaseResponses: Response[];
  /** Add new response to live test phase data */
  addTestphaseResponse: (response: Response) => void;
  /** Clear live test phase responses */
  clearTestphaseResponses: () => void;

  /** Finalized test phase responses (immutable after completion) */
  finalTestphaseResponses: Response[];
  /** Set finalized test phase data (called once after test phase completion) */
  setFinalTestphaseResponses: (responses: Response[]) => void;

  /* ========================================
     MAIN PHASE DATA MANAGEMENT
     ======================================== */

  /** Main phase responses for primary data collection */
  mainphaseResponses: Response[];
  /** Add new response to main phase data */
  addMainphaseResponse: (response: Response) => void;
  /** Clear main phase responses */
  clearMainphaseResponses: () => void;
}

/* ========================================
   STORE IMPLEMENTATION
   ======================================== */

/**
 * Zustand store for participant data management
 *
 * Creates a persistent store that maintains participant responses,
 * research metrics, and experimental state across browser sessions.
 * Uses selective persistence to maintain data integrity while
 * optimizing storage performance.
 *
 */
export const useParticipantStore = create<ParticipantStore>()(
  persist(
    (set) => ({
      /* ========================================
         PARTICIPANT IDENTIFICATION
         ======================================== */

      code: '',
      setCode: (code) => set({ code }),

      /* ========================================
         ACCURACY TRACKING
         ======================================== */

      correctCount: 0,
      totalCount: 0,
      incrementAccuracy: (isCorrect: boolean) =>
        set((state) => ({
          correctCount: state.correctCount + (isCorrect ? 1 : 0),
          totalCount: state.totalCount + 1,
        })),

      /* ========================================
         SIGNAL DETECTION THEORY METRICS
         ======================================== */

      hits: 0,
      misses: 0,
      falseAlarms: 0,
      correctRejections: 0,
      setHits: (n) => set({ hits: n }),
      setMisses: (n) => set({ misses: n }),
      setFalseAlarms: (n) => set({ falseAlarms: n }),
      setCorrectRejections: (n) => set({ correctRejections: n }),

      /* ========================================
         STATE HYDRATION MANAGEMENT
         ======================================== */

      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),

      /* ========================================
         RESEARCH PHASE MANAGEMENT
         ======================================== */

      testphaseFinished: false,
      setTestphaseFinished: (finished) => set({ testphaseFinished: finished }),
      feedbackCount: 0,
      setFeedbackCount: (count) => set({ feedbackCount: count }),

      /* ========================================
         TEST PHASE DATA MANAGEMENT
         ======================================== */

      // Live test phase responses (mutable during collection)
      testphaseResponses: [],
      addTestphaseResponse: (response) =>
        set((state) => ({
          testphaseResponses: [...state.testphaseResponses, response],
        })),
      clearTestphaseResponses: () => set({ testphaseResponses: [] }),

      // Finalized test phase data (immutable research record)
      finalTestphaseResponses: [],
      setFinalTestphaseResponses: (responses) => set({ finalTestphaseResponses: responses }),

      /* ========================================
         MAIN PHASE DATA MANAGEMENT
         ======================================== */

      mainphaseResponses: [],
      addMainphaseResponse: (response) =>
        set((state) => ({
          mainphaseResponses: [...state.mainphaseResponses, response],
        })),
      clearMainphaseResponses: () => set({ mainphaseResponses: [] }),
    }),
    {
      /* ========================================
         PERSISTENCE CONFIGURATION
         ======================================== */

      name: 'participant-store',

      /**
       * Selective state persistence
       *
       * Defines which parts of the store state should be persisted
       * to browser storage. Excludes hydration flag and other
       * runtime-only state to optimize performance and data integrity.
       */
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

      /**
       * Hydration callback
       *
       * Sets the hydration flag when the store is successfully
       * restored from persistence, enabling proper client-side
       * state management and SSR compatibility.
       */
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
