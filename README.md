# Linktree Clone Simples

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🎯 O que é o projeto?

Este projeto é uma versão simplificada e de código aberto do popular serviço **Linktree**. Ele cria uma página única e personalizável que centraliza todos os seus links importantes (redes sociais, portfólio, projetos, etc.) em um só lugar.

Pense nele como um **cartão de visita digital**. Em vez de entregar vários cartões ou passar vários links para alguém, você compartilha apenas um. Ao acessá-lo, a pessoa vê uma lista organizada de todos os seus outros links, facilitando o acesso a tudo o que você quer mostrar.

A principal vantagem é que, por ser auto-hospedado (*self-hosted*), você tem total controle sobre seus dados e aparência, sem depender de uma plataforma de terceiros.

## ✨ Funcionalidades Principais

* **Página de Links:** Exibe uma lista de botões, onde cada um redireciona para uma URL diferente.
* **Painel de Administração:** Uma página simples e protegida em `/admin` para adicionar e remover links dinamicamente.
* **Armazenamento em JSON:** Utiliza um arquivo `links.json` como um "banco de dados" simples, tornando o projeto leve e fácil de gerenciar.
* **Front-end Limpo:** Interface de usuário minimalista e funcional, fácil de personalizar.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

* **Back-end:**
    * **Node.js:** Ambiente de execução do JavaScript no servidor.
    * **Express.js:** Framework para criar o servidor web e as rotas da API de forma rápida e organizada.
* **Front-end:**
    * **HTML:** Estrutura das páginas web.
    * **CSS:** Estilização para dar uma aparência agradável.
    * **JavaScript (Vanilla):** Manipulação dinâmica da página para buscar e exibir os links, além de interagir com o painel de administração.
* **Dados:**
    * **JSON:** Formato leve para armazenar e trocar os dados dos links.

## 🚀 Como Executar o Projeto Localmente

Para rodar este projeto em sua máquina, siga os passos abaixo.

**Pré-requisitos:**
* Ter o [Node.js](https://nodejs.org/en/) instalado (que já vem com o `npm`).

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    ```
    *Substitua `seu-usuario/seu-repositorio.git` pela URL real do seu repositório no GitHub.*

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd nome-da-pasta-do-projeto
    ```

3.  **Instale as dependências:**
    Este comando vai ler o arquivo `package.json` e instalar tudo o que o projeto precisa para funcionar (como o Express).
    ```bash
    npm install
    ```

4.  **Inicie o servidor:**
    ```bash
    node server.js
    ```

5.  **Acesse no navegador:**
    * A página de links estará disponível em: `http://localhost:3000`
    * O painel de administração estará em: `http://localhost:3000/admin`

## 📂 Estrutura do Projeto

Aqui está uma visão geral dos arquivos e pastas mais importantes:
