
# Sistema de Gerenciamento de Pedidos para Fornecedores

## Descrição do Desafio
Este sistema foi desenvolvido com o objetivo de permitir aos usuários (representando o setor de compras de uma empresa) as seguintes funcionalidades:

- Visualizar a lista de pedidos de fornecedores.
- Criar, atualizar e deletar pedidos.
- Visualizar o status dos pedidos e atualizá-los de acordo com os processos de compras (ex: "Pendente", "Em Andamento", "Concluído").

Este sistema simula funcionalidades semelhantes às encontradas em sistemas de ERP, como o SAP, usados para gerenciar processos de compras e fornecimento.

## Tecnologias Utilizadas
- **Backend**: Node.js com Express
- **Banco de Dados**: PostgreSQL com TypeORM
- **Frontend**: React com MaterialUI
- **Testes**: TDD (Test-Driven Development)
- **Docker**: Para facilitar a execução e o ambiente de testes
- **Nginx**: Usado como proxy reverso
- **AWS**: Para demonstrar habilidades com cloud
- **Versionamento**: Docker Compose

## Estrutura do Projeto
O projeto está dividido seguindo os princípios da Clean Architecture, com a seguinte estrutura:

```bash
src/
├── core/                # Casos de uso e lógica de negócio
├── data/                # Interação com banco de dados (TypeORM)
├── domain/              # Entidades e regras de negócio
└── presentation/        # Frontend (React)
```

## Como Executar o Sistema

### Pré-requisitos
- **Docker**: Instale o Docker para rodar o ambiente de desenvolvimento.
- **Node.js**: Certifique-se de ter o Node.js instalado para executar a parte do frontend.
- **PostgreSQL**: O banco de dados PostgreSQL será configurado automaticamente no Docker.

### Passos para Executar
1. Clone este repositório.
2. Navegue até a pasta do projeto.
3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```bash
POSTGRES_USER=usuario
POSTGRES_PASSWORD=senha
POSTGRES_DB=banco_de_dados
POSTGRES_PORT=5432
API_HOST=localhost
API_PORT=5000
ENVIRONMENT=LOCAL #ou PRODUCTION
```

4. Execute o comando abaixo para iniciar todos os containers via Docker Compose:

```bash
docker-compose up -d
```
