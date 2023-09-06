import { create } from 'zustand'

interface AuthState {
  isLogged: boolean
  login: (body: { email: string, password: string }) => Promise<void>
  verifySession: (body: { sessionId: string, userId: string }) => Promise<void>
}

const useAuthStore = create<AuthState>()((set) => ({
  isLogged: false,
  login: async (body) => {
    const res = await fetch('')
  },
  verifySession: async (body) => {
    const res = await fetch('')
    set({ isLogged: true })
  }
}))

export default useAuthStore
