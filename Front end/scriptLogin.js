function salvaLogin(event) {
  event.preventDefault();

  let login = document.getElementById('username').value;
  let senha = document.getElementById('password').value;

  const user = {
      login: login,
      senha: senha
  };

  sendUserToServer(user);
}

function sendUserToServer(user) {
  fetch('https://3d0a0dbd-5920-479d-8584-860f1c54f141-00-18uljox9uihdu.riker.replit.dev/Cadastro', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Erro ao fazer login');
      }
      return response.json();
  })
  .then(data => {
      console.log('Sucesso:', data);
      alert('Login realizado com sucesso!');
      // Redirecionamento para a página principal após o login
      window.location.href = "indexmilena.html";
  })
  .catch(error => {
      console.error('Erro:', error);
      alert('Ocorreu um erro ao fazer login.');
  });
}

document.getElementById('login-form').addEventListener('submit', salvaLogin);