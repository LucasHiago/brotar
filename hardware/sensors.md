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
> (e a outros nutrientes).
>
> ✅ **(2026-06-16) Decisão:** umidade + **NPK** + **pH** + luz entram **já no MVP**, porque
> calcário (pH), luz e nutrientes precisam ser avaliados **por espécie** de frutífera.
> ⚠️ Risco assumido: sensores baratos de NPK e pH têm precisão limitada — a Fase 1 precisa
> **validar a confiabilidade** antes de o app prometer esses números.

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
Como o sensor é **fixo 24/7 com Wi-Fi**, o consumo é maior (Wi-Fi gasta bem mais que BLE).
Opções (decisão pendente — pergunta 7):
- **Painel solar + bateria 18650** — bom para árvore a céu aberto, sem fio até a tomada.
- **Tomada** — mais simples, se a árvore estiver perto de uma fonte de energia.
- Mesmo fixo, vale usar **deep sleep entre as medições** (ex.: mede a cada X minutos/horas
  e dorme entre elas) para o solar/bateria durar — leituras de solo mudam devagar.

## Pareamento sensor ↔ planta
- Cada sensor tem um número de série; no app a pessoa associa "este sensor = esta planta".
- Definir o fluxo conforme a comunicação escolhida (QR code? BLE scan? digitar código?).

## Próximos passos de hardware
1. ✅ Comunicação decidida: **Wi-Fi**, sensor fixo 24/7.
2. Montar protótipo: **ESP32 + umidade capacitivo + sonda NPK + pH + luz (BH1750)**.
3. **Validar precisão do NPK e do pH** (maior risco) antes de confiar no app.
4. Decidir alimentação: **solar** vs **tomada** (pergunta 7).
5. Decidir: **montar** (ESP32) vs **sensor pronto** de mercado (pergunta 8).
