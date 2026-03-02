# MultiSearch

Sistema de busca unificada simulando uma API real com front-end em Vue 3 e back-end em Node.js.

---

## Visão Geral

O MultiSearch é uma aplicação full stack que realiza buscas em múltiplos conjuntos de dados representados por arquivos `.json`, simulando tabelas de um banco de dados.

---

## Tecnologias Utilizadas

### Front-end

* Vue 3 
* Vite
* Axios
* HTML/CSS/JS

### Back-end

* Node.js
* Typescript
* Swagger

### Ferramentas de Desenvolvimento

* concurrently 
* npm
* Vite Dev Server

---

## Funcionamento da Aplicação

1. O usuário digita um termo de busca.

2. O front envia requisição GET para:

   ```
   http://localhost:3000/search?q=termo
   ```

3. O backend:

   * Lê os arquivos JSON
   * Normaliza os dados
   * Filtra conforme o texto buscado
   * Retorna os resultados com `type`, `data` e `total`

4. O frontend:

   * Agrupa os resultados por tipo
   * Exibe ID e nome
   * Mostra detalhes ao passar o mouse 

---

## Instalação e Execução

### Requisitos

* Node.js 18+ instalado
* npm instalado

---

### Instalação (primeira vez)

A partir da raiz do projeto:

```bash
cd Src
npm install
cd backend
npm install
cd ../frontend
npm install
cd ..
```

Isso garante que todas as dependências do:

* Backend
* Frontend
* Arquivo principal (concurrently)

sejam instaladas corretamente.

---

## Executar o Projeto

Após instalar tudo, basta:

```bash
cd Src
npm run dev
```

Esse único comando:

* Inicia o backend na porta 3000
* Inicia o frontend na porta 5173
* Exibe os dois logs no mesmo terminal

---

## Acessar a Aplicação

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:3000
```

Documentação com Swagger:

```
http://localhost:3000/docs/
```

---

Desenvolvido por Henrique Fleith
