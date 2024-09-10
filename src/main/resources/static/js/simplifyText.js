function simplifyText() {
    const textArea = document.getElementById('texto');
    const text = textArea.value;
    const resultDiv = document.getElementById('simplified-text-result');
    const errorDiv = document.getElementById('simplified-error');

    // Limpa as mensagens anteriores e esconde as divs
    resultDiv.textContent = '';
    errorDiv.textContent = '';
    resultDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');

    if (!text) {
        errorDiv.textContent = "Por favor, insira o texto para simplificar.";
        errorDiv.classList.remove('hidden');
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
            if (data.simplified_text) {
                resultDiv.textContent = "Texto simplificado: " + data.simplified_text;
                resultDiv.classList.remove('hidden');
            } else if (data.error) {
                errorDiv.textContent = "Erro: " + data.error;
                errorDiv.classList.remove('hidden');
            } else {
                errorDiv.textContent = "Erro: resposta inesperada do servidor.";
                errorDiv.classList.remove('hidden');
            }
        })
        .catch(error => {
            errorDiv.textContent = 'Erro ao simplificar o texto: ' + error.message;
            errorDiv.classList.remove('hidden');
            console.error('Detalhe do erro:', error);
        });
}