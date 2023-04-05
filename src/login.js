const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const userIdInput = document.getElementById("userId");

const togglePassword = document.querySelector('#toggle-password');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function() {
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  this.classList.toggle('fa-eye-slash');
  this.classList.toggle('fa-eye');
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;
  const userId = 1;

  fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      senha: password,
      userId: userId
    })
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if (data.token) {
      sessionStorage.setItem('token', data.token);
      window.location.href = '/';
    } else {
      alert('Email ou senha incorretos');
    }
  })
  .catch((error) => {
    console.error('Erro ao fazer login', error);
  });
});
