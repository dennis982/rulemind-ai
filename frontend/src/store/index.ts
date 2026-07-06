import create from 'zustand'

interface AppState {
  userId: string | null
  isAuthenticated: boolean
  setUserId: (id: string) => void
  logout: () => void
}

export const useAppStore = create<AppState>((set) => ({
  userId: null,
  isAuthenticated: false,
  setUserId: (id: string) => set({ userId: id, isAuthenticated: true }),
  logout: () => set({ userId: null, isAuthenticated: false }),
}))
