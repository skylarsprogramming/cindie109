import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

// Firebase config from your project
const firebaseConfig = {
  apiKey: "AIzaSyANaRqK0EPtstfd_4p3mwXhYSuswfRrDaA",
  authDomain: "cindie-ai.firebaseapp.com",
  projectId: "cindie-ai",
  storageBucket: "cindie-ai.appspot.com",
  messagingSenderId: "746851099847",
  appId: "1:746851099847:web:2a1f662b3381cc3cd8cae2",
  measurementId: "G-4QFTVE18KV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
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
