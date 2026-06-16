# Arquitetura (rascunho)

Visão de alto nível dos três blocos: **sensor físico → nuvem → app**.

```
┌─────────────────┐     ┌──────────────────────┐     ┌─────────────────┐
│  SENSOR (solo)  │     │       NUVEM          │     │      APP        │
│                 │     │                      │     │   (celular)     │
│ • umidade       │     │ • API / ingestão     │     │ • lista plantas │
│ • temperatura   │ ──▶ │ • banco de dados     │ ──▶ │ • detalhe       │
│ • NPK           │     │ • motor de regras    │     │ • gráficos      │
│ • pH            │     │ • notificações push  │     │ • alertas       │
│ • luz           │     │                      │     │ • recomendações │
└─────────────────┘     └──────────────────────┘     └─────────────────┘
      │  microcontrolador            ▲   ▲
      │  (ESP32 / similar)           │   │
      └── Wi-Fi / BLE ───────────────┘   └─── push (FCM/APNs)
```

## Caminhos de comunicação a decidir

O sensor pode falar com a nuvem de algumas formas — a escolha muda custo, alcance e UX:

1. **Sensor → Wi-Fi → Nuvem** (ESP32 com Wi-Fi)
   - ➕ não precisa do celular por perto; envia sozinho.
   - ➖ depende de Wi-Fi no local da planta (quintal/pomar pode não ter).

2. **Sensor → Bluetooth (BLE) → App → Nuvem**
   - ➕ funciona sem Wi-Fi no local; celular faz a ponte.
   - ➖ só sincroniza quando a pessoa chega perto com o celular.

3. **Sensor → LoRa/gateway → Nuvem** (`[futuro]`)
   - ➕ longo alcance, ideal para pomar/área grande.
   - ➖ mais complexo e caro.

> **Decisão pendente** — ver [open-questions.md](open-questions.md).

## Camadas (proposta inicial)

### App (mobile)
- Candidatos: **React Native / Expo** ou **Flutter** (já há `flutter` e `.expo` na máquina).
- Responsável por: UI, pareamento via BLE (se aplicável), notificações, cache offline.

### Backend / nuvem
- API REST (ou GraphQL) para receber leituras e servir o app.
- Banco: relacional (Postgres) — dados são bem estruturados (ver data-model).
- Para séries temporais de leituras, avaliar tabela particionada ou TimescaleDB.
- Motor de regras: gera recomendações a partir de leitura × faixa ideal.
- Serviço de notificações push (FCM/APNs).
- Candidatos gerenciados p/ acelerar MVP: Supabase / Firebase.

### Firmware (sensor)
- Microcontrolador **ESP32** (tem Wi-Fi + BLE, barato, comum) — há `Arduino`/`.arduino15`
  na máquina, então dá pra prototipar.
- Lê sensores → empacota → envia em intervalos (ex.: a cada X horas) → dorme (economia).

## Decisões de arquitetura (registro)

Conforme formos decidindo, anotar aqui (data + decisão + motivo). Por enquanto: **nada
fechado** — tudo é proposta.
