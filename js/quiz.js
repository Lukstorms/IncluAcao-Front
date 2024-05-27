// quiz.js
import { auth } from './firebaseConfig.js';

async function submitQuiz() {
  const quizForm = document.getElementById('quiz-form');
  const formData = new FormData(quizForm);
  const answers = { q1: 'B', q2: 'C', q3: 'B', q4: 'A', q5: 'A', q6: 'B', q7: 'B', q8: 'A', q9: 'B', q10: 'B', q11: 'D', q12: 'C', q13: 'C', q14: 'B', q15: 'A' };

  let score = 0;
  const totalQuestions = Object.keys(answers).length;
  for (const [question, correctAnswer] of Object.entries(answers)) {
    if (formData.get(question) === correctAnswer) {
      score++;
    }
  }

  const resultDiv = document.getElementById('quiz-result');
  resultDiv.innerHTML = `Você acertou ${score} questões de ${totalQuestions}`;

  const user = auth.currentUser;
  if (user) {
    try {
      await fetch('https://inclu-acao-back.vercel.app/updateQuizStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uid: user.uid, score: score / totalQuestions })
      });
    } catch (error) {
      console.error('Error updating quiz status:', error);
    }
  }
}

window.submitQuiz = submitQuiz;
