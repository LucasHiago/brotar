# Hardware — Sensores

Notas sobre o que medir, como medir e quais peças usar. Tudo a confirmar na Fase 0/1.

## Grandezas e por que importam

| Grandeza | O que indica | Importância | Custo do sensor |
|---|---|---|---|
| **Umidade do solo** | Se precisa regar | ⭐⭐⭐ alta | 💲 baixo |
| **Temperatura do solo** | Estresse térmico, germinação | ⭐⭐ média | 💲 baixo |
| **NPK (nitrogênio, fósforo, potássio)** | "Vitaminas" da planta — quando adubar | ⭐⭐⭐ alta | 💲💲💲 alto |
| **pH do solo** | Disponibilidade de nutrientes | ⭐⭐ média/alta | 💲💲 médio |
| **Luz** | Se a planta recebe sol suficiente | ⭐ média | 💲 baixo |
| **Condutividade (EC)** | Salinidade / fertilidade geral | ⭐ opcional | 💲💲 médio |

> Observação: o que você chamou de "vitamina" do solo geralmente corresponde ao **NPK**
> (e a outros nutrientes). É a leitura mais valiosa e, infelizmente, a mais cara/difícil
> de medir com precisão em sensor barato — por isso é forte candidata a entrar só na v2.

## Candidatos de componentes (a avaliar)

### Cérebro
- **ESP32** — Wi-Fi + Bluetooth, baixo consumo, barato. Forte candidato.
  (Alternativas: ESP8266 só Wi-Fi; Arduino + módulo de rádio.)

### Sensores
- **Umidade do solo:** capacitivo (melhor que o resistivo, não corrói tão rápido).
- **Temperatura:** DS18B20 (à prova d'água) ou via sensor de umidade combinado.
- **NPK:** sondas NPK RS485/Modbus (caras; muitas são genéricas e imprecisas — validar).
- **pH:** sonda de pH de solo (calibração é um desafio).
- **Luz:** BH1750 (lux) ou LDR simples.
- **EC:** sensor de condutividade (opcional).

> ⚠️ Sensores baratos de NPK e pH têm **precisão questionável**. Antes de prometer essas
> leituras no app, vale testar o quanto são confiáveis na prática.

## Energia
- Bateria 18650 + carregador, possivelmente com **painel solar** se o sensor ficar fixo no sol.
- Estratégia de **deep sleep**: acorda, mede, envia, dorme — para durar semanas/meses.

## Pareamento sensor ↔ planta
- Cada sensor tem um número de série; no app a pessoa associa "este sensor = esta planta".
- Definir o fluxo conforme a comunicação escolhida (QR code? BLE scan? digitar código?).

## Próximos passos de hardware
1. Decidir Wi-Fi vs BLE (ver [open-questions.md](../docs/open-questions.md)).
2. Comprar/levantar 1 ESP32 + sensor capacitivo de umidade para o primeiro protótipo.
3. Validar leitura de umidade antes de investir em NPK/pH.
