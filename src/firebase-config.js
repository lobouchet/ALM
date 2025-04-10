import { initializeApp } from "firebase/app";
import { getPerformance } from "firebase/performance";

const firebaseConfig = {
  apiKey: "AIzaSyC4qA5VI465J3-cPr5h0EoDguuw9DJMj58",
  authDomain: "to-scooby-do-b1b9c.firebaseapp.com",
  projectId: "to-scooby-do-b1b9c",
  storageBucket: "to-scooby-do-b1b9c.firebasestorage.app",
  messagingSenderId: "701517050880",
  appId: "1:701517050880:web:50d36404e82ccf20c654e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Performance Monitoring
const perf = getPerformance(app);

export { perf }; 