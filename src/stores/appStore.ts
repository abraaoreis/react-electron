import { create } from 'zustand'

interface AppState {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  isAuthenticated: boolean
  userEmail: string | null
  login: (email: string) => void
  logout: () => void
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  theme: 'light',
  setTheme: (theme) => set({ theme }),

  isAuthenticated: false,
  userEmail: null,
  login: (email: string) =>
    set({ isAuthenticated: true, userEmail: email }),
  logout: () => set({ isAuthenticated: false, userEmail: null }),
}))

export default useAppStore
