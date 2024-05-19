window.submitQuiz = async function() {
  const quizForm = document.getElementById('quiz-form');
  const formData = new FormData(quizForm);
  const answers = {
    q1: 'B',
    q2: 'C',
    q3: 'B',
    q4: 'A',
    q5: 'A',
    q6: 'B',
    q7: 'B',
    q8: 'A',
    q9: 'B',
    q10: 'B',
    q11: 'D',
    q12: 'C',
    q13: 'C',
    q14: 'B',
    q15: 'A',
  };
  
  let score = 0;
  const totalQuestions = Object.keys(answers).length;
  for (const [question, correctAnswer] of Object.entries(answers)) {
    if (formData.get(question) === correctAnswer) {
      score++;
    }
  }

  const resultDiv = document.getElementById('quiz-result');
  const scorePercentage = score / totalQuestions;
  resultDiv.innerHTML = `Você acertou ${score} questões de ${totalQuestions}`;

  const user = auth.currentUser;
  if (user) {
    try {
      const response = await fetch('https://inclu-acao-back.vercel.app/updateQuizStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: user.uid,
          score: scorePercentage
        })
      });

      const result = await response.json();
      console.log('Quiz status update result:', result);
    } catch (error) {
      console.error('Error updating quiz status:', error);
    }
  }
}
