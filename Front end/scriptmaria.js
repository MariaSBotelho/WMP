document.addEventListener("DOMContentLoaded", function() {
  const jsonData = {
      "title": "Página Preenchimento de dados",
      "header": {
          "title": "We Make Program",
          "menuLinks": [
              {"text": "Menu", "href": ""},
              {"text": "Login", "href": ""},
              {"text": "Cadastro", "href": ""}
          ]
      },
      "main": {
          "title": "Preencha os resultados do seu exame:",
          "exams": [
              {"name": "Hemograma", "placeholder": "Digite aqui o resultado"},
              {"name": "Glicose", "placeholder": "Digite aqui o resultado"},
              {"name": "Hemoglobina", "placeholder": "Digite aqui o resultado"},
              {"name": "Colesterol total", "placeholder": "Digite aqui o resultado"},
              {"name": "HDL", "placeholder": "Digite aqui o resultado"},
              {"name": "LDL", "placeholder": "Digite aqui o resultado"},
              {"name": "Triglicérides", "placeholder": "Digite aqui o resultado"},
              {"name": "Creatina", "placeholder": "Digite aqui o resultado"},
              {"name": "Uréia", "placeholder": "Digite aqui o resultado"},
              {"name": "Vitamina D", "placeholder": "Digite aqui o resultado"},
              {"name": "Cálcio", "placeholder": "Digite aqui o resultado"},
              {"name": "Vitamina B12", "placeholder": "Digite aqui o resultado"},
              {"name": "Ferritina", "placeholder": "Digite aqui o resultado"},
              {"name": "Potássio", "placeholder": "Digite aqui o resultado"},
              {"name": "Magnésio", "placeholder": "Digite aqui o resultado"}
          ]
      },
      "footer": {
          "text": "..."
      }
  };

  function preencherFormulario() {
      const formExames = document.getElementById('form-exames');

      // Verifica se o formulário já foi preenchido
      if (formExames.children.length > 0) return;

      const exames = jsonData.main.exams;
      exames.forEach(exame => {
          const exameDiv = document.createElement('div');
          exameDiv.className = 'exame';

          const col2 = document.createElement('div');
          col2.className = 'col-2';
          col2.textContent = exame.name;

          const col10 = document.createElement('input');
          col10.className = 'col-10';
          col10.placeholder = exame.placeholder;

          exameDiv.appendChild(col2);
          exameDiv.appendChild(col10);
          formExames.appendChild(exameDiv);
      });
  }

  function enviarResultados() {
      const camposResultado = document.querySelectorAll('.exame input');
      const resultados = {};

      camposResultado.forEach(function(elemento) {
          let nomeExame = elemento.previousElementSibling.textContent.trim();
          const resultadoExame = elemento.value.trim();

          resultados[nomeExame] = resultadoExame;
      });

      enviarResultadosParaServidor(resultados);
  }

  function enviarResultadosParaServidor(resultados) {
      fetch('https://6df5baed-a6aa-4184-8e4b-73c7cbc1744e-00-2ek8esxc63xiy.worf.replit.dev/exames', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(resultados),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Erro na resposta do servidor');
          }
          return response.json();
      })
      .then(data => {
          console.log('Resposta do servidor:', data);
          if (data.id) {
              // Salva o ID no sessionStorage
              sessionStorage.setItem('exameID', data.id);
              console.log('ID salvo no sessionStorage:', data.id);
          } else {
              console.error('ID não encontrado na resposta do servidor');
          }
          // Redireciona para a página indexizadora.html após o envio bem-sucedido
          window.location.href = 'indexizadora.html';
      })
      .catch(error => {
          console.error('Ocorreu um erro ao enviar os resultados:', error);
      });
  }

  const btnEnviarResultados = document.querySelector('.btn.btn-info');
  btnEnviarResultados.addEventListener('click', enviarResultados);

  preencherFormulario();
});
