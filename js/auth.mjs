// auth.js
import { auth } from './firebaseConfig.mjs';

async function signUp() {
  const userData = {
    nome: document.getElementById('signup-nome').value,
    email: document.getElementById('signup-email').value,
    password: document.getElementById('signup-password').value,
    datanascimento: document.getElementById('signup-datanascimento').value,
    telefone: document.getElementById('signup-telefone').value,
    generonascimento: document.getElementById('signup-generonascimento').value,
    generoident: document.getElementById('signup-generoident').value,
    transgenero: document.getElementById('signup-transgenero').value === "verdadeiro",
    expressaogenero: document.getElementById('signup-expressaogenero').value,
    orientacaosexual: document.getElementById('signup-orientacaosexual').value,
    etnia: document.getElementById('signup-etnia').value,
    pcd: document.getElementById('signup-pcd').value === "verdadeiro",
    qualpcd: document.getElementById('signup-qualpcd').value,
    cronico: document.getElementById('signup-cronico').value === "verdadeiro",
    qualcronico: document.getElementById('signup-qualcronico').value,
    religiao: document.getElementById('signup-religiao').value,
    seconomica: document.getElementById('signup-seconomica').value,
    rendafmensal: parseFloat(document.getElementById('signup-rendafmensal').value),
    escolaridade: document.getElementById('signup-escolaridade').value,
    idiomasfala: document.getElementById('signup-idiomasfala').value.split(','),
    identicultura: document.getElementById('signup-identicultura').value,
    nacionalidade: document.getElementById('signup-nacionalidade').value,
    regiao: document.getElementById('signup-regiao').value,
    necessidadeesp: document.getElementById('signup-necessidadeesp').value === "verdadeiro",
    qualnecessidadeesp: document.getElementById('signup-qualnecessidadeesp').value,
    outros: document.getElementById('signup-outros').value,
    consent: document.getElementById('signup-consent').value === "verdadeiro"
  };

  if (!userData.email.endsWith('@pessoaepessoa.com.br')) {
    alert('Email inválido. Por favor se cadastre com um email do domínio @pessoaepessoa.com.br');
    return;
  }

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(userData.email, userData.password);
    const user = userCredential.user;
    userData.uid = user.uid;

    await fetch('https://inclu-acao-back.vercel.app/storeUserData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    alert('User registered successfully');
    window.location.href = 'dashboard.html';
  } catch (error) {
    console.error('Error creating user:', error);
    alert('Error: ' + error.message);
  }
}

async function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    await auth.signInWithEmailAndPassword(email, password);
    alert('Login successful');
    window.location.href = 'dashboard.html';
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

async function logout() {
  try {
    await auth.signOut();
    alert('Logout successful');
    window.location.href = 'index.html';
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

window.signUp = signUp;
window.login = login;
window.logout = logout;
