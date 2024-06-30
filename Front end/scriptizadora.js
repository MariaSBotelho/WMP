document.addEventListener("DOMContentLoaded", function() {
    let storedValue = '';

    function storeValue() {
        // Recupera o ID do sessionStorage
        storedValue = sessionStorage.getItem('exameID');

        if (storedValue) {
            console.log(`ID recuperado do sessionStorage: ${storedValue}`);

            getExameById(storedValue).then(exame => {
                if (exame) {
                    const mensagens = gerarMensagens(exame);
                    exibirMensagens(mensagens);
                } else {
                    exibirMensagens({}); // Limpa as mensagens se o exame não for encontrado
                }
            });
        } else {
            console.log('Nenhum ID encontrado no sessionStorage.');
        }
    }

    async function getExameById(id) {
        const url = 'https://6df5baed-a6aa-4184-8e4b-73c7cbc1744e-00-2ek8esxc63xiy.worf.replit.dev/exames';

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados');
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Resposta não é JSON');
            }

            const data = await response.json();
            if (!data || !Array.isArray(data)) {
                throw new Error('Dados de exame inválidos');
            }

            const exame = data.find(exame => exame.id === id);

            if (exame) {
                console.log('Exame encontrado:', exame);
                return exame;
            } else {
                console.log('Exame não encontrado');
                return null;
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    function gerarMensagens(exame) {
        // Valores de referência
        const referencia = {
            Hemograma: { min: 12, max: 17.5 },
            Glicose: { min: 70, max: 100 },
            Hemoglobina: { min: 11.5, max: 16.9 },
            'Colesterol total': { max: 190 },
            HDL: { min: 40 },
            LDL: { max: 130 },
            Triglicérides: { max: 150 },
            Creatina: { min: 0.6, max: 1.3 },
            Uréia: { min: 0.6, max: 4.5 },
            'Vitamina D': { min: 30, max: 100 },
            'Vitamina B12': { min: 190, max: 900 },
            Cálcio: { min: 8.8, max: 10.4 },
            Ferritina: { min: 30, max: 300 },
            Potássio: { min: 3.5, max: 5.2 },
            Magnésio: { min: 1.6, max: 2.6 }
        };

        // Função para gerar mensagem
        function gerarMensagem(nomeExame, valor, ref) {
            let mensagem = "";

            if (nomeExame === "Hemograma") {
                if (valor < ref.min) {
                    mensagem = "Resultado baixo. Pode ser devido a anemia, perda de sangue ou insuficiência renal.";
                } else if (valor > ref.max) {
                    mensagem = "Resultado alto. Pode causar coágulos sanguíneos, trombose e embolia pulmonar.";
                } else {
                    mensagem = "Resultado ótimo.";
                }
            } else if (nomeExame === "Glicose") {
                if (valor < ref.min) {
                    mensagem = "Resultado baixo. Pode causar sudorese, tremores e fadiga.";
                } else if (valor > ref.max) {
                    mensagem = "Resultado alto. Pode causar danos aos olhos, rins e nervos, além de aumentar o risco de doenças cardiovasculares.";
                } else {
                    mensagem = "Resultado ótimo.";
                }
            } else if (nomeExame === "Hemoglobina") {
                if (valor < ref.min) {
                    mensagem = "Resultado baixo. Indicativo de anemia e problemas nutricionais.";
                } else if (valor > ref.max) {
                    mensagem = "Resultado alto. Associado a policitemia e doenças pulmonares.";
                } else {
                    mensagem = "Resultado ótimo.";
                }
            } else if (nomeExame === "Colesterol total") {
                if (valor < ref.max) {
                    mensagem = "Resultado ótimo.";
                } else if (valor > ref.max) {
                    mensagem = "Resultado alto. Pode levar a doenças cardíacas e AVC.";
                } else {
                    mensagem = "Resultado ótimo.";
                }
            } else if (nomeExame === "HDL") {
                if (valor < ref.min) {
                    mensagem = "Resultado baixo. Aumenta o risco de doenças cardiovasculares.";
                } else if (valor > ref.min) {
                    mensagem = "Resultado baixo. Aumenta o risco de doenças cardiovasculares.";
                } else {
                    mensagem = "Resultado ótimo.";
                }
            } else if (nomeExame === "LDL") {
                if (valor < ref.max) {
                    mensagem = "Resultado baixo. procure um médico.";
                } else if (valor > ref.max) {
                    mensagem = "Resultado alto. Indica aterosclerose e maior risco cardiovascular.";
                } else {
                    mensagem = "Resultado ótimo.";
                }
            } else if (nomeExame === "Triglicérides") {
                if (valor < ref.max) {
                    mensagem = "Resultado baixo, procure um médico.";
                } else if (valor > ref.max) {
                    mensagem = "Resultado alto. Aumenta o risco de pancreatite, doenças cardiovasculares e problemas hepáticos.";
                } else {
                    mensagem = "Resultado ótimo.";
                }
            } else if (nomeExame === "Creatina") {
                if (valor < ref.min) {
                    mensagem = "Resultado baixo. Pode indicar perda de massa muscular ou problemas renais.";
                } else if (valor > ref.max) {
                    mensagem = "Resultado alto. Associado a problemas renais ou aumento de massa muscular.";
                } else {
                    mensagem = "Resultado ótimo.";
                }
            } else if (nomeExame === "Uréia") {
                if (valor < ref.min) {
                    mensagem = "Resultado baixo. Pode indicar problemas hepáticos ou desnutrição.";
                } else if (valor > ref.max) {
                    mensagem = "Resultado alto. Indicativo de insuficiência renal ou desidratação.";
                } else {
                    mensagem = "Resultado ótimo.";
                }
            } else if (nomeExame === "Vitamina D") {
                if (valor < ref.min) {
                    mensagem = "Resultado baixo. Aumenta o risco de problemas ósseos e doenças cardíacas.";
                } else if (valor > ref.max) {
                    mensagem = "Resultado alto. Pode causar níveis elevados de cálcio e problemas renais.";
                } else {
                    mensagem = "Resultado ótimo.";
                }
            } else if (nomeExame === "Vitamina B12") {
                if (valor < ref.min) {
                    mensagem = "Resultado baixo. Pode levar a anemia, problemas neurológicos e cardiovasculares.";
                } else if (valor > ref.max) {
                    mensagem = "Resultado alto. Raro, mas pode causar reações alérgicas e complicações renais.";
                } else {
                    mensagem = "Resultado ótimo.";
                }
            } else if (nomeExame === "Cálcio") {
                if (valor < ref.min) {
                    mensagem = "Resultado baixo. Pode resultar em fraqueza muscular e problemas ósseos.";
                } else if (valor > ref.max) {
                    mensagem = "Resultado alto. Pode levar a problemas renais e cardíacos.";
                } else {
                    mensagem = "Resultado ótimo.";
                }
            } else if (nomeExame === "Ferritina") {
                if (valor < ref.min) {
                    mensagem = "Resultado baixo. Indicativo de baixos estoques de ferro e anemia.";
                } else if (valor > ref.max) {
                    mensagem = "Resultado alto. Pode indicar excesso de ferro e problemas hepáticos.";
                } else {
                    mensagem = "Resultado ótimo.";
                }
            } else if (nomeExame === "Potássio") {
                if (valor < ref.min) {
                    mensagem = "Resultado baixo. Pode causar fraqueza muscular e problemas cardíacos.";
                } else if (valor > ref.max) {
                    mensagem = "Resultado alto. Aumenta o risco de parada cardíaca e problemas renais.";
                } else {
                    mensagem = "Resultado ótimo.";
                }
            } else if (nomeExame === "Magnésio") {
                if (valor < ref.min) {
                    mensagem = "Resultado baixo. Pode causar fraqueza muscular e arritmias cardíacas.";
                } else if (valor > ref.max) {
                    mensagem = "Resultado alto. Pode levar a bloqueio cardíaco e problemas renais.";
                } else {
                    mensagem = "Resultado ótimo.";
                }
            }

            return mensagem;
        }

        // Gerar mensagens para todos os exames
        const mensagens = {};
        for (const [nomeExame, valor] of Object.entries(exame)) {
            if (nomeExame !== 'id' && referencia[nomeExame]) {
                mensagens[nomeExame] = gerarMensagem(nomeExame, parseFloat(valor), referencia[nomeExame]);
            }
        }

        return mensagens;
    }

    // Exibir mensagens na página HTML
    function exibirMensagens(mensagens) {
        const idsExames = [
            'mensagemHemograma', 'mensagemGlicose', 'mensagemHemoglobina', 'mensagemColesteroltotal',
            'mensagemHDL', 'mensagemLDL', 'mensagemTriglicérides', 'mensagemCreatina',
            'mensagemUréia', 'mensagemVitaminaD', 'mensagemVitaminaB12', 'mensagemCálcio',
            'mensagemFerritina', 'mensagemPotássio', 'mensagemMagnésio'
        ];

        // Limpa todas as mensagens
        idsExames.forEach(id => {
            const elemento = document.getElementById(id);
            if (elemento) {
                elemento.innerHTML = '';
            }
        });

        // Exibe novas mensagens
        for (const [nomeExame, mensagem] of Object.entries(mensagens)) {
            const elemento = document.getElementById(`mensagem${nomeExame.replace(' ', '')}`);
            if (elemento) {
                elemento.innerHTML = mensagem;
            }
        }
    }

    // Chama a função storeValue ao carregar a página para preencher os dados automaticamente
    storeValue();
});
