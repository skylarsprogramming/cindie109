import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyArzqnuBVsKMze69vUxjjN_gpj3MMWUGYw",
  authDomain: "skylarscourse.com",
  projectId: "cindie-1a36c",
  storageBucket: "cindie-1a36c.appspot.com",
  messagingSenderId: "733443242930",
  appId: "1:733443242930:web:56bfa8d9aa95125a6542ab"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
