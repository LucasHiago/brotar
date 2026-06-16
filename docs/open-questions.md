# Perguntas em aberto

Decisões já tomadas ficam marcadas com ✅ e data. O resto segue em aberto.

## Produto
1. Foco inicial: **uso doméstico** ou **pequeno produtor/pomar**? → _em aberto_
   (Como o sensor é por árvore frutífera, serve tanto pra quintal quanto pra pomar pequeno.)
2. ✅ **(2026-06-16) Sensor fixo na terra 24/7.** Mede continuamente.
3. Quantas árvores/sensores no começo? → _em aberto_ (provavelmente várias árvores frutíferas).
4. ✅ **(2026-06-16) Por enquanto só orienta** (não atua). Atuar fica como ideia futura.

## Hardware
5. ✅ **(2026-06-16) Grandezas obrigatórias: umidade + nutrientes (NPK) + pH + luz.**
   Motivo do usuário: calcário (pH) e luz do sol são bons para uma frutífera e ruins
   para outra → o app precisa avaliar isso **por espécie**, então essas leituras entram
   já no MVP. ⚠️ Atenção à precisão/custo dos sensores de NPK e pH (ver sensors.md).
6. ✅ **(2026-06-16) Comunicação por Wi-Fi.** Sensor envia sozinho para a nuvem.
7. Alimentação: bateria, **solar** ou tomada? → _em aberto_.
   (Sensor fixo + Wi-Fi 24/7 consome bastante → solar ou tomada são fortes candidatos.)
8. Fabricar/montar (ESP32) ou usar sensor pronto de mercado? → _em aberto_.

## Software
9. App: **React Native/Expo** ou **Flutter**? → _em aberto_.
10. Backend: do zero ou **Supabase/Firebase**? → _em aberto_.
11. Precisa de offline robusto? → _em aberto_ (com Wi-Fi fixo, menos crítico).

## Negócio
12. ✅ **(2026-06-16) Projeto pessoal, pode ser open source.** → adicionar LICENSE.
13. Orçamento para hardware? → _em aberto_.

---
## Direção do MVP (consolidada)

- **Árvores frutíferas**, cada uma com seu sensor **fixo 24/7** medindo
  **umidade + NPK + pH + luz**, enviando por **Wi-Fi**.
- App **orienta** (não atua) com base em **faixas ideais por espécie**
  (porque calcário/pH e luz variam de frutífera para frutífera).
- Projeto **pessoal / open source**.

> Por isso o **catálogo de espécies + faixas ideais** (antes "v2") virou **núcleo do MVP**:
> sem saber a espécie, o app não sabe se o pH/luz/nutriente está bom ou ruim.

### Ainda falta decidir
- Alimentação do sensor (solar vs tomada) — pergunta 7.
- Montar (ESP32) vs sensor pronto — pergunta 8.
- Stack do app (Expo/Flutter) e backend (Supabase/do zero) — perguntas 9 e 10.
