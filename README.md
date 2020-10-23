<p align="center">
  <img src="https://github.com/gabriel-nt/GoBarber-Backend/blob/master/tmp/uploads/logo.svg" alt="GoBarber" />
</p>

<h1 align="center">
    🚀 GoBarber
</h1>
<p align="center">Backend da aplicação GoBarber</p>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=node&message=12.13.1&color=green&logo=node.js" />
  <img src="https://img.shields.io/static/v1?label=typescript&message=4.0.2&color=blue&logo=typescript" />
  <!--<img src="https://img.shields.io/badge/repo%20size-2.00%20MB-informational" />-->
  <img src="https://img.shields.io/badge/last%20commit-october-orange" />
  <img src="https://img.shields.io/badge/license-MIT-success"/>
</p>

<p align="center">
  <a href="#-features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-pré-requisitos">Pré-Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-rodando-o-back-end-servidor">Backend</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-bibliotecas">Bibliotecas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Lincença</a>
</p>

<h3 align="center"> 
🚧  Finalizado  🚧
</h3>

### 📌 Sobre 
O GoBarber é uma aplicação voltada para cabeleireiros.
Os usuários da aplicação, poderão realizar agendamentos para cortes de cabelos e afins de um prestador de serviços.
Já os profissionais do área, terão controle de todos os agendamentos que já foram marcados, recebendo notificações de novos agendamentos.

### 📎 Features

#### Agendamentos
- [x] Criação de Agendamento
- [x] Listagem de Agendamentos
- [x] Listagem de Prestadores de Serviços
- [x] Listagem de Dias Disponíveis para Agendamento
- [x] Listagem de Meses Disponíveis para Agendamento

#### Usuários
- [x] Login e Logout
- [x] Criação de Perfil
- [x] Listagem do Perfil
- [x] Atualização de Perfil
- [x] Atualização do Avatar
- [x] Alteração de Email

#### Gerais
- Cache
  - [x] Redis
- Upload de Imagens
  - [x] Amazon S3
  - [x] Disk Storage
- Envio de Emails
  - [x] Amazon SES
  - [x] Ethereal

### ⚙ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e/ou [Yarn](https://https://yarnpkg.com/)
Também, será necessário ter o [Docker](https://www.docker.com/) instalado e configurado em sua máquina.
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🧾 Configurando Docker
```bash

# Clone este repositório
$ git clone https://github.com/gabriel-nt/GoStack-Backend

# Crie o container do Postgres
$ docker run --name gobarber -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

# Crie o container do MongoDB
$ docker run --name mongodb -p 27017:27017 -d -t mongo

# Crie o container do Redis
$ docker run --name redis -p 6379:6379 -d -t redis:alpine 

````

### 🎲 Rodando o Back End (servidor)

```bash
# Instale as dependências
$ npm install ou yarn

# Rode as migrations
$ yarn typeorm migration:run

# Execute a aplicação em modo de desenvolvimento
$ yarn dev:server ou npm run dev

# Execute os testes
$ yarn test

# Execute os testes com Coverage
$ yarn test --coverage

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>
```

* Obs: Para executar os backend, crie um banco de dados.

### 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- Node.js
- TypeScript
- Postgres
- MongoDB
- Redis

### 📕 Bibliotecas

Esse projeto foi desenvolvido com o auxílio das seguintes libs:

- Express
- Jest
- TypeORM
- aws-sdk
- jwt
- nodemailer
- celebrate
- date-fns

### 📙 Arquitetura do Projeto

Para uma melhorar estrutura de projetos utilizamos das seguintes fundamentos:

- DDD
- TDD
- SOLID

###  📘 Padrão de Código

Para padronizar a escrita do código, utilizamos as seguinte ferramentas:

- Eslint
- Prettier
- EditorConfig

### 📝 Licença

Esse projeto está sob a licença MIT.

<hr/>

Feito por Gabriel Teixeira
