# Linktree Clone

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🎯 O que é o projeto?

<img width="1282" alt="Image" src="https://github.com/user-attachments/assets/2ef61af5-9173-4ef6-abc4-406c8241bca4" />


Este projeto é uma versão simplificada e de código aberto do popular serviço **Linktree**. Ele cria uma página única e personalizável que centraliza todos os seus links importantes (redes sociais, portfólio, projetos, etc.) em um só lugar.

Pense nele como um **cartão de visita digital**. Em vez de entregar vários cartões ou passar vários links para alguém, você compartilha apenas um. Ao acessá-lo, a pessoa vê uma lista organizada de todos os seus outros links, facilitando o acesso a tudo o que você quer mostrar.

## ✨ Funcionalidades Principais

* **Página de Links:** Exibe uma lista de botões, onde cada um redireciona para uma URL diferente.

![Image](https://github.com/user-attachments/assets/1f01d9f0-2c16-4d28-b349-d25b12c89d67)

* **Painel de Administração:** Uma página simples e protegida em `/admin` para adicionar e remover links dinamicamente.

![Image](https://github.com/user-attachments/assets/31b23763-6d81-4a0d-8f68-f0a45b98c832)

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

## 🚀 Como Executar o Projeto Localmente ou acessar via link

[Para acessar, clique aqui](https://linktree-8eio.onrender.com), caso o servidor precise ser ativado por conta do deploy gratuito, espere no maximo 1 minuto.

Para rodar este projeto em sua máquina, siga os passos abaixo.

**Pré-requisitos:**
* Ter o [Node.js](https://nodejs.org/en/) instalado (que já vem com o `npm`).

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Bytt13/Linktree.git
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd Linktree
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

```text
/
├── data/
│   └── links.json        # "Banco de dados" que armazena os links.
├── node_modules/         # Pasta onde as dependências (Express) são instaladas.
├── public/
│   ├── admin.html        # Página de administração para gerenciar os links.
│   ├── admin.js          # Lógica do front-end para a página de admin.
│   ├── index.html        # Página principal que exibe os links para os visitantes.
│   ├── script.js         # Lógica do front-end para buscar e mostrar os links.
│   └── style.css         # Folha de estilos principal.
├── .gitignore            # Arquivo que diz ao Git o que ignorar (ex: node_modules).
├── package-lock.json     # Detalhes exatos das versões das dependências.
├── package.json          # "RG" do projeto: define nome, scripts e dependências.
└── server.js             # Coração do projeto: o servidor Express que controla tudo.
```
## 🔩 Endpoints da API

A API foi construída para gerenciar uma lista de links e é protegida por um sistema de autenticação simples baseado em token.

### Autenticação

Para realizar ações de administrador (adicionar, editar, deletar), é necessário primeiro fazer login para obter um token e depois enviar este token no cabeçalho `Authorization` de cada requisição protegida.

---

### **1. Login de Administrador**

- `POST /api/login`
    - **Descrição:** Autentica o usuário administrador.
    - **Proteção:** Nenhuma.
    - **Corpo da Requisição (Body):**
        ```json
        {
          "password": "a_senha_correta"
        }
        ```
    - **Resposta (Sucesso 200):** Retorna um token de acesso.
        ```json
        {
          "success": true,
          "token": "token-for-validation"
        }
        ```
    - **Resposta (Falha 401):** Senha incorreta.
        ```json
        {
          "success": false,
          "message": "Password Incorrect"
        }
        ```

---

### **2. Gerenciamento de Links**

#### **Listar todos os links**

- `GET /api/links`
    - **Descrição:** Retorna uma lista com todos os links atualmente salvos.
    - **Proteção:** Nenhuma. Este endpoint é público.
    - **Resposta (Sucesso 200):** Um array de objetos, onde cada objeto é um link.
        ```json
        [
          {
            "id": 1678886400000,
            "title": "Meu Portfólio",
            "url": "[https://meu-site.com](https://meu-site.com)"
          }
        ]
        ```

#### **Adicionar um novo link**

- `POST /api/links`
    - **Descrição:** Cria e salva um novo link.
    - **Proteção:** **Sim.** Requer o token no cabeçalho `Authorization`.
    - **Corpo da Requisição (Body):**
        ```json
        {
          "title": "Título do Novo Link",
          "url": "[https://novo-link.com](https://novo-link.com)"
        }
        ```
    - **Resposta (Sucesso 201):** Retorna o objeto do link recém-criado.

#### **Editar um link existente**

- `PUT /api/links/:id`
    - **Descrição:** Atualiza o título e a URL de um link específico, identificado pelo seu `id`.
    - **Proteção:** **Sim.** Requer o token no cabeçalho `Authorization`.
    - **Parâmetro de URL:** `id` (o identificador numérico do link a ser editado).
    - **Corpo da Requisição (Body):**
        ```json
        {
          "title": "Título Atualizado",
          "url": "[https://link-atualizado.com](https://link-atualizado.com)"
        }
        ```
    - **Resposta (Sucesso 200):** `link edited successfully`
    - **Resposta (Falha 404):** `Link not found`

#### **Deletar um link**

- `DELETE /api/links/:id`
    - **Descrição:** Remove um link específico do sistema, identificado pelo seu `id`.
    - **Proteção:** **Sim.** Requer o token no cabeçalho `Authorization`.
    - **Parâmetro de URL:** `id` (o identificador numérico do link a ser deletado).
    - **Resposta (Sucesso 200):** `link deleted successfully`
    - 
## 📝 Como Usar + GIFs caso queira visualizar como funciona

1.  Inicie o servidor (`node server.js`).
2.  Abra a página de administração: `http://localhost:3000/admin`.
3.  Use a senha "senha" para entrar (caso precise)
4.  Para **adicionar um link**:
    * Preencha o campo "Título do Link" (o texto que aparecerá no botão).
    * Preencha o campo "URL do Link" (o destino para onde o botão levará).

    * Clique em "Adicionar Link".

![Jun-24-2025 14-34-16](https://github.com/user-attachments/assets/22ea7f47-5716-4ecf-bede-052fa9186553)

5.  Para **remover um link**:
    * Clique no botão de "Delete" ao lado do link que deseja excluir.

![Image](https://github.com/user-attachments/assets/6baab1a2-a4c9-480b-b0e6-12fce6adaf1f)

As alterações são salvas automaticamente no arquivo `links.json` e a página principal será atualizada para todos os visitantes.

6.  Para **editar um link**:
    * Clique no botão de "Edit" ao lado do link que deseja editar, e edite o titulo, ou URL dele, mantendo sempre os dois campos preenchidos.

![Image](https://github.com/user-attachments/assets/052234cd-f0fd-43cc-9fa6-9b71c220f5d3)

![Image](https://github.com/user-attachments/assets/89d68ca9-216c-40ad-8007-078e650d8e64)

