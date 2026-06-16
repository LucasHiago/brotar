# Visão

## Problema

Quem cuida de plantas e árvores frutíferas (em casa, quintal, horta ou pequeno pomar)
geralmente cuida "no achismo": não sabe se o solo está seco ou encharcado, se falta
nutriente, se o pH está adequado. O resultado é planta que não vinga, frutífera que não
produz, adubo aplicado errado e desperdício de água.

## Solução

Um **sensor físico** que a pessoa coloca na terra mede as condições reais do solo e envia
para o **app Brotar**, que:

1. mostra o estado atual de cada planta de forma simples (verde / atenção / crítico);
2. explica em linguagem acessível o que cada número significa;
3. recomenda ações concretas ("regue hoje", "adube com NPK", "o solo está ácido demais");
4. avisa por notificação quando algo precisa de atenção.

## Foco: árvores frutíferas, uma a uma

O cuidado é **por árvore frutífera**. Cada árvore tem seu próprio sensor fixo na terra,
porque o que é ideal para uma não é para outra: **calcário (pH) e luz do sol que fazem
bem a uma frutífera podem prejudicar outra**. Por isso o app precisa avaliar cada leitura
**em relação à espécie daquela árvore**, não com um padrão único.

## Público-alvo

- **Primário:** pessoas com árvores frutíferas em casa, quintal ou pequeno pomar que querem
  cuidar melhor sem ser especialistas (hobby, autossuficiência).
- **Secundário (futuro):** hortas, ornamentais, agricultura urbana.

## Natureza do projeto

Projeto **pessoal** e **open source** (ver `LICENSE`). Sem fins comerciais por enquanto.

## Objetivos do produto

- Reduzir a "adivinhação": substituir o achismo por dados reais do solo.
- Traduzir dados técnicos em **ações simples**.
- Criar histórico para a pessoa entender a evolução de cada planta ao longo do tempo.

## Não-objetivos (por enquanto)

- Não é uma estação meteorológica completa.
- Não é automação de irrigação (abrir/fechar válvula) — foco inicial é **medir e orientar**,
  não atuar. (Decidido em 2026-06-16; pode virar objetivo futuro.)
- Não é rede social de jardinagem.

## Princípios

- **Simples primeiro:** alguém sem conhecimento técnico tem que entender na primeira tela.
- **Acionável:** todo dado vem com um "e daí, o que eu faço?".
- **Offline-tolerante:** o sensor e o app devem funcionar mesmo com internet instável.
