# Instruções para execução do código
## Configs do banco de dados
Aconselho a utilização do banco de dados PostgreSQL, pois utilizo o uuid gerado automaticamente como chaves primárias das tabelas. Caso queira utilizar MySQL ou algum outro banco que não tenha suporte, é necessário mudar a config de PK nas migrations, nas entities e adequar a geração automática nos repositórios (principalmente nos fakes utilizandos para os testes unitários).

## Para rodar o projeto localmente
Primeiramente, utilize um gerenciador de pacotes de sua preferência para instalar as dependências, aconselhando o [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable), que é utilizado para o lock das versões de libs neste projeto.

Para instalar as dependências utilizando yarn, rode o comando no seu terminal de escolha (caso esteja utilizando windows, sugiro a utilização do [git bash](https://git-scm.com/downloads)).

```yarn```

Com as dependências instaladas, copie o arquivo `.env.example` para seu `.env`

```cp .env.example .env```

Configure as variáveis de ambiente, escolhendo a porta na qual será disponibilizado seu projeto, bem como um secret para a geração de tokens. Preencha também as informações do seu host de banco de dados.

Por fim, utilize 

```yarn dev:server```

para servir o projeto localmente. 

## Considerações finais

Este projeto é apenas um passatempo que utilizei há um tempo para estudar alguns design patterns com DDD, sendo uma mistura de algumas sugestões e referências de amigos pelo discord.

Sei que algumas libs já foram atualizadas e algumas configs podem estar não tão adequadas, mas quaisquer sugestões ou dúvidas que surgirem, entrem em [contato](https://linkedin.com/in/ivandersr)!

### Muito Obrigado! :)

