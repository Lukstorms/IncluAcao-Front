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

function toggleForm() {
  document.getElementById('login-form').classList.toggle('hidden');
  document.getElementById('signup-form').classList.toggle('hidden');
}

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

function signUp() {
  const nome = document.getElementById('signup-nome').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const datanascimento = document.getElementById('signup-datanascimento').value;
  const telefone = document.getElementById('signup-telefone').value;
  const generonascimento = document.getElementById('signup-generonascimento').value;
  const generoident = document.getElementById('signup-generoident').value;
  const transgenero = document.getElementById('signup-transgenero').value.toLowerCase() === "verdadeiro";
  const expressaogenero = document.getElementById('signup-expressaogenero').value;
  const orientacaosexual = document.getElementById('signup-orientacaosexual').value;
  const etnia = document.getElementById('signup-etnia').value;
  const pcd = document.getElementById('signup-pcd').value.toLowerCase() === "verdadeiro";
  const qualpcd = document.getElementById('signup-qualpcd').value;
  const cronico = document.getElementById('signup-cronico').value.toLowerCase() === "verdadeiro";
  const qualcronico = document.getElementById('signup-qualcronico').value;
  const religiao = document.getElementById('signup-religiao').value;
  const seconomica = document.getElementById('signup-seconomica').value;
  const rendafmensal = parseFloat(document.getElementById('signup-rendafmensal').value);
  const escolaridade = document.getElementById('signup-escolaridade').value;
  const idiomasfala = document.getElementById('signup-idiomasfala').value.split(',');
  const identicultura = document.getElementById('signup-identicultura').value;
  const nacionalidade = document.getElementById('signup-nacionalidade').value;
  const regiao = document.getElementById('signup-regiao').value;
  const necessidadeesp = document.getElementById('signup-necessidadeesp').value.toLowerCase() === "verdadeiro";
  const qualnecessidadeesp = document.getElementById('signup-qualnecessidadeesp').value;
  const outros = document.getElementById('signup-outros').value;
  const consent = document.getElementById('signup-consent').value.toLowerCase() === "verdadeiro";

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

  console.log('Sending user data:', userData);

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

