import { defineStore } from 'pinia'
import UserRepository from '@/repository/user'
import type { User, Accout } from '@/values/User'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: undefined as User | undefined
  }),
  getters: {
    userData(state) {
      return state.user
    }
  },

  actions: {
    async signUp(user: Accout) {
      const userData = await UserRepository.createUserWithEmailAndPassword(user)
      this.user = userData
    },
    async signIn(user: Omit<Accout, 'name'>) {
      const userData = await UserRepository.signInWithEmailAndPassword(user)
      this.user = userData
    },
    async autoSignIn() {
      const userData = await UserRepository.autoSignIn()
      this.user = userData
      return userData
    },
    async logOut() {
      await UserRepository.signOut()
    },
    async getUser() {}
  }
})
