# Roadmap

## Fase 0 — Planejamento (atual)
- [x] Criar repositório e estrutura de docs
- [x] Sensor fixo 24/7, comunicação **Wi-Fi** (decidido 2026-06-16)
- [x] Grandezas do MVP: **umidade + NPK + pH + luz**, avaliadas **por espécie**
- [x] Projeto pessoal / open source (LICENSE adicionada)
- [ ] Definir alimentação do sensor (solar vs tomada)
- [ ] Definir: montar (ESP32) vs sensor pronto de mercado
- [ ] Escolher stack do app (Expo/Flutter) e backend (Supabase/do zero)
- [ ] Montar o catálogo inicial de espécies + faixas ideais (frutíferas alvo)

## Fase 1 — Protótipo de hardware
- [ ] Montar protótipo do sensor (ESP32 + sensores) numa protoboard
- [ ] Conseguir ler umidade/temperatura/NPK/pH e imprimir no serial
- [ ] Enviar uma leitura para um endpoint de teste

## Fase 2 — Backend mínimo
- [ ] API para receber e armazenar leituras
- [ ] Modelo de dados implementado
- [ ] Motor de regras → primeira recomendação simples

## Fase 3 — App MVP
- [ ] Login + cadastro de planta
- [ ] Parear sensor com planta
- [ ] Tela de detalhe com leituras e status
- [ ] Notificação de alerta crítico

## Fase 4 — Validação
- [ ] Testar com plantas reais por algumas semanas
- [ ] Ajustar faixas ideais e mensagens
- [ ] Decidir próximos passos (catálogo de espécies, múltiplos sensores, etc.)
