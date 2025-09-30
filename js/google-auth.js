import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase (singleton)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
auth.languageCode = 'mn';
const provider = new GoogleAuthProvider();

// Google login functionality
function setupGoogleAuth() {
  const googleLoginBtn = document.getElementById('google-login');
  const googleSignupBtn = document.getElementById('google-signup');
  
  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google auth success:', result);
      
      // Store the ID token for server calls
      const idToken = await result.user.getIdToken();
      localStorage.setItem('firebase_id_token', idToken);
      
      // Upsert Firestore user profile
      try {
        const userRef = doc(db, 'users', result.user.uid);
        const existing = await getDoc(userRef);
        if (!existing.exists()) {
          await setDoc(userRef, {
            uid: result.user.uid,
            email: result.user.email,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            profile: {
              displayName: result.user.displayName || null,
              photoURL: result.user.photoURL || null,
            },
            providers: result.user.providerData.map(p => p.providerId),
            roles: ['user'],
          });
        } else {
          await setDoc(userRef, { updatedAt: serverTimestamp() }, { merge: true });
        }
      } catch (e) {
        console.warn('Failed to upsert user profile in Firestore:', e);
      }
      
      // Redirect to dashboard or handle success
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Google auth error:', error);
      alert('Google sign-in failed: ' + error.message);
    }
  };
  
  if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', handleGoogleAuth);
  }
  
  if (googleSignupBtn) {
    googleSignupBtn.addEventListener('click', handleGoogleAuth);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupGoogleAuth);
} else {
  setupGoogleAuth();
}

export { auth, provider };
