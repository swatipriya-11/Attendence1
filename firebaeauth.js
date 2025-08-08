import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAIOpiFY11TcYKqhjCHf10eKhtgWCGF438",
    authDomain: "attendence-tracker-8ce13.firebaseapp.com",
    projectId: "attendence-tracker-8ce13",
    storageBucket: "attendence-tracker-8ce13.firebasestorage.app",
    messagingSenderId: "220596396865",
    appId: "1:220596396865:web:54f878a64505a7ba21b7c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginBtn = document.getElementById("login");

loginBtn.addEventListener('click', function(event) {
    event.preventDefault();

    // Input fields
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !email || !password) {
        alert("Please fill all fields!");
        return;
    }

    // Try logging in first
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Login success
            localStorage.setItem("username", username);
            window.location.href = "profile.html";
        })
        .catch((error) => {
            if (error.code === "auth/user-not-found") {
                // If user not found → sign them up
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        localStorage.setItem("username", username);
                        window.location.href = "profile.html";
                    })
                    .catch((signupError) => {
                        alert(signupError.message);
                    });
            } else {
                alert(error.message);
            }
        });
});

