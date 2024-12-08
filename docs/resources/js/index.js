// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
// import { getAuth, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
// import { getDatabase } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"; // Import Firebase Realtime Database (if needed)

const firebaseConfig = {
  apiKey: "AIzaSyDTFxn7j6qomVA59Mu-pK3I--gcr7gvRy0",
  authDomain: "sia2-firebase.firebaseapp.com",
  projectId: "sia2-firebase",
  storageBucket: "sia2-firebase.firebasestorage.app",
  messagingSenderId: "711179837759",
  appId: "1:711179837759:web:bfde1b1b8b44df663ff38a",
  measurementId: "G-1SCQNEMYYY"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

function register() {
  fullname = document.getElementById("fullname").value;
  email = document.getElementById("email").value;
  phoneNumber = document.getElementById("phoneNumber").value; // Corrected this line
  password = document.getElementById("password").value;
  confirmPassword = document.getElementById("confirm-password").value;

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

  // Register user
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      var user = auth.currentUser;
      var database_ref = database.ref();

      var user_data = {
        email: email,
        fullname: fullname,
        phoneNumber: phoneNumber,
        last_login: Date.now(),
      };
      database_ref.child("users/" + user.uid).set(user_data);

      alert("User created successfully.");
    })
    .catch(function (error) {
      console.error("Error during registration:", error.message);
    });
}

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













// // Initialize Firebase

// const auth = getAuth(app); 
// auth.languageCode = 'en'; 
// const provider = new GoogleAuthProvider();

// // Initialize Realtime Database (if needed)
// const database = getDatabase(app); // Use only if you need Firebase Database

// // Google Sign-In Button Logic
// const googleLogin = document.getElementById("google-login-btn");
// googleLogin.addEventListener("click", function () {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       // User signed in successfully
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const user = result.user;
//       console.log("User signed in:", user);
      
//       // Redirect user to another page
//       window.location.href = "/userpage.html";

//     })
//     .catch((error) => {
//       // Handle Errors
//       console.error("Error during sign-in:", error.message);
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       const email = error.customData.email;
//       const credential = GoogleAuthProvider.credentialFromError(error);
//     });
// });





  // function register(){
  //   fullname = document.getElementById("fullname").value;
  //   email = document.getElementById("email").value;
  //   password = document.getElementById("password").value;
  //   confirmPassword = document.getElementById("confirm-password").value;

  //   if(validate_email(email)==false || validate_password(password, confirmPassword) ==false){
  //     alert("Either Email or Password is incorrect");
  //     return
  //   }

  //   if(validate_field(fullname)==false){
  //     alert("Name is empty");
  //     return
  //   }

  //   auth.createUserWithEmailAndPassword(email,password){
  //     .then(function(){
  //       var user = auth.currentUser;
  //       var database_ref = database.ref();

  //       var user_data = {
  //         email: email,
  //         fullname: fullname,
  //         last_login: Date.now(),
  //       }

  //       database_ref.child('users/'+user.uid).set(user_data);

  //       alert("User created successfully");

  //     })
  // }

  // function validate_email(email){
  //   expression = /^[^@]+@\w+(\.\w+)+\w$/
  //   if(expression.test(email)==true){
  //     return true
  //   }else{
  //     return false
  //   }
  // }

  // function validate_password(password, confirmPassword) {
  //   const minLength = 8; // Minimum length of the password
  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  
  //   // Check if password and confirm password match
  //   if (password !== confirmPassword) {
  //     return "Passwords do not match.";
  //   }
  
  //   // Check if password meets the minimum length requirement
  //   if (password.length < minLength) {
  //     return `Password must be at least ${minLength} characters long.`;
  //   }
  
  //   // Check if password meets complexity requirements
  //   if (!passwordRegex.test(password)) {
  //     return "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.";
  //   }
  
  //   return "Password is valid.";
  // }

  // function validate_field(field){
  //   if(field == null){
  //     return false;
  //   }
  //   if(field.length <= 0){
  //     return false;
  //   }else{
  //     return true;
  //   }
  // }