# Documentação Acessível com IA - Hackathon Zup Equipe 5

Este projeto foi desenvolvido como parte do Hackathon da Zup, com o objetivo de criar uma solução inovadora para a produção de documentação com 100% de acessibilidade, utilizando IA para facilitar o acesso e compreensão, especialmente para pessoas com deficiência visual ou que utilizam leitores de tela.

## Integrantes da Equipe

- **André Luiz Albuquerque França**: (85) 98549-7402
- **Christal Camillo** (Líder): (21) 99751-1113
- **Jonathan Euzébio Boza**: (48) 99692-1877
- **Luiz Fernando de Moura Barbosa**: (83) 99444-4645
- **Mário Fernandes**: (34) 99775-1893

### Mentor: Elcio Jesus (Zupper)

## Objetivo

O projeto tem como objetivo melhorar a acessibilidade da documentação técnica, principalmente em projetos de software, utilizando Inteligência Artificial para gerar descrições de imagens, simplificar textos e fornecer suporte a usuários com deficiência visual.

## Funcionalidades Principais

1. **Acessibilidade da Interface**
   - Alteração de fonte: Opções para aumentar, diminuir e restaurar o tamanho da fonte.
   - Modos de cores:
     - **Alto contraste (Preto e Branco)**
     - **Modo Noturno**
     - **Inversão de Cores**
   - Suporte para a ferramenta **VLibras** para tradução em libras.

2. **Descrição de Imagens Usando IA**
   - Geração automática de descrições de imagens a partir de URLs fornecidas pelos usuários, utilizando modelos de IA.
   - As descrições geradas são exibidas e podem ser ouvidas por meio da funcionalidade de síntese de voz.

3. **Geração Automática de Documentação a Partir do GitHub**
   - O usuário pode inserir o link de um repositório no GitHub, e o sistema recupera o conteúdo do arquivo `README.md`.
   - O documento gerado pode ser baixado nos formatos:
     - **PDF**
     - **TXT**
     - **Markdown**
     - **HTML**
     - **RTF**

4. **Simplificação de Textos**
   - IA capaz de simplificar textos complexos, tornando-os mais acessíveis e fáceis de entender.

## Tecnologias Utilizadas

### Backend
- **Java 17**
- **Spring Boot**: Framework para construir as APIs REST que suportam as funcionalidades de descrição de imagens e geração de documentos.
- **API OpenAI**: Utilizada para gerar descrições de imagens e simplificar textos.
- **GitHub API**: Para extrair o conteúdo dos arquivos `README.md` dos repositórios.
- **PDFBox**: Biblioteca utilizada para gerar arquivos PDF a partir de textos.

## Instalação e Execução

### Pré-requisitos

- **Java 17 ou superior**
- **Maven** (ou outra ferramenta de build compatível)

### Passos para Executar

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/JebCodeOficial/HackathonZupGrupo5.git
