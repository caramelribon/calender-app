import firebase from '@/firebase/firebase'
import type { User, Accout } from '@/values/User'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

class UserRepository {
  static async createUserWithEmailAndPassword(user: Accout) {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
      const userData = {
        userId: userCredential.user?.uid,
        name: user.name,
        email: user.email
      }
      const userRef = firebase.firestore().collection('users').doc(userCredential.user?.uid)
      await userRef.set(userData)
      return userData as User | undefined
    } catch (error) {
      console.error('Error adding document: ', error)
      throw error
    }
  }

  static async signInWithEmailAndPassword(user: Omit<Accout, 'name'>) {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
      const userDoc = await firebase
        .firestore()
        .collection('users')
        .doc(userCredential.user?.uid)
        .get()
      const userData = userDoc.data()
      return userData as User | undefined
    } catch (error) {
      console.error('Error adding document: ', error)
      throw error
    }
  }

  static async autoSignIn(): Promise<User | undefined> {
    return new Promise<User | undefined>(async (resolve) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(async (user: firebase.User | null) => {
        unsubscribe()
        if (!user) {
          resolve(undefined)
          return
        }
        const userDoc = await firebase.firestore().collection('users').doc(user.uid).get()
        const userData = userDoc.data() as User
        resolve(userData)
      })
    })
  }

  static async signOut() {
    try {
      await UserRepository.signOut()
    } catch (error) {
      console.error('Error adding document: ', error)
      throw error
    }
  }
}

export default UserRepository
