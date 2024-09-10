function descreverImagem() {
    const imageUrlInput = document.getElementById('url-imagem');
    const imageUrl = imageUrlInput.value.trim(); // Remover espaços extras
    const resultDiv = document.getElementById('description-result');
    const errorDiv = document.getElementById('description-error');
    const imageElement = document.getElementById('imagem');
    const botaoOuvirTexto = document.getElementById('botaoOuvirTexto');
    const loadingIndicator = document.getElementById('loading-indicator');

    // Limpa as mensagens anteriores e esconde as divs
    resultDiv.textContent = '';
    errorDiv.textContent = '';
    resultDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
    imageElement.classList.add('hidden');
    botaoOuvirTexto.classList.add('hidden');
    loadingIndicator.classList.remove('hidden'); // Exibe o indicador de carregamento

    // Verifica se a URL da imagem foi inserida
    if (!imageUrl) {
    errorDiv.textContent = "Por favor, insira a URL da imagem.";
    errorDiv.classList.remove('hidden');
    loadingIndicator.classList.add('hidden'); // Oculta o indicador de carregamento
    return;
}

    // Atualiza o src da imagem e exibe o elemento img
    imageElement.src = imageUrl;
    imageElement.classList.remove('hidden');

    fetch(`/api/descrever-imagem?url=${encodeURIComponent(imageUrl)}&model=gpt-3.5-turbo`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
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
    loadingIndicator.classList.add('hidden'); // Oculta o indicador de carregamento
    if (data.description) {
    resultDiv.textContent = "Descrição da imagem: " + data.description;
    resultDiv.classList.remove('hidden');
    botaoOuvirTexto.classList.remove('hidden'); // Exibe o botão "Ouvir Tradução"
} else if (data.error) {
    errorDiv.textContent = "Erro: " + data.error;
    errorDiv.classList.remove('hidden');
} else {
    errorDiv.textContent = "Erro: resposta inesperada do servidor.";
    errorDiv.classList.remove('hidden');
}
})
    .catch(error => {
    loadingIndicator.classList.add('hidden'); // Oculta o indicador de carregamento
    errorDiv.textContent = 'Erro ao descrever a imagem: ' + error.message;
    errorDiv.classList.remove('hidden');
    console.error('Erro ao descrever a imagem:', error);
});
}

function ouvirTexto() {
    var elemento = document.querySelector('#description-result');
    var texto = elemento ? elemento.innerText : '';

    // Mostrar o indicador de carregamento
    var loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'block';

    // Verifica se o texto está disponível
    if (texto.trim() === '') {
    console.warn('Texto não disponível para leitura.');
    loadingIndicator.style.display = 'none';
    return;
}

    // Cria uma nova instância de SpeechSynthesisUtterance
    var utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR'; // Português do Brasil

    // Usa a API SpeechSynthesis para falar o texto
    window.speechSynthesis.speak(utterance);

    // Oculta o indicador de carregamento quando a síntese de fala termina
    utterance.onend = function() {
    loadingIndicator.style.display = 'none';
};

    // Também oculta o indicador se a síntese de fala não terminar após um certo tempo
    utterance.onerror = function() {
    loadingIndicator.style.display = 'none';
};
}




