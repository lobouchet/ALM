import { initializeApp, getApps } from 'firebase/app';
import { getPerformance } from 'firebase/performance';

const firebaseConfig = {
  apiKey: "AIzaSyC4qA5VI465J3-cPr5h0EoDguuw9DJMj58",
  authDomain: "to-scooby-do-b1b9c.firebaseapp.com",
  projectId: "to-scooby-do-b1b9c",
  storageBucket: "to-scooby-do-b1b9c.firebasestorage.app",
  messagingSenderId: "701517050880",
  appId: "1:701517050880:web:50d36404e82ccf20c654e5"
};

// Initialize Firebase
let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

// Initialize Performance Monitoring
let perf;
if (typeof window !== 'undefined') {
  perf = getPerformance(firebaseApp);
}

export { firebaseApp, perf }; 