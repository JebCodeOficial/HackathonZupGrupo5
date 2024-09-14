
let utterance;
let interval;

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function descreverImagem() {
    const imageUrlInput = document.getElementById('url-imagem');
    const imageUrl = imageUrlInput.value.trim();
    const resultDiv = document.getElementById('description-result');
    const errorDiv = document.getElementById('description-error');
    const imageElement = document.getElementById('imagem');
    const loadingIndicator = document.getElementById('loading-indicator');
    const botaoOuvirTexto = document.getElementById('botaoOuvirTexto');

    resultDiv.textContent = '';
    errorDiv.textContent = '';
    resultDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
    imageElement.classList.add('hidden');
    loadingIndicator.classList.remove('hidden');
    botaoOuvirTexto.classList.add('hidden'); // Esconde o botão até que a descrição seja gerada

    if (!imageUrl || !isValidUrl(imageUrl)) {
        errorDiv.textContent = "Por favor, insira uma URL válida da imagem.";
        errorDiv.classList.remove('hidden');
        loadingIndicator.classList.add('hidden');
        return;
    }

    imageElement.src = imageUrl;
    imageElement.classList.remove('hidden');

    fetchWithTimeout(`/api/descrever-imagem?url=${encodeURIComponent(imageUrl)}&model=gpt-3.5-turbo`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text); });
            }
            return response.json();
        })
        .then(data => {
            loadingIndicator.classList.add('hidden');
            if (data.description) {
                resultDiv.textContent = "Descrição da imagem: " + data.description;
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
            errorDiv.textContent = 'Erro ao descrever a imagem: ' + error.message;
            errorDiv.classList.remove('hidden');
            console.error('Erro ao descrever a imagem:', error);
        });
}

function fetchWithTimeout(url, options, timeout = 7000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout ao tentar descrever a imagem')), timeout)
        )
    ]);
}

function ouvirTexto() {
    if (window.speechSynthesis.speaking) {
        console.warn('Já está em execução uma leitura. Aguarde até que ela termine.');
        return;
    }

    const resultDiv = document.getElementById('description-result');
    const texto = resultDiv.textContent.replace("Descrição da imagem: ", "");

    utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR'; // Português do Brasil

    // Calcula a duração estimada do texto baseado no número de palavras
    const wpm = 180; // Velocidade de fala: 180 palavras por minuto (aproximadamente)
    const words = texto.split(/\s+/).length;
    const estimatedDuration = Math.ceil(words / wpm * 60); // Duração estimada em segundos

    // Exibe o tempo estimado
    const modalTime = document.getElementById('modal-time');
    modalTime.classList.remove('hidden');
    modalTime.textContent = `Tempo estimado: ${estimatedDuration} segundos`;

    // Atualiza o tempo restante durante a fala
    let timeRemaining = estimatedDuration;
    interval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            modalTime.textContent = `Tempo restante: ${timeRemaining} segundos`;
        } else {
            clearInterval(interval);
        }
    }, 1000);

    // Exibe o botão de parar a leitura
    document.getElementById('pararOuvir').classList.remove('hidden');

    // Inicia a leitura do texto
    window.speechSynthesis.speak(utterance);

    utterance.onerror = function() {
        console.error('Erro ao falar o texto:', utterance.text);
        clearInterval(interval); // Interrompe o temporizador em caso de erro
        modalTime.textContent = "Leitura interrompida.";
    };

    utterance.onend = function() {
        clearInterval(interval); // Interrompe o temporizador ao final da fala
        modalTime.textContent = "Leitura concluída.";
        document.getElementById('pararOuvir').classList.add('hidden'); // Esconde o botão "Parar Leitura"
    };
}

function pararOuvir() {
    // Para a leitura da fala e limpa o temporizador
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel(); // Para a leitura atual
        clearInterval(interval); // Interrompe o temporizador
        document.getElementById('modal-time').textContent = "Leitura interrompida.";
        document.getElementById('pararOuvir').classList.add('hidden'); // Esconde o botão "Parar Leitura"
    }
}