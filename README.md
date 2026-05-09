
# Crimson Inventory - Gestão de Estoque Lojas Cem

Este projeto nasceu de um desafio técnico real: criar uma solução robusta e intuitiva para o gerenciamento de produtos das **Lojas Cem**. Mais do que apenas um exercício de código, o **Crimson Inventory** foi construído focando em performance, segurança de dados e uma experiência de usuário fluida.

## Por que este projeto é especial?

Durante o desenvolvimento, priorizei a **Arquitetura Limpa (Clean Architecture)**. Isso significa que o código é fácil de manter e escalar. Se amanhã as Lojas Cem precisarem adicionar 10.000 novos produtos ou integrar com um sistema de logística, a base já está preparada.

### Principais diferenciais técnicos:

* **Segurança em primeiro lugar:** Utilizei o **Zod** no backend para garantir que nenhum dado inválido (como preços negativos ou nomes vazios) chegue ao banco de dados.
* **Interface "Dark Crimson":** Fugindo do óbvio, criei um design moderno que reduz o cansaço visual de quem opera o estoque o dia todo.
* **Backend Blindado:** O uso do **Fastify** com **Prisma ORM** garante respostas quase instantâneas, mesmo em operações complexas de banco de dados.

## O que usei para construir:

* **No "Cérebro" (Backend):** Node.js com TypeScript, Fastify e PostgreSQL.
* **Na "Pele" (Frontend):** React, Tailwind CSS (v4) e Axios para comunicação em tempo real.
* **Na Estrutura:** Prisma ORM para uma comunicação segura com o banco de dados.

## Como testar na sua máquina

Para rodar o projeto localmente, você vai precisar do Node.js instalado.

### 1. Preparando o Backend

```bash
cd backend
npm install
npx prisma migrate dev  # Para configurar o seu banco de dados
npm run dev

```

### 2. Ligando a Interface

```bash
cd frontend
npm install
npm run dev

```

---

## Considerações da Desenvolvedora

Este projeto foi um marco na minha jornada. Enfrentei e resolvi desafios reais de **CORS**, estruturação de **Controllers** e integração de ponta a ponta. Ele reflete minha dedicação em entregar não apenas algo que "funciona", mas que tenha uma parte de mim em cada código desse projeto.

**Desenvolvido por Maria Eduarda Moura de Campos**
---
