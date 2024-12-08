
 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
 import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 import { setLogLevel } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
 setLogLevel("debug");
 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyDjh1vEFk7FqW-wLaUE4pXowHf266_3W88",
   authDomain: "sia-2develo4.firebaseapp.com",
   projectId: "sia-2develo4",
   storageBucket: "sia-2develo4.firebasestorage.app",
   messagingSenderId: "853876043675",
   appId: "1:853876043675:web:58e9a688aeef18690f3b3e"
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


const signUp = document.getElementById("register");
signUp.addEventListener('click',(event)=>{
  event.preventDefault();
  const fullname = document.getElementById("signUp-fullname").value;
  const email = document.getElementById("signUp-email").value;
  const phoneNumber = document.getElementById("signUp-phoneNumber").value; // Corrected this line
  const password = document.getElementById("signUp-password").value;
  const confirmPassword = document.getElementById("signUp-confirm-password").value;

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
    showMessage("Account Created Successfully", "signUpMessage");

    const docRef = doc(db,"users", user.uid);
    setDoc(docRef, userData)
    .then(()=>{
      window.location.href = "/userpage.html";
    })
    .catch((error)=>{
      console.log("Error writing document");
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


