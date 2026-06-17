# Brotar — App (mobile)

App React Native do Brotar. Segue as **mesmas convenções do Steply** (`specialist-app`):
**Expo SDK 52 + expo-router + TypeScript (strict) + Zustand + lucide-react-native**.

## Rodar

```sh
cd mobile
npm install
npm start        # abre o Expo (use o app Expo Go ou um dev build)
```

> Por enquanto roda com **dados de exemplo** (`lib/mock.ts`), sem backend
> (`USE_MOCK = true` em `lib/config.ts`). Não precisa de servidor para testar a UI.

## Estrutura (padrão Steply)

```
mobile/
├── app/                 # rotas (expo-router, file-based)
│   ├── _layout.tsx      # Stack + tema
│   ├── index.tsx        # "Minhas árvores" (lista + status)
│   └── plant/[id].tsx   # detalhe: leituras x faixa da espécie + recomendações
├── lib/
│   ├── theme.ts         # design system (paleta verde) — espelha o do Steply
│   ├── types.ts         # tipos do domínio (Plant, Reading, Species...)
│   ├── species.ts       # MOTOR: avalia leitura x espécie e gera recomendações
│   ├── status.ts        # cores/rótulos de status
│   ├── api.ts           # wrapper de fetch (mesmo estilo do Steply) + mock
│   ├── store.ts         # Zustand + persist (AsyncStorage)
│   ├── config.ts        # BACKEND_URL / USE_MOCK
│   ├── mock.ts          # dados de exemplo (ok/atenção/crítico)
│   └── data/species.json # cópia do catálogo (gerada via `make sync-catalog`)
├── app.json  babel.config.js  tsconfig.json  package.json
```

## O coração: `lib/species.ts`

É onde o catálogo vira utilidade. Dada uma leitura e a **espécie** da árvore:

- `evaluate(reading, species)` → status de cada grandeza (🟢/🟡/🔴);
- `overallStatus(evals)` → status geral da árvore;
- `recommend(reading, species)` → ações ("regar", "corrigir pH", "ajustar luz").

A regra do **calcário é por espécie**: se o pH está baixo, só sugere calagem quando
`calcario_resposta != 'evitar'`. Ex.: aceroleira recebe a sugestão; jabuticaba/café não.

## Fonte do catálogo

`lib/data/species.json` é uma **cópia** de `../data/species/catalog.json` (fonte única).
Para sincronizar após editar o catálogo:

```sh
make sync-catalog     # a partir da raiz do repo
```
