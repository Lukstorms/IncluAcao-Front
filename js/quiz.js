import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfSd3zbl4iOT_Dw3RA0nk4HVo1SrUcCsc",
  authDomain: "incluacao-fb776.firebaseapp.com",
  projectId: "incluacao-fb776",
  storageBucket: "incluacao-fb776.appspot.com",
  messagingSenderId: "198502388108",
  appId: "1:198502388108:web:bd387b9504810af7d586a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.logout = function() {
  signOut(auth).then(() => {
    alert('Logout successful');
    window.location.href = 'index.html';
  }).catch((error) => {
    alert('Error: ' + error.message);
  });
}

window.submitQuiz = function() {
  const quizForm = document.getElementById('quiz-form');
  const formData = new FormData(quizForm);
  const answers = {
    q1: 'B',
    q2: 'C',
    q3: 'B',
    q4: 'A',
    q5: 'A',
    // Add answers for other questions
  };
  
  let score = 0;
  for (const [question, correctAnswer] of Object.entries(answers)) {
    if (formData.get(question) === correctAnswer) {
      score++;
    }
  }

  const resultDiv = document.getElementById('quiz-result');
  resultDiv.innerHTML = `Your score is ${score} out of ${Object.keys(answers).length}`;
}
