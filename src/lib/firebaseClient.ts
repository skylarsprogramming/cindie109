import { getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - importing JS config
import { firebaseConfig } from '../../firebase-config.js'

export function getFirebase() {
  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
  const auth = getAuth(app)
  return { app, auth }
}


