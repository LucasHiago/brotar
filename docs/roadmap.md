# Roadmap

## Fase 0 — Planejamento (atual)
- [x] Criar repositório e estrutura de docs
- [ ] Fechar respostas de [open-questions.md](open-questions.md)
- [ ] Definir escopo final do MVP
- [ ] Escolher sensores e forma de comunicação (Wi-Fi vs BLE)
- [ ] Escolher stack do app e do backend

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
