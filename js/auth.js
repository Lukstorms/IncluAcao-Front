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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Sign up function
function signUp() {
  const nome = document.getElementById('signup-nome').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const datanascimento = document.getElementById('signup-datanascimento').value;
  const telefone = document.getElementById('signup-telefone').value;
  const generonascimento = document.getElementById('signup-generonascimento').value;
  const generoident = document.getElementById('signup-generoident').value;
  const transgenero = document.getElementById('signup-transgenero').value === "verdadeiro";
  const expressaogenero = document.getElementById('signup-expressaogenero').value;
  const orientacaosexual = document.getElementById('signup-orientacaosexual').value;
  const etnia = document.getElementById('signup-etnia').value;
  const pcd = document.getElementById('signup-pcd').value === "verdadeiro";
  const qualpcd = document.getElementById('signup-qualpcd').value;
  const cronico = document.getElementById('signup-cronico').value === "verdadeiro";
  const qualcronico = document.getElementById('signup-qualcronico').value;
  const religiao = document.getElementById('signup-religiao').value;
  const seconomica = document.getElementById('signup-seconomica').value;
  const rendafmensal = parseFloat(document.getElementById('signup-rendafmensal').value);
  const escolaridade = document.getElementById('signup-escolaridade').value;
  const idiomasfala = document.getElementById('signup-idiomasfala').value.split(',');
  const identicultura = document.getElementById('signup-identicultura').value;
  const nacionalidade = document.getElementById('signup-nacionalidade').value;
  const regiao = document.getElementById('signup-regiao').value;
  const necessidadeesp = document.getElementById('signup-necessidadeesp').value === "verdadeiro";
  const qualnecessidadeesp = document.getElementById('signup-qualnecessidadeesp').value;
  const outros = document.getElementById('signup-outros').value;
  const consent = document.getElementById('signup-consent').value === "verdadeiro";

  const userData = {
    uid: '',
    nome,
    email,
    datanascimento,
    telefone,
    generonascimento,
    generoident,
    transgenero,
    expressaogenero,
    orientacaosexual,
    etnia,
    pcd,
    qualpcd,
    cronico,
    qualcronico,
    religiao,
    seconomica,
    rendafmensal,
    escolaridade,
    idiomasfala,
    identicultura,
    nacionalidade,
    regiao,
    necessidadeesp,
    qualnecessidadeesp,
    outros,
    consent
  };

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      userData.uid = user.uid;  // Add uid to userData

      // Send additional user data to server
      fetch('https://inclu-acao-back.vercel.app/storeUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => { throw new Error(data.message || 'Server error'); });
        }
        return response.json();
      })
      .then(data => {
        alert('User registered successfully');
        window.location.href = 'dashboard.html';
      })
      .catch(error => {
        console.error('Error in response:', error);
        alert('Error: ' + error.message);
      });
    })
    .catch((error) => {
      console.error('Error creating user:', error);
      alert('Error: ' + error.message);
    });
}

// Login function
function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert('Login successful');
      window.location.href = 'dashboard.html';
    })
    .catch((error) => {
      alert('Error: ' + error.message);
    });
}

// Logout function
function logout() {
  auth.signOut().then(() => {
    alert('Logout successful');
    window.location.href = 'index.html';
  }).catch((error) => {
    alert('Error: ' + error.message);
  });
}

// Function to create article elements
function createArticleElement(article) {
  const articleElement = document.createElement('div');
  articleElement.className = 'article';

  const articleImage = document.createElement('img');
  articleImage.src = article.image;
  articleImage.alt = article.title;
  articleImage.onerror = function() {
    this.src = 'placeholderpride.png'; // Replace with the path to your default image
  };

  const articleContent = document.createElement('div');
  articleContent.className = 'article-content';

  const articleTitle = document.createElement('h3');
  articleTitle.textContent = article.title;

  const articleSnippet = document.createElement('p');
  articleSnippet.textContent = article.snippet;

  const articleLink = document.createElement('a');
  articleLink.href = article.url;
  articleLink.target = '_blank';
  articleLink.textContent = 'Read more';

  articleContent.appendChild(articleTitle);
  articleContent.appendChild(articleSnippet);
  articleContent.appendChild(articleLink);
  articleElement.appendChild(articleImage);
  articleElement.appendChild(articleContent);

  return articleElement;
}

// Function to display articles
function displayArticles() {
  const articlesContainer = document.getElementById('articles');
  if (!articlesContainer) {
    console.error('Element with ID "articles" not found.');
    return;
  }
  articles.forEach(article => {
    const articleElement = createArticleElement(article);
    articlesContainer.appendChild(articleElement);
  });
}

// Initialize display of articles
displayArticles();

// Submit quiz function
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

// Make functions available globally
window.signUp = signUp;
window.login = login;
window.logout = logout;
