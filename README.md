# :bank: ApiRest Cubos Bank
Projeto de ApiRest de um banco, realizado no curso de Backend da CubosAcademy, consiste em criar endpoints de manipulação de contas de usuários e transações bancárias realizadas. Utiliza biblioteca express() e nodemon, feito em JavaScript com Node.JS

## :computer: Linguagens e Ferramentas
![Skills](https://skillicons.dev/icons?i=nodejs,js,express,nodemon)

## :red_circle: EndPoints Contas
<img src="https://user-images.githubusercontent.com/107645697/272125436-75533497-ef6a-4b94-9dff-8bac45a31504.png" width="150px" />

- GET /contas - Listar contas
  
  <img src="https://user-images.githubusercontent.com/107645697/272125443-e855446c-81d9-44ad-843d-ce9a4ac97f59.png" width="500px" />
  
- POST /contas - Criar conta
  
  <img src="https://user-images.githubusercontent.com/107645697/272125446-0c7d981d-3a6c-4d3b-a0ab-8ad3cc85ed46.png" width="500px" />
    
- PUT /contas/:numeroConta/usuario - Atualizar conta

  <img src="https://user-images.githubusercontent.com/107645697/272125433-96f10dfd-16a4-4bba-b703-c2c12ef307d0.png" width="500px" />
    
- DELETE /contas/:numeroConta - Deletar conta
    
  <img src="https://user-images.githubusercontent.com/107645697/272130330-dab28043-6863-4b2d-95d3-e3f137f2f2d9.png" width="500px" />

- GET /contas/saldo - Consultar saldo

  <img src="https://user-images.githubusercontent.com/107645697/272125445-4a78b155-8b79-4e6f-8cf1-0be2f3ade8b1.png" width="500px" />

- GET /contas/extrato - Consultar extrato de transações

  <img src="https://user-images.githubusercontent.com/107645697/272125438-e0ef02d8-3a4a-4088-b66f-f6197b95d674.png" width="500px" />
  <img src="https://user-images.githubusercontent.com/107645697/272125440-85cd2abf-1876-465a-b517-5e66eca51d7b.png" width="500px" />

  ## 🔴 Endpoints Transições

- POST /transacoes/depositar - Depositos

  <img src="https://user-images.githubusercontent.com/107645697/272125447-b8beefd3-ea05-417e-90a6-25a5580283ab.png" width="500px" />

- POST /transacoes/sacar - Saques

  <img src="https://user-images.githubusercontent.com/107645697/272125428-0277b6cb-342c-4fb1-a766-f58476c08f0d.png" width="500px" />

- POST /transacoes/transferir - Transferencias

  <img src="https://user-images.githubusercontent.com/107645697/272125431-ae736e0c-278c-4cab-a3bc-21b7068a7891.png" width="500px" />

## :computer: Rodando o Projeto

```shell
# 1. Clone o projeto

  git clone <git@github.com:SabrinaNovaes/CubosAcademy_ApiBank-M02.git> - SSH
  git clone <https://github.com/SabrinaNovaes/CubosAcademy_ApiBank-M02.git> - HTTPS

# 2. Instale as dependências

  npm install express
  npm intall -D nodemon

# 3. Execute o backend

  npm run dev

```

### :star2: Contribua com o projeto

- Realize o Fork
- Faça as modificações necessárias
- Realize a Pull Request (PR)

### :writing_hand: Autor

Sabrina Novaes
