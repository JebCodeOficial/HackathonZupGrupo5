 // Variável para controlar o tamanho da fonte
    let tam = 1.0;

    // Chamar checkCookie ao carregar a página
    window.onload = function() {
    checkCookie(); // Verifica e aplica preferências salvas (fonte, modo)
};

    // Função para alterar o tamanho da fonte
    function mudaFonte(tipo) {
    if (tipo === "mais" && tam < 2.5) {
    tam += 0.1;
} else if (tipo === "menos" && tam > 0.5) {
    tam -= 0.1;
} else if (tipo === "padrao") {
    tam = 1.0; // Redefine o tamanho da fonte para o padrão
}
    document.body.style.fontSize = tam + "rem";
    atualizaCookie(); // Atualiza o cookie com o novo tamanho de fonte
}

    // Atualiza o armazenamento local com as preferências (tamanho da fonte e estilos aplicados)
    function atualizaCookie() {
    var preferencias = {
    estilos: [],
    tamanhoFonte: tam
};
    if (document.body.classList.contains('alto-contraste')) preferencias.estilos.push('alto-contraste');
    if (document.body.classList.contains('modo-noturno')) preferencias.estilos.push('modo-noturno');
    if (document.body.classList.contains('inverter')) preferencias.estilos.push('inverter');
    localStorage.setItem('preferencias', JSON.stringify(preferencias));
}

    // Verifica o armazenamento local e aplica as preferências (fonte, contraste, cores)
    function checkCookie() {
    var preferencias = JSON.parse(localStorage.getItem('preferencias'));
    if (preferencias) {
    preferencias.estilos.forEach(function (estilo) {
    document.body.classList.add(estilo);
});
    tam = preferencias.tamanhoFonte || 1.0;
    document.body.style.fontSize = tam + "rem";
}
}

    // Função para alternar o modo de contraste alto
    function mudaContraste() {
    document.body.classList.toggle('alto-contraste');
    atualizaCookie(); // Salva a preferência
}

    // Função para alternar o modo noturno
    function mudaCor() {
    document.body.classList.toggle('modo-noturno');
    atualizaCookie(); // Salva a preferência
}

    // Função para inverter as cores da página
    function inverterCor() {
    document.body.classList.toggle('inverter');
    atualizaCookie(); // Salva a preferência
}
