# Brotar — Backend (API)

API NestJS do Brotar, seguindo as **convenções dos backends Steply**:
**NestJS 11 + TypeORM (Postgres, snake naming) + JWT (passport-jwt) + class-validator +
Swagger + @nestjs/config + bcryptjs**. Prefixo global `api`, `ClassSerializerInterceptor`
e `ValidationPipe` global.

## Rodar

```sh
cd backend
cp .env.example .env      # ajuste DB e JWT_SECRET
npm install
npm run start:dev         # http://localhost:3000/api  ·  docs em /api/docs
```

Precisa de um **Postgres** acessível (ver `.env`). Em dev, `DB_SYNC=true` cria as tabelas
automaticamente (não use em produção).

## Estrutura (padrão Steply: módulo por feature)

```
backend/src/
├── main.ts                 # bootstrap (prefixo api, validation, swagger, cors)
├── app.module.ts           # ConfigModule + TypeORM (snake naming) + módulos
├── config/                 # app / database / jwt (registerAs)
├── health.controller.ts    # GET /api/health
├── auth/                   # register, login, /me — JWT + bcrypt
├── users/                  # entidade User + service
├── species/                # catálogo (catalog.json) — GET /api/species[/:id]
├── plants/                 # CRUD de árvores (protegido)
├── devices/                # registrar e parear sensores
├── readings/               # ingestão do sensor + histórico
└── evaluation/             # MOTOR: leitura x faixa da espécie -> status/recomendações
```

## Endpoints principais

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/api/auth/register` | — | cria conta, retorna JWT |
| POST | `/api/auth/login` | — | login, retorna JWT |
| GET | `/api/auth/me` | JWT | dados do usuário |
| GET | `/api/species` | — | catálogo de espécies |
| GET | `/api/species/:id` | — | uma espécie + faixas |
| GET/POST/PATCH/DELETE | `/api/plants[...]` | JWT | árvores do usuário |
| POST | `/api/devices` | JWT | registrar sensor (serial) |
| POST | `/api/devices/:id/pair` | JWT | parear sensor com árvore |
| POST | `/api/readings` | serial | **ingestão do sensor** (ESP32 via Wi-Fi) |
| GET | `/api/plants/:id/readings` | JWT | histórico de leituras |
| GET | `/api/plants/:id/status` | JWT | **avaliação** (ok/atenção/crítico + o que fazer) |

## Motor de avaliação

`evaluation/rules.ts` é a **mesma lógica** de `mobile/lib/species.ts`, rodando no servidor:
avalia cada grandeza contra a faixa da espécie e gera recomendações. A regra do **calcário
é por espécie** (`calcario_resposta`): pH baixo só sugere calagem quando a espécie não a evita.

> Hoje a lógica está duplicada (app + backend) de propósito, para cada lado funcionar
> sozinho. Se virar incômodo, extrair para um pacote compartilhado.

## Fonte do catálogo

`src/species/catalog.json` é **cópia** de `../data/species/catalog.json` (fonte única),
sincronizada via `make sync-catalog` na raiz. O `nest-cli.json` copia o `.json` para `dist/`.

## Ingestão pelo sensor

O ESP32 faz `POST /api/readings` com `{ "serial": "...", "umidadeSoloPct": 55, "ph": 6.1, ... }`.
O backend localiza o sensor pelo serial, associa à árvore pareada e grava a leitura.
(MVP: autenticação do sensor é só o serial — endurecer depois com token por device.)
