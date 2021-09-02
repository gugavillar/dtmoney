# dt.money

![Imagem inicial da aplicação](/assets/inicio.png)

## Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- React
- TypeScript
- Styled Components
- Firebase

## Como executar

Clone o projeto e acesse a pasta do mesmo.

```
$ git clone https://github.com/gugavillar/dtmoney
$ cd dtmoney
```

Para iniciá-lo, siga os passos abaixo:

```
# Instalar as dependências
$ yarn

# Iniciar o projeto
$ yarn start
```

O app estará disponível no seu browser pelo endereço http://localhost:3000.

Depois que o app estiver rodando é necessário criar um novo projeto dentro do <a target="_blank" href="https://console.firebase.google.com/u/0/">firebase</a> e adicionar as configuração dentro do arquivo .env.local com os nomes definidos dentro do arquivo firebase.ts que está localizado dentro do diretório services.

## 💻 Projeto

O dtmoney é um projeto para quem quer controlar os seus gastos com ele é possível cadastrar as transações de entrada e as transações de saída.

Nesse projeto foi possível aprender sobre realização de login com conta google usando o firebase.
Também armazenamento de dados dentro do realtime database do firebase, onde cada transação é armazenada dentro da chave do uid do usuário logado.

Esse foi um projeto realizado dentro do Ignite da Rocketseat.
