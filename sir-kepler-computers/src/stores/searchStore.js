import { create } from 'zustand';

export const useSearchStore = create((set) => ({
    searchTerm: "",
    searchHistory: [],

    setSearchTerm: (term) => set({ searchTerm: term }),

    addSearchHistory: (term) =>
        set((state) => ({
            searchHistory: state.searchHistory.includes(term)
            ? state.searchHistory
            : [...state.searchHistory, term]
        })),
    clearSearchHistory: () => set({ searchHistory: [] })
}))