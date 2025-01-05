
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

function showMessage(message, elementId) {
  var message = document.getElementById(elementId);
  message.style.display='block'; 
  message.innerHTML = message;
  message.style.opacity = 1;
  setTimeout(function(){
    message.style.opacity = 0;
  },5000);
  
}

const signUp = document.getElementById("signup-form");
signUp.addEventListener('click',(event)=>{
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

  if (!validate_phoneNumber(phoneNumber)) {
    alert("Invalid phone number. Ensure it is numeric and the correct length.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential)=>{
    const user = userCredential.user;
    const userData = {
      email: email,
      fullname: fullname,
      phoneNumber: phoneNumber,
      last_login: Date.now(),
      role: "user",
    };

    const docRef = doc(db,"users", user.uid);
    setDoc(docRef, userData)
    .then(()=>{
      alert("Account Created Successfully");
      window.location.href = "SIA2-Firebase/userpage.html";
    })
    .catch((error)=>{
      console.log("Error writing document",error);
    });


  })
  .catch((error)=>{
    const errorCode = error.code;
    if(errorCode == "auth/email-already-in-use"){
      showMessage("Email Address Already Exists", 'signUpMessage');
    }else{
      showMessage("Unable to create user", "signUpMessage");
    }
  })
  

})

const signIn = document.getElementById("login");
signIn.addEventListener('click',(event)=>{
  event.preventDefault();
  const email=document.getElementById("signIn-email").value;
  const password=document.getElementById("signIn-email").value;
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      showMessage('login is successful','signInMessage');
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
    })

})


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

// Validate phone number
function validate_phoneNumber(phoneNumber) {
  const phoneRegex = /^[0-9]{10,15}$/; // Allows 10 to 15 digits
  return phoneRegex.test(phoneNumber);
}


