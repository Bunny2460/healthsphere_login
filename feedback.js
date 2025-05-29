// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Config (Replace with your credentials)
const firebaseConfig = {
  apiKey: "YAIzaSyARed2AFNECE8c9eaGdCK2UPV0o7IM9qcY",
  authDomain: "done-001.firebaseapp.com",
  projectId: "done-001",
  storageBucket: "done-001.firebasestorage.app",
  messagingSenderId: "182309859819",
  appId: "1:182309859819:web:cc5d5b8d04ef30718b69ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Feedback Form Submission
document.getElementById("feedbackForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    // Save feedback to Firestore
    await addDoc(collection(db, "feedback"), {
      email: email,
      message: message,
      timestamp: new Date()
    });

    // Send email to admin using Firebase Function
    await fetch("https://YOUR_CLOUD_FUNCTION_URL/sendFeedbackEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, message })
    });

    alert("Feedback sent successfully!");
    document.getElementById("feedbackForm").reset();
  } catch (error) {
    console.error("Error submitting feedback:", error);
    alert("Something went wrong. Please try again.");
  }
});
