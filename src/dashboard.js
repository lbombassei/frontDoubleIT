const path = require('path');
const jwt = require('jsonwebtoken');

// const __filename = path.resolve(import.meta.url.replace(/^file:\/\/\//, ''));
// const __dirname = path.dirname(__filename);

function showWelcomeMessage(document, token) {
  const decodedToken = jwt.decode(token);
  const userName = decodedToken.name;

  const welcomeMessage = document.querySelector('.welcome-message');
  const profile = document.querySelector('#user-name');
  const tituloProdutos = document.querySelector('#titulo-produtos');

  welcomeMessage.innerText = `Seja bem-vindo, ${userName}!`;
  profile.innerText = `${userName}`;
  tituloProdutos.style.display = 'none';
}

const token = sessionStorage.getItem('token');
if (!token) {
  window.location.replace('/view/login.html');
} else {
  showWelcomeMessage(document, token);
}
