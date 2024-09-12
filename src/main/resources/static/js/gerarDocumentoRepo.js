$(document).ready(function () {
    const repoForm = $('#repoForm');
    const readmeContentDiv = $('#readmeContent');
    const downloadButton = $('#downloadButton');
    const loader = $('#loaderGerarReamde');
    const formatSelect = $('#format');
    const errorMessage = $('#errorMessage');

    const formats = [
        { value: 'txt', text: 'TXT' },
        { value: 'pdf', text: 'PDF' },
        { value: 'md', text: 'Markdown' },
        { value: 'html', text: 'HTML' },
        { value: 'rtf', text: 'RTF' }
    ];

    // Popula o seletor de formatos
    function populateFormatSelect() {
        formats.forEach(format => {
            formatSelect.append($('<option>', {
                value: format.value,
                text: format.text
            }));
        });
    }

    populateFormatSelect();

    // Evento de envio do formulário para carregar o README
    repoForm.on('submit', function (event) {
        event.preventDefault();
        const repoUrl = $('#repoUrl').val();

        loader.text('Carregando README...');
        loader.removeClass('hidden');
        errorMessage.text('');

        // Fetch para buscar o conteúdo do README
        fetch(`/api/document/fetchReadme?repoUrl=${repoUrl}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao carregar README: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                // Sanitização do conteúdo para evitar injeção de HTML malicioso
                const sanitizedData = DOMPurify.sanitize(data);
                readmeContentDiv.show().html(sanitizedData);
                loader.addClass('hidden');
                downloadButton.show();
            })
            .catch(error => {
                console.error('Erro ao carregar README:', error);
                loader.text('Erro ao carregar README. Tente novamente.');
            });
    });

    // Evento de clique no botão de download para baixar o arquivo ou gerar PDF
    downloadButton.on('click', function () {
        const repoUrl = $('#repoUrl').val();
        const format = formatSelect.val();
        const readmeContent = $('#readmeContent').text();  // Obtém o texto do README

        if (format === 'pdf') {
            generatePDF(readmeContent);
        } else {
            downloadFile(repoUrl, format);
        }
    });

    // Função para gerar o PDF com jsPDF
    function generatePDF(content) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.text(content, 10, 10);  // Adiciona o conteúdo sanitizado ao PDF

        // Baixar o PDF
        doc.save('document.pdf');
    }

    // Função para baixar arquivos de outros formatos
    function downloadFile(repoUrl, format) {
        fetch(`/api/document/download?repoUrl=${repoUrl}&format=${format}`, {
            method: 'POST',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao baixar o arquivo: ${response.statusText}`);
                }

                return response.blob();  // Retorno do conteúdo como um blob
            })
            .then(blob => {
                // Criação de um link para download do arquivo
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);

                // Definição do nome do arquivo com base no formato selecionado
                link.download = `document.${format}`;

                // Aciona o download
                link.click();

                // Revoga o URL temporário para liberar memória
                window.URL.revokeObjectURL(link.href);
            })
            .catch(error => {
                console.error('Erro ao baixar o arquivo:', error);
                errorMessage.text('Erro ao baixar o arquivo. Por favor, tente novamente.');
                errorMessage.show();
            });
    }
});