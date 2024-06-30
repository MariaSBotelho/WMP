async function getEndereco(cep) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    if (data.erro) {
      throw new Error("CEP inválido");
    }
    console.log(data);

    const secao4 = document.getElementById('secao4');
    secao4.innerHTML = '';

    const enderecoDiv = document.createElement('div');
    enderecoDiv.innerHTML = `
      <p><strong>Logradouro:</strong> ${data.logradouro}</p>
      <p><strong>Bairro:</strong> ${data.bairro}</p>
      <p><strong>Cidade:</strong> ${data.localidade}</p>
      <p><strong>Estado:</strong> ${data.uf}</p>
    `;
    secao4.appendChild(enderecoDiv);
  } catch (error) {
    console.error('Erro ao buscar endereço:', error);
  }
}

document.getElementById('btn_buscar').addEventListener('click', () => {
  const cep = document.getElementById('txt_cep').value;
  getEndereco(cep);
});

function salvaLogin(event) {
  event.preventDefault();

  let nome = document.getElementById('txt_nome').value;
  let login = document.getElementById('txt_login').value;
  let email = document.getElementById('txt_email').value;
  let senha = document.getElementById('txt_senha').value;
  let senha2 = document.getElementById('txt_senha2').value;

  if (senha !== senha2) {
    alert('As senhas informadas não conferem.');
    return;
  }

  const user = {
    nome: nome,
    login: login,
    email: email,
    senha: senha,
    senha2: senha2  
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
      throw new Error('Erro ao salvar usuário');
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);
    alert('Usuário salvo com sucesso!');
    // Redirecionamento para a página de login após o cadastro
    window.location.href = "https://0c98cb05-e197-40f9-81a6-d5875510a5fb-00-13gfcfctsdbik.worf.replit.dev/";
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('Ocorreu um erro ao salvar o usuário.');
  });
}

document.getElementById('login-form').addEventListener('submit', salvaLogin);