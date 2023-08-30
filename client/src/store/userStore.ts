import { User } from '@/interfaces/user'
import { create } from 'zustand'

interface UserState {
  user: User | null
  users: User[]
  getUser: (userId: string) => Promise<void>
  getUsers: () => Promise<void>
  createUser: (userData: User) => Promise<void>
}

const useUserStore = create<UserState>()((set) => ({
  user: null,
  users: [],
  getUser: async (userId) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos') // test API
    const user = await res.json()
  },
  getUsers: async () => {
    const res = await fetch('')
    const users = await res.json()
  },
  createUser: async (userData) => {
    const res = await fetch('')
  }
}))

export default useUserStore
