#!/bin/bash

#Cria arquivo de configurações a partir do arquivo .env na raiz:
source .env

#Inicializa container docker com postgres:
echo Verificando a existência de container Docker em execução...
docker container stop $DB_CONTAINER_NAME
docker container stop $MQ_CONTAINER_NAME
wait
echo

echo Removendo container antigo...
docker rm -f $DB_CONTAINER_NAME
docker rm -f $MQ_CONTAINER_NAME
wait
echo

echo Criando novo container Docker...
docker run --name $DB_CONTAINER_NAME -e POSTGRES_PASSWORD=$DB_PASSWORD -e POSTGRES_USER=$DB_USER -e POSTGRES_DB=$DB_NAME -p $DB_PORT:5432 -d postgres
docker run --name $MQ_CONTAINER_NAME --hostname $MQ_HOSTNAME -p $MQ_PORT:5672 -d rabbitmq:3
sleep 10
echo

#Faz migrations da base de dados:
echo Realizando migrations da base de dados...
npx knex migrate:up --env production
echo Criando tabela de carteiras no banco de dados...
wait
npx knex migrate:up --env production
echo Criando tabela de transações no banco de dados...
wait
npx knex seed:run --env production
echo Populando tabelas do banco de dados...
wait
echo

#Inicializa a aplicação:
echo Inicializando aplicação...
node server.js
echo