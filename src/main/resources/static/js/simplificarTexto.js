let utteranceSimplify;
let intervalSimplify;

function simplificarTexto() {
    const textArea = document.getElementById('texto');
    const text = textArea.value;
    const resultDiv = document.getElementById('simplified-text-result');
    const errorDiv = document.getElementById('simplified-error');
    const loadingIndicator = document.getElementById('loading-indicatorSimplify');
    const botaoOuvirTexto = document.getElementById('botaoOuvirTextoSimplify');

    // Limpa as mensagens anteriores e esconde as divs
    resultDiv.textContent = '';
    errorDiv.textContent = '';
    resultDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
    loadingIndicator.classList.remove('hidden');
    botaoOuvirTexto.classList.add('hidden'); // Esconde o botão até que a simplificação seja gerada

    if (!text) {
        errorDiv.textContent = "Por favor, insira o texto para simplificar.";
        errorDiv.classList.remove('hidden');
        loadingIndicator.classList.add('hidden');
        return;
    }

    fetch(`/api/simplificar-texto`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({text: text})
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.json();
        })
        .then(data => {
            loadingIndicator.classList.add('hidden');
            if (data.simplified_text) {
                resultDiv.textContent = "Texto simplificado: " + data.simplified_text;
                resultDiv.classList.remove('hidden');
                botaoOuvirTexto.classList.remove('hidden'); // Mostra o botão "Ouvir Tradução"
            } else if (data.error) {
                errorDiv.textContent = "Erro: " + data.error;
                errorDiv.classList.remove('hidden');
            } else {
                errorDiv.textContent = "Erro: resposta inesperada do servidor.";
                errorDiv.classList.remove('hidden');
            }
        })
        .catch(error => {
            loadingIndicator.classList.add('hidden');
            errorDiv.textContent = 'Erro ao simplificar o texto: ' + error.message;
            errorDiv.classList.remove('hidden');
            console.error('Detalhe do erro:', error);
        });
}

function ouvirTextoSimplify() {
    if (window.speechSynthesis.speaking) {
        console.warn('Já está em execução uma leitura. Aguarde até que ela termine.');
        return;
    }

    const resultDiv = document.getElementById('simplified-text-result');
    const texto = resultDiv.textContent.replace("Texto simplificado: ", "");

    utteranceSimplify = new SpeechSynthesisUtterance(texto);
    utteranceSimplify.lang = 'pt-BR'; // Português do Brasil

    // Calcula a duração estimada do texto baseado no número de palavras
    const wpm = 180; // Velocidade de fala: 180 palavras por minuto (aproximadamente)
    const words = texto.split(/\s+/).length;
    const estimatedDuration = Math.ceil(words / wpm * 60); // Duração estimada em segundos

    // Exibe o tempo estimado
    const modalTime = document.getElementById('modal-timeSimplify');
    modalTime.classList.remove('hidden');
    modalTime.textContent = `Tempo estimado: ${estimatedDuration} segundos`;

    // Atualiza o tempo restante durante a fala
    let timeRemaining = estimatedDuration;
    intervalSimplify = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            modalTime.textContent = `Tempo restante: ${timeRemaining} segundos`;
        } else {
            clearInterval(intervalSimplify);
        }
    }, 1000);

    // Exibe o botão de parar a leitura
    document.getElementById('pararOuvirSimplify').classList.remove('hidden');

    // Inicia a leitura do texto
    window.speechSynthesis.speak(utteranceSimplify);

    utteranceSimplify.onerror = function() {
        console.error('Erro ao tentar realizar a leitura do texto.');
        clearInterval(intervalSimplify); // Interrompe o temporizador em caso de erro
        modalTime.textContent = "Erro na leitura.";
    };

    utteranceSimplify.onend = function() {
        clearInterval(intervalSimplify); // Interrompe o temporizador ao final da fala
        modalTime.textContent = "Leitura concluída.";
        document.getElementById('pararOuvirSimplify').classList.add('hidden'); // Esconde o botão "Parar Leitura"
    };
}

function pararOuvirSimplify() {
    // Para a leitura da fala e limpa o temporizador
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel(); // Para a leitura atual
        clearInterval(intervalSimplify); // Interrompe o temporizador
        document.getElementById('modal-timeSimplify').textContent = "Leitura interrompida.";
        document.getElementById('pararOuvirSimplify').classList.add('hidden'); // Esconde o botão "Parar Leitura"
    }
}