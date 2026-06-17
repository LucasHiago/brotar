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

## Comunicação: Wi-Fi (decidido)

✅ **(2026-06-16)** O sensor fica **fixo na terra 24/7** e envia as leituras **direto pela
Wi-Fi** para a nuvem, sem depender do celular por perto.

```
Sensor (ESP32 + Wi-Fi) ──▶ Nuvem ──▶ App
       fixo, 24/7
```

- ➕ Cada árvore reporta sozinha, continuamente.
- ➖ Exige Wi-Fi com alcance até a árvore (avaliar repetidor/antena no quintal/pomar).
- ➖ Wi-Fi ligado o tempo todo consome energia → reforça solar/tomada (ver hardware).

> Alternativas descartadas por ora: BLE (precisaria do celular como ponte) e LoRa
> (mais caro/complexo) — podem voltar como opção futura para áreas sem Wi-Fi.

## Camadas (proposta inicial)

### App (mobile) — definido
- ✅ **React Native / Expo**, seguindo a stack do Steply (`specialist-app`):
  Expo SDK 52 + **expo-router** + **TypeScript** + **Zustand** + **lucide-react-native**.
- Esqueleto em [`mobile/`](../mobile/): lista de árvores, detalhe e o **motor de avaliação**
  (`mobile/lib/species.ts`) que aplica as faixas por espécie.
- Responsável por: UI, notificações, cache offline; consumir leituras da nuvem.

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

- **2026-06-16** — Sensor **fixo 24/7** por árvore frutífera.
- **2026-06-16** — Comunicação por **Wi-Fi** (sensor → nuvem direto).
- **2026-06-16** — Grandezas do MVP: **umidade + NPK + pH + luz** (+ temperatura).
- **2026-06-16** — Avaliação **por espécie** (faixas ideais por frutífera) → catálogo de
  espécies é núcleo do MVP, não item futuro.
- **2026-06-16** — App **só orienta** (não atua) nesta fase.
- **2026-06-16** — Projeto **pessoal / open source**.
- **2026-06-17** — App em **React Native / Expo** (stack do Steply). Esqueleto em `mobile/`.

Pendentes: backend (Supabase vs do zero), alimentação do sensor (solar vs tomada),
montar vs sensor pronto. Ver [open-questions.md](open-questions.md).
