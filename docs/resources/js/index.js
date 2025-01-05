
 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
 import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 import { setLogLevel } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
 setLogLevel("debug");
 // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyAWIY7DKq9l7OeSdRldZUg2Br9nZyhkVDo",
  authDomain: "sia2-firebase-a8b02.firebaseapp.com",
  projectId: "sia2-firebase-a8b02",
  storageBucket: "sia2-firebase-a8b02.firebasestorage.app",
  messagingSenderId: "116171721073",
  appId: "1:116171721073:web:3397202fdea7788cc24ed0"
};


 // Initialize Firebase
const app = initializeApp(firebaseConfig);

// function showMessage(message, elementId) {
//   var message = document.getElementById(elementId);
//   message.style.display='block'; 
//   message.innerHTML = message;
//   message.style.opacity = 1;
//   setTimeout(function(){
//     message.style.opacity = 0;
//   },5000);
  
// }

//HANDLE REGISTER
const signUpForm = document.getElementById("signup-form");
signUpForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const fullname = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("signup-confirm-password").value;

  const auth = getAuth();
  const db = getFirestore();

  // Validate inputs
  if (!validate_email(email)) {
    alert("Invalid email format.");
    return;
  }

  const passwordValidationResult = validate_password(password, confirmPassword);
  if (passwordValidationResult !== "Password is valid.") {
    alert(passwordValidationResult);
    return;
  }

  if (!validate_field(fullname)) {
    alert("Name is empty.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        fullname: fullname,
        last_login: Date.now(),
        role: "user",
      };

      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          alert("Account Created Successfully");
          window.location.href = "/SIA2-Firebase/userpage.html";
        })
        .catch((error) => {
          console.log("Error writing document", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode == "auth/email-already-in-use") {
        alert("Email Address Already Exists", 'signUpMessage');
      } else {
        alert("Unable to create user", "signUpMessage");
      }
    });
});

//HANDLE LOGIN
const signInForm = document.getElementById("login-form");
signInForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const auth = getAuth();

  console.log("Attempting login with email:", email);  // Log the email for debugging

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      alert('Login is successful');  // Display success message
      window.location.href = "/SIA2-Firebase/userpage.html";  // Ensure this path is correct
    })
    .catch((error) => {
      console.error('Login failed', error.code, error.message);  // Enhanced error logging
      alert('Login failed. Please check your credentials.');  // Show a failure message
    });
});



function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

function validate_password(password, confirmPassword) {
  const minLength = 8;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long.`;
  }

  if (!passwordRegex.test(password)) {
    return "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.";
  }

  return "Password is valid.";
}

function validate_field(field) {
  return field != null && field.length > 0;
}

// // Validate phone number
// function validate_phoneNumber(phoneNumber) {
//   const phoneRegex = /^[0-9]{10,15}$/; // Allows 10 to 15 digits
//   return phoneRegex.test(phoneNumber);
// }


