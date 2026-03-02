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

  if (!studentID) {
    alert("Please enter your Student ID");
    return;
  }

  try {
    // Check if Student ID already exists
    const checkDoc = await getDoc(doc(db, "studentIDs", studentID));
    if (checkDoc.exists()) {
      alert("This Student ID has already submitted.");
      return;
    }

    // Add note to 'notes' collection
    await addDoc(collection(db, "notes"), {
      studentID,
      level,
      department,
      gender: gender,
      phone,
      q2,
      q3,
      q4,
      q5,
      created: serverTimestamp()
    });

    // Mark StudentID as used
    await setDoc(doc(db, "studentIDs", studentID), { used: true });

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

