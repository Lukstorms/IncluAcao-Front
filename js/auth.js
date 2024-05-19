import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

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

window.toggleForm = function() {
  document.getElementById('login-form').classList.toggle('hidden');
  document.getElementById('signup-form').classList.toggle('hidden');
}

window.login = function() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert('Login successful');
      window.location.href = 'dashboard.html';
    })
    .catch((error) => {
      alert('Error: ' + error.message);
    });
}

window.signUp = function() {
  const nome = document.getElementById('signup-nome').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const datanascimento = document.getElementById('signup-datanascimento').value;
  const telefone = document.getElementById('signup-telefone').value;
  const generonascimento = document.getElementById('signup-generonascimento').value;
  const generoident = document.getElementById('signup-generoident').value;
  const transgenero = document.getElementById('signup-transgenero').value === "true";
  const expressaogenero = document.getElementById('signup-expressaogenero').value;
  const orientacaosexual = document.getElementById('signup-orientacaosexual').value;
  const etnia = document.getElementById('signup-etnia').value;
  const pcd = document.getElementById('signup-pcd').value === "true";
  const qualpcd = document.getElementById('signup-qualpcd').value;
  const cronico = document.getElementById('signup-cronico').value === "true";
  const religiao = document.getElementById('signup-religiao').value;
  const seconomica = document.getElementById('signup-seconomica').value;
  const rendafmensal = parseFloat(document.getElementById('signup-rendafmensal').value);
  const escolaridade = document.getElementById('signup-escolaridade').value;
  const idiomasfala = document.getElementById('signup-idiomasfala').value.split(',');
  const identicultura = document.getElementById('signup-identicultura').value;
  const nacionalidade = document.getElementById('signup-nacionalidade').value;
  const regiao = document.getElementById('signup-regiao').value;
  const necessidadeesp = document.getElementById('signup-necessidadeesp').value === "true";
  const outros = document.getElementById('signup-outros').value;
  const consent = document.getElementById('signup-consent').value === "true";

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Send additional user data to server
      fetch('http://localhost:5000/registrarUsuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome,
          email,
          senha: password,
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
          religiao,
          seconomica,
          rendafmensal,
          escolaridade,
          idiomasfala,
          identicultura,
          nacionalidade,
          regiao,
          necessidadeesp,
          outros,
          consent
        })
      })
      .then(response => response.json())
      .then(data => {
        alert('User registered successfully');
        window.location.href = 'dashboard.html';
      })
      .catch(error => {
        alert('Error: ' + error.message);
      });
    })
    .catch((error) => {
      alert('Error: ' + error.message);
    });
}
