// Import Firebase modules (v10 modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, doc, addDoc, setDoc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCgiAUj5673_rqvbLRIvvk9dTb5pZBcbdw",
  authDomain: "effects-of-handset.firebaseapp.com",
  projectId: "effects-of-handset",
  storageBucket: "effects-of-handset.firebasestorage.app",
  messagingSenderId: "248166796655",
  appId: "1:248166796655:web:4159b576fa03d4262c6c9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Get form
const form = document.getElementById("researchForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get all input values
  const studentID = document.getElementById("studentID").value.trim();
  const level = document.getElementById("level").value;
  const department = document.getElementById("department").value;
  const genderInput = document.querySelector('input[name="gender"]:checked');
  const gender = genderInput ? genderInput.value.trim() : "Not specified";
  const phone = document.getElementById("phone").value;
  const q2 = document.getElementById("q2").value;
  const q3 = document.getElementById("q3").value;
  const q4 = document.getElementById("q4").value;
  const q5 = document.getElementById("q5").value;
  const q6 = document.getElementById("q6").value;
  const q7 = document.getElementById("q7").value;
  const q8 = document.getElementById("q8").value;
  const q9 = document.getElementById("q9").value;

 if (!studentID) {
  alert("Please enter your Student ID");
  return;
}

const idPattern = /^\d{4}\/[A-Za-z]{3}\/\d{3}$/;

if (!idPattern.test(studentID)) {
  alert("Student ID must follow format: 2022/CSC/001");
  return;
}

  try {
    // Check if Student ID already exists
    const existing = await getDoc(doc(db, "notes", studentID));

if (existing.exists()) {
  alert("This Student ID has already submitted.");
  return;
}

const safeID = studentID.replaceAll("/", "_");

await setDoc(doc(db, "notes", safeID), {
  studentID,   // keep original value inside document
  level,
  department,
  gender,
  phone,
  q2,
  q3,
  q4,
  q5,
  q6,
  q7,
  q8,
  q9,
  created: serverTimestamp()
});

    // Show success message
    successMsg.style.display = "block";
    form.reset();

    setTimeout(() => {
      successMsg.style.display = "none";
    }, 2500);

  } catch (err) {
    console.error("Error submitting form:", err);
    alert("Something went wrong. Check console for details.");
  }
});

// Clear button
function clearForm() {
  form.reset();

}






