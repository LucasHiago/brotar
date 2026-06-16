# Modelo de dados (rascunho)

Esboço inicial das entidades. Vai mudar conforme o escopo fechar.

## Entidades

### User
- `id`
- `nome`
- `email`
- `criado_em`

### Plant (planta)
- `id`
- `user_id` → User
- `apelido` (ex.: "Limoeiro da varanda")
- `especie_id` → Species (opcional no MVP)
- `local` (texto livre: "quintal", "vaso da sala")
- `foto_url`
- `criado_em`

### Species (espécie) — `[MVP]`
Catálogo com as faixas ideais de cada grandeza. **Núcleo do MVP**: sem a espécie da árvore,
o app não sabe avaliar se pH/luz/NPK/umidade estão bons (varia por frutífera).
- `id`
- `nome_popular` / `nome_cientifico`
- `tipo` (frutífera, hortaliça, ornamental…)
- `faixas_ideais` → ver IdealRange

### Device (sensor físico)
- `id`
- `user_id` → User
- `plant_id` → Plant (sensor pareado a uma planta)
- `numero_serie`
- `bateria_pct`
- `ultima_sincronizacao`
- `firmware_versao`

### Reading (leitura)
Uma medição enviada pelo sensor.
- `id`
- `device_id` → Device
- `plant_id` → Plant
- `medido_em` (timestamp da medição)
- `recebido_em` (timestamp de chegada na nuvem)
- **grandezas medidas:**
  - `umidade_solo` (%)
  - `temperatura_solo` (°C)
  - `nitrogenio_n` / `fosforo_p` / `potassio_k` (NPK)
  - `ph`
  - `luz` (lux ou índice)
  - `condutividade_ec` (opcional — salinidade/fertilidade)

### IdealRange (faixa ideal)
Define o que é "ok" para cada grandeza (por espécie ou padrão).
- `grandeza` (ex.: `umidade_solo`)
- `min_ideal` / `max_ideal`
- `min_critico` / `max_critico`

### Recommendation (recomendação)
Gerada a partir de uma leitura vs. faixas ideais.
- `id`
- `plant_id` → Plant
- `reading_id` → Reading
- `tipo` (regar, adubar, corrigir_ph, mover_sol…)
- `severidade` (info / atenção / crítico)
- `mensagem` (texto amigável)
- `criada_em`

### CareLog (diário de cuidados) — `[v2]`
- `id`
- `plant_id` → Plant
- `tipo` (rega, adubação, poda, colheita…)
- `nota`
- `data`

## Relações (resumo)

```
User 1───* Plant 1───* Reading *───1 Device
              │
              ├───* Recommendation
              ├───* CareLog
              └───? Species ───* IdealRange
```

## Como nasce uma recomendação

```
Reading (dados do solo)  +  IdealRange (o que é ideal)
        └──────────────┬──────────────┘
                       ▼
              motor de regras
                       ▼
               Recommendation
        (mensagem amigável + severidade)
```
