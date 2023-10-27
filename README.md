# API REST
Esta é uma API REST que implementa uma carteira virtual com as funcionalidades de realização de transações, consulta de saldos e extratos.

## *Funcionalidades*
A API apresenta a seguinte estrutura:

### Carteiras

| Ação                                    	   | Mapeamento da URL        	           |
|----------------------------------------------|---------------------------------------|
| Consultar saldo de uma carteira              | **GET**    /carteiras/:id/saldo       |
| Consultar extrato de uma carteira        	   | **GET**    /carteiras/:id/extrato/    |
| Realizar uma transação com a carteira        | **POST**   /carteiras/:id/transacao/  |


## *Requisitos para Execução*
- Node.js 
- npm
- Docker

## *Execução*
1. Clone este repositório:
   git clone https://github.com/masassuncao/sistema-carteira-virtual

2. Instale as dependências:
   npm install

3. Configure o arquivo .env com os valores desejados. <br>
   Atenção: O arquivo .env encontra-se preenchido com valores default não devendo ser utilizado em produção.

3. Inicie o servidor:
   npm start

4. O servidor estará em execução, bastando acessar o seguinte endereço:
   http://localhost:3001


## *Transações*

Para realizar uma transação, basta enviar uma requisição **POST** para a rota ***"/carteiras/:id/transacao/"***. Deverão ser enviadas as seguintes informações no body da requisição em um objeto json:

```
 {
    "idCarteira": "id da carteira",
    "valorTransacao": Número ponto flutuante com duas casas decimais,
    "naturezaTransacao": "credito" ou "debito"
 }
```
<br>

## *Criação e Exclusão de Carteiras*

A criação e a exclusão de carteiras são realizadas por meio de eventos. Para criar ou excluir uma carteira, deverá ser enviada uma mensagem para a fila MQ direcionada à funcionalidade desejada. A mensagem deverá estar no formato json, contendo o id da carteira a ser criada ou excluída. Por padrão, as filas MQ possum os nomes abaixo, podendo esses nomes serem alterados no arquivo de enviroments da aplicação.

~~~
Fila para criação de nova carteira           ==> 'filaCriarCarteiras'
Fila para exclusão de uma carteira existente ==> 'filaExcluirCarteiras'
~~~


## *Rotas*

### Carteiras

 - GET    /carteiras/:id/saldo           -> Consultar saldo de uma carteira
 - GET    /carteiras/:id/extrato/        -> Consultar extrato de uma carteira
 - POST   /carteiras/:id/transacao/      -> Realizar uma transação com a carteira

