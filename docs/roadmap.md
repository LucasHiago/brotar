# Roadmap

## Fase 0 — Planejamento (atual)
- [x] Criar repositório e estrutura de docs
- [x] Sensor fixo 24/7, comunicação **Wi-Fi** (decidido 2026-06-16)
- [x] Grandezas do MVP: **umidade + NPK + pH + luz**, avaliadas **por espécie**
- [x] Projeto pessoal / open source (LICENSE adicionada)
- [ ] Definir alimentação do sensor (solar vs tomada)
- [ ] Definir: montar (ESP32) vs sensor pronto de mercado
- [ ] Escolher stack do app (Expo/Flutter) e backend (Supabase/do zero)
- [x] Montar o catálogo inicial de espécies + faixas ideais (12 frutíferas) → `data/species/`
- [ ] Validar as faixas do catálogo com fontes agronômicas (Embrapa) e ampliar a lista

## Fase 1 — Protótipo de hardware
- [ ] Montar protótipo do sensor (ESP32 + sensores) numa protoboard
- [ ] Conseguir ler umidade/temperatura/NPK/pH e imprimir no serial
- [ ] Enviar uma leitura para um endpoint de teste

## Fase 2 — Backend mínimo
- [x] Stack definida: NestJS (padrão Steply) — esqueleto em `backend/`
- [x] Modelo de dados implementado (entidades User/Plant/Device/Reading)
- [x] API para receber e armazenar leituras (`POST /api/readings`)
- [x] Motor de regras no servidor (`GET /api/plants/:id/status`)
- [x] Auth JWT (register/login/me) + CRUD de árvores + pareamento de sensor
- [ ] `npm install` + subir um Postgres e testar de ponta a ponta
- [ ] Trocar auth do sensor (hoje só serial) por token por device
- [ ] Notificações push em alerta crítico

## Fase 3 — App MVP
- [x] Stack definida: React Native / Expo (padrão Steply) — esqueleto em `mobile/`
- [x] Tela "Minhas árvores" (lista + status por espécie)
- [x] Tela de detalhe com leituras x faixa + recomendações
- [x] Motor de avaliação no app (`mobile/lib/species.ts`)
- [ ] Login + cadastro de árvore (hoje usa dados mock)
- [ ] Parear sensor com árvore
- [ ] Conectar no backend real (tirar o USE_MOCK)
- [ ] Notificação de alerta crítico

## Fase 4 — Validação
- [ ] Testar com plantas reais por algumas semanas
- [ ] Ajustar faixas ideais e mensagens
- [ ] Decidir próximos passos (catálogo de espécies, múltiplos sensores, etc.)
