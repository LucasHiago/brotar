# Perguntas em aberto

Decisões que precisamos fechar para travar o escopo do MVP. (Marcar a resposta quando
decidir, com data.)

## Produto
1. O foco inicial é **uso doméstico** (varanda/quintal) ou já mira **pequeno produtor/pomar**?
2. O sensor fica **fixo na terra 24/7** ou a pessoa **espeta, mede e tira**?
   (Muda tudo: bateria, comunicação, robustez.)
3. Quantas plantas/sensores uma pessoa típica teria no começo? (1? 5? 20?)
4. O app só **orienta** ou no futuro também **atua** (liga irrigação)?

## Hardware
5. Quais grandezas são **obrigatórias** no MVP?
   (Umidade é a mais barata e impactante. NPK e pH bons são bem mais caros.)
6. Comunicação: **Wi-Fi** (sensor envia sozinho) ou **Bluetooth** (celular faz a ponte)?
7. Alimentação: **bateria** (quanto tempo precisa durar?), **solar** ou **tomada**?
8. Vamos **fabricar/montar** o sensor ou usar um **sensor pronto** de mercado e focar no app?

## Software
9. App: **React Native/Expo** ou **Flutter**? (ambos disponíveis na máquina)
10. Backend: subir do zero ou usar **Supabase/Firebase** para acelerar o MVP?
11. Precisa funcionar **offline** de forma robusta? Quão importante?

## Negócio (pode ficar pra depois)
12. É projeto **pessoal/hobby**, **open source** ou **produto comercial**?
13. Tem orçamento previsto para os componentes de hardware?

---
> Sugestão de ponto de partida do MVP (a confirmar): uso doméstico, sensor fixo medindo
> **umidade + temperatura** via **Wi-Fi (ESP32)**, app em Expo, backend no Supabase,
> recomendações só de rega. NPK/pH entram numa segunda versão por causa do custo.
