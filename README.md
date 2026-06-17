# 🌱 Brotar

App para **controle e monitoramento de árvores frutíferas**, integrado a um
**sensor de solo fixo (24/7)** — um por árvore — que coleta umidade, nutrientes (NPK),
pH e luz e envia por **Wi-Fi**. Com base nessas leituras, o app orienta a pessoa sobre o
que fazer: quando regar, adubar, aplicar calcário, etc. — **avaliando cada valor conforme
a espécie da árvore**, já que pH e luz que fazem bem a uma frutífera prejudicam outra.

> Status: 📐 **Fase de planejamento.** Ainda não há código de produção — este repositório
> guarda a visão, o escopo, as decisões de arquitetura e o planejamento de hardware.
> Projeto **pessoal / open source** ([MIT](LICENSE)).

## Ideia em uma frase

> "Espeta o sensor na terra, abre o app, e ele te diz o que a planta está pedindo."

## Componentes do projeto

| Componente | O que é | Onde planejar |
|---|---|---|
| 📱 **App** | Onde a pessoa acompanha cada planta, recebe alertas e recomendações | [`docs/`](docs/) |
| 🔌 **Hardware** | Sensor físico que mede o solo e envia os dados | [`hardware/`](hardware/) |
| 🎨 **Design** | Fluxos de tela, identidade visual, UX | [`design/`](design/) |

## Mapa da documentação

- [`docs/vision.md`](docs/vision.md) — visão, problema, público-alvo e objetivos
- [`docs/features.md`](docs/features.md) — funcionalidades (MVP e futuro)
- [`docs/data-model.md`](docs/data-model.md) — entidades e dados coletados
- [`docs/architecture.md`](docs/architecture.md) — arquitetura app + hardware + nuvem
- [`docs/roadmap.md`](docs/roadmap.md) — fases e próximos passos
- [`hardware/sensors.md`](hardware/sensors.md) — sensores, grandezas medidas e candidatos
- [`docs/open-questions.md`](docs/open-questions.md) — decisões em aberto
- [`data/species/`](data/species/) — **catálogo de espécies + faixas ideais** (núcleo do MVP)

## Próximo passo

Definir, junto, as respostas de [`docs/open-questions.md`](docs/open-questions.md)
para fechar o escopo do MVP.
