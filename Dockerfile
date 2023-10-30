FROM node:16-alpine

LABEL mantainer="masassuncao"

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

COPY --chown=node:node . .

USER node

#Porta de execucao da aplicacao
ARG APPLICATION_PORT=3001
ENV APP_PORT=${APPLICATION_PORT}

#Configuracoes de conexao ao banco de dados
ENV ENV_DEPLOY 'production'
ENV DB_HOST 'localhost'
ENV DB_PORT 5432
ENV DB_NAME 'db_carteiras'
ENV DB_USER 'postgres'
ENV DB_PASSWORD 'Senha123'

#Configuracoes de conexao a MQ
ENV ENDERECO_HOST_MQ 'amqp://localhost'
ENV NOME_FILA_CRIAR_CARTEIRA 'filaCriarCarteiras'
ENV NOME_FILA_EXCLUIR_CARTEIRA 'filaExcluirCarteiras'

#Valor padrao de saldo inicial para novas carteiras
ENV SALDO_PADRAO_INICIAL 250

#Chave de criptografia das senhas
ENV SECRET_KEY 'LQVsMSV8KpO5hqPHKK3FPKUu5/rpzEfElvTrwCGwmxHW5Q13AbMIRtRo5EPkLnZnrDnJY/yUfz9XuOELRuwPHlbBaqziIkH7T7zvCzfKlUbkZXUKxO8n+DtVfcIn7JgeTIt6RefmtznrpXprT1Z3WarZyLY43EG3SK2/O5ziB6NlSsq37+4suTXbJQ5+ECiNZs2Fp1GJsyMzyzlUUDZfEtLIe4dSGyDhxypmMsWrVaK+8RB27LR2I5CV4EeDGl5rT7rOuJ0PLWBt4zAe/g0R2a6GcvWB6s+859esIdhoLnJQbLQ9J1Rs0U+eB3hxgBOGD4EvI3wabNoUPci26oy5iQ=='

EXPOSE ${APP_PORT}

CMD [ "node", "server.js" ]