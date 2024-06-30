async function postFeedbacks(nome, email, avaliacao, comentario) {
    fetch('https://4ca6ab37-c548-457f-a219-7785741ecd13-00-2wuns43czm716.riker.replit.dev:3000/feedbacks', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            'nome': nome,
            'email': email,
            'avaliacao': avaliacao,
            'comentario': comentario,
        }),
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            //respjson.innerHTML = imprime(json);
        });
}

function enviarDadosFormulario(event){
    event.preventDefault();

    nome = document.getElementById('nome').value;
    email = document.getElementById('email').value;
    avaliacao = document.getElementById('avaliacao').value;
    comentario = document.getElementById('comentario').value;

    postFeedbacks(nome, email, avaliacao, comentario);

    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('avaliacao').value = '';
    document.getElementById('comentario').value = '';
    
}
