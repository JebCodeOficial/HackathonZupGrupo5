
var tam = 1.0;

// Função para alterar o tamanho da fonte
function mudaFonte(tipo) {
    if (tipo === "mais" && tam < 2.5) {
        tam += 0.1;
    } else if (tipo === "menos" && tam > 0.5) {
        tam -= 0.1;
    } else if (tipo === "padrao") {
        tam = 1.0;
    }
    document.body.style.fontSize = tam + "rem";
}

// Função para ativar/desativar o modo alto contraste (Preto e Branco)
function mudaContraste() {
    document.body.classList.toggle('alto-contraste');
    atualizaCookie();
}

// Função para ativar/desativar o modo noturno
function mudaCor() {
    document.body.classList.toggle('modo-noturno');
    atualizaCookie();
}

// Função para inverter as cores
function inverterCor() {
    document.body.classList.toggle('inverter');
    atualizaCookie();
}

// Função para criar ou atualizar cookie com a preferência de estilo
function atualizaCookie() {
    var cookiesAtuais = [];
    if (document.body.classList.contains('alto-contraste')) cookiesAtuais.push('alto-contraste');
    if (document.body.classList.contains('modo-noturno')) cookiesAtuais.push('modo-noturno');
    if (document.body.classList.contains('inverter')) cookiesAtuais.push('inverter');
    createCookie('style', cookiesAtuais.join(','), 365);
}

// Função para criar cookie
function createCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Função para ler cookie
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Aplicar cookies ao carregar a página
function checkCookie() {
    var style = readCookie("style");
    if (style) {
        var estilos = style.split(',');
        estilos.forEach(function (estilo) {
            document.body.classList.add(estilo);
        });
    }
}

