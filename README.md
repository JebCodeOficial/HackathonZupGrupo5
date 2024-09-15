
# Hackathon Zup - Equipe 5

<div align="center">
  <img src="https://media.licdn.com/dms/image/v2/D4D22AQFczBz7XGLQ7A/feedshare-shrink_800/feedshare-shrink_800/0/1726057792418?e=1729123200&v=beta&t=ZQNQc1wH47sK_BBMgp7jFuwSnCJE1S8f5VUgxK9rc-A" alt="Hackathon Zup Afirmativo para Pessoas com Deficiência" width="400">
</div>

**Descrição da imagem**: No topo central da imagem, a marca do Hackathon. Logo abaixo, o texto destacado: **Hackathon Afirmativo para Pessoas com Deficiência**. Mais abaixo, um quadro em destaque com a frase: **Eu estou participando!** Seguido das hashtags: `#Diversidade`, `#Inclusão`, `#Tecnologia`. No rodapé da imagem, as marcas da **Zup** e **Diversidade e Inclusão**.

<p align="center">
  <b>Hackathon Afirmativo para Pessoas com Deficiência</b>  
  <br>  
  <i>Desenvolvido por um time dedicado à inclusão e diversidade, este projeto é focado em melhorar a acessibilidade em documentações técnicas com o apoio de Inteligência Artificial.</i>  
</p>

---

## **📋 Sobre o Projeto**

Este projeto foi desenvolvido como parte do Hackathon da Zup, com o objetivo de criar uma solução inovadora para a produção de **documentação com 100% de acessibilidade**. Ele utiliza IA para facilitar o acesso e compreensão, especialmente para pessoas com deficiência visual ou que utilizam leitores de tela.

## **👥 Integrantes da Equipe**

- **André Luiz Albuquerque França**
- **Christal Camillo** (Líder)
- **Jonathan Euzébio Boza**
- **Luiz Fernando de Moura Barbosa**
- **Mário Fernandes**
- **Mentor**: Elcio Jesus (Zupper)

---

## **🎯 Objetivo do Projeto**

Nosso objetivo é garantir que documentações técnicas sejam acessíveis a todos, utilizando ferramentas que simplifiquem a linguagem e descrevam imagens de forma clara e acessível para usuários com deficiência visual ou leitores de tela.

---

## **💻 Funcionalidades Principais**

1. **🖼️ Descrição de Imagens Usando IA**
    - Gera descrições automáticas de imagens a partir de URLs fornecidas pelos usuários.
    - As descrições geradas são acessíveis para síntese de voz.
    - Função para **Ouvir Tradução** e **Parar Leitura** das descrições geradas.

2. **📝 Simplificação de Textos Usando IA**
    - Simplifica textos complexos para uma versão mais clara e acessível.
    - Ótimo para tornar conteúdos técnicos mais compreensíveis.
    - Função para **Ouvir Tradução** e **Parar Leitura** dos textos simplificados.

3. **⚙️ Acessibilidade da Interface**
    - Opções de alteração de fonte (maior, menor e padrão).
    - Modos de cores: **Alto contraste**, **Modo noturno** e **Inversão de cores**.
    - Suporte para a ferramenta **VLibras** para tradução de conteúdo em Libras.

---

## **🛠️ Tecnologias Utilizadas**

### **Backend**
- **Java 17**
- **Spring Boot**
- **API OpenAI**
- **PDFBox**
- **GitHub API**

### **Frontend**
- **HTML5**, **CSS3**, **JavaScript (JQuery)**
- **FontAwesome**
- **VLibras** para tradução em Libras

---

## **📦 Instalação e Execução**

### **Pré-requisitos**

- **Java 17 ou superior**
- **Maven**

### **Passos para Executar o Backend**

```bash
# Clone o repositório
git clone https://github.com/JebCodeOficial/HackathonZupGrupo5.git

# Compile o projeto
mvn clean install

# Execute a aplicação
mvn spring-boot:run
```

### **Passos para Executar o Frontend**

1. Abra o arquivo `index.html` no navegador ou configure um servidor local para servir os arquivos.

---

## **📄 APIs Disponíveis**

### **1. Descrição de Imagem com OpenAI API**

Este endpoint gera a descrição de uma imagem a partir de uma URL, usando IA para retornar uma descrição acessível.

**Exemplo de Requisição `curl`**:

```bash
curl -X POST "http://localhost:8080/api/descrever-imagem" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d "url=https://learn.microsoft.com/pt-br/azure/architecture/ai-ml/idea/_images/architecture-intelligent-apps-image-processing.png" \
  -d "model=gpt-3.5-turbo"
```

**Parâmetros**:

- **url**: O URL da imagem que você deseja descrever.
- **model**: O modelo da OpenAI a ser usado para gerar a descrição da imagem.
- **Authorization**: O token de autenticação necessário para acessar a API OpenAI.

**Exemplo de Resposta**:

```json
{
  "description": "Esta é uma descrição gerada da imagem."
}
```

---


### **2. Simplificação de Texto com OpenAI API**

Este endpoint permite que o usuário envie um texto e receba uma versão simplificada do mesmo, utilizando a API da OpenAI.

**Exemplo de Requisição `curl`**:

```bash
curl -X POST "http://localhost:8080/api/simplificar-texto" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"text": "Este é o texto que você deseja simplificar"}'
```

**Parâmetros**:

- **text**: O texto que você deseja simplificar.
- **Authorization**: O token de autenticação necessário para acessar a API OpenAI.

**Exemplo de Resposta**:

```json
{
  "simplified_text": "Este é o texto simplificado."
}
```

---

## **📢 Observações**

- **Token de Autenticação**: Certifique-se de substituir `SEU_TOKEN_AQUI` pelo seu token real.
- **API OpenAI**: Estamos utilizando o modelo `gpt-3.5-turbo` da OpenAI para processamento de texto e imagens.

---

## **📞 Suporte**

- 📧 **Email**: [programador@jebcode.com.br](mailto:programador@jebcode.com.br)
- 📱 **WhatsApp**: [Mensagem no WhatsApp](https://wa.me/5548996921877) - (48) 9 9692-1877 (somente mensagens)

---

### **Feito com 💙 por Equipe 5 - Hackathon Zup**
