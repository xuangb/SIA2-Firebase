import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"; // Import Firebase Realtime Database if needed

const firebaseConfig = {
  apiKey: "AIzaSyDTFxn7j6qomVA59Mu-pK3I--gcr7gvRy0",
  authDomain: "sia2-firebase.firebaseapp.com",
  projectId: "sia2-firebase",
  storageBucket: "sia2-firebase.firebasestorage.app",
  messagingSenderId: "711179837759",
  appId: "1:711179837759:web:bfde1b1b8b44df663ff38a",
  measurementId: "G-1SCQNEMYYY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();
const database = getDatabase(app); // Optional if using Realtime Database

// Function to update the full name in the DOM
function updateName(user) {
  if (user) {
    const fullname = user.displayName || "Anonymous";
    const fullnameInput = document.getElementById("fullname");
    if (fullnameInput) {
      fullnameInput.value = fullname;
    } else {
      console.error('Element with ID "fullname" not found.');
    }
  } else {
    console.log("No user is signed in.");
  }
}

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User signed in:", user);
    updateName(user); // Update the DOM with the user's name
  } else {
    console.log("No user signed in.");
  }
});
