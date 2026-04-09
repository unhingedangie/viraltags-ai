import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";
import type { GenerationResult, SavedSet } from "../types";

interface StoreState {
  // State
  generationHistory: GenerationResult[];
  savedSets: SavedSet[];
  isDarkMode: boolean;
  isDemo: boolean;
  dailyGenerations: number;
  lastGenerationDate: string; // YYYY-MM-DD format

  // Actions
  addGeneration: (generation: GenerationResult) => void;
  deleteGeneration: (id: string) => void;
  addSavedSet: (set: SavedSet) => void;
  updateSavedSet: (id: string, updates: Partial<SavedSet>) => void;
  deleteSavedSet: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleDarkMode: () => void;
  incrementDailyGenerations: () => void;
  resetDailyGenerationsIfNeeded: () => void;
  canGenerate: () => boolean;
}

// Custom storage to handle SSR
const createStorage = (): PersistStorage<StoreState> => {
  return {
    getItem: (name: string) => {
      if (typeof window === "undefined") {
        return null;
      }
      const item = localStorage.getItem(name);
      return item ? JSON.parse(item) : null;
    },
    setItem: (name: string, value: StoreState) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(name, JSON.stringify(value));
      }
    },
    removeItem: (name: string) => {
      if (typeof window !== "undefined") {
        localStorage.removeItem(name);
      }
    },
  };
};

const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // YYYY-MM-DD
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      generationHistory: [],
      savedSets: [],
      isDarkMode: true,
      isDemo: typeof process !== "undefined" && process.env.NEXT_PUBLIC_DEMO_MODE === "true",
      dailyGenerations: 0,
      lastGenerationDate: getTodayDate(),

      // Actions
      addGeneration: (generation: GenerationResult) => {
        set((state) => ({
          generationHistory: [generation, ...state.generationHistory],
        }));
      },

      deleteGeneration: (id: string) => {
        set((state) => ({
          generationHistory: state.generationHistory.filter((g) => g.id !== id),
        }));
      },

      addSavedSet: (set_param: SavedSet) => {
        set((state) => ({
          savedSets: [set_param, ...state.savedSets],
        }));
      },

      updateSavedSet: (id: string, updates: Partial<SavedSet>) => {
        set((state) => ({
          savedSets: state.savedSets.map((set_item) =>
            set_item.id === id ? { ...set_item, ...updates } : set_item
          ),
        }));
      },

      deleteSavedSet: (id: string) => {
        set((state) => ({
          savedSets: state.savedSets.filter((s) => s.id !== id),
        }));
      },

      toggleFavorite: (id: string) => {
        set((state) => ({
          savedSets: state.savedSets.map((s) =>
            s.id === id ? { ...s, isFavorite: !s.isFavorite } : s
          ),
        }));
      },

      toggleDarkMode: () => {
        set((state) => ({
          isDarkMode: !state.isDarkMode,
        }));
      },

      incrementDailyGenerations: () => {
        set((state) => {
          const today = getTodayDate();
          const isNewDay = state.lastGenerationDate !== today;

          return {
            dailyGenerations: isNewDay ? 1 : state.dailyGenerations + 1,
            lastGenerationDate: today,
          };
        });
      },

      resetDailyGenerationsIfNeeded: () => {
        set((state) => {
          const today = getTodayDate();
          if (state.lastGenerationDate !== today) {
            return {
              dailyGenerations: 0,
              lastGenerationDate: today,
            };
          }
          return state;
        });
      },

      canGenerate: () => {
        const state = get();
        state.resetDailyGenerationsIfNeeded();
        // Demo mode allows unlimited generations
        if (state.isDemo) {
          return true;
        }
        // Free tier limit: 5 generations per day
        return state.dailyGenerations < 5;
      },
    }),
    {
      name: "viraltags-store",
      storage: createStorage(),
      // Selective persistence - only persist what we need
      partialize: (state) => ({
        generationHistory: state.generationHistory,
        savedSets: state.savedSets,
        isDarkMode: state.isDarkMode,
        dailyGenerations: state.dailyGenerations,
        lastGenerationDate: state.lastGenerationDate,
      }),
    }
  )
);
