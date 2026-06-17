# Catálogo de espécies

Fonte de verdade das **faixas ideais por espécie** de árvore frutífera — o núcleo do MVP.
O app compara cada leitura do sensor com a faixa da espécie da árvore para dizer se está
**ok / atenção / crítico** e gerar a recomendação.

- Dados: [`catalog.json`](catalog.json) (12 espécies para começar)
- Por que é central: como **pH (calcário) e luz que servem a uma frutífera prejudicam
  outra**, não dá para usar um padrão único — a avaliação é sempre relativa à espécie.

## ⚠️ Aviso sobre os números

As faixas são **indicativas**, para guiar o desenvolvimento. Elas variam por variedade,
clima, idade da planta, tipo de solo e pelo **sensor** usado. Antes de tratar como verdade:

- validar com fontes agronômicas (ex.: **Embrapa**, boletins de fruticultura);
- calibrar a **umidade** (sensor capacitivo barato dá valor relativo, não % absoluta);
- validar **NPK e pH** em campo (sensores baratos têm precisão limitada — ver
  [`../../hardware/sensors.md`](../../hardware/sensors.md)).

Por isso o NPK está em **demanda qualitativa** (baixa/média/alta), não em valor absoluto.

## Formato (por espécie)

```jsonc
{
  "id": "limoeiro",                  // chave estável (usada no banco/app)
  "nome_popular": "Limoeiro",
  "nomes_alt": ["Limão Taiti"],      // sinônimos para busca
  "nome_cientifico": "Citrus × latifolia",
  "grupo": "cítrica",                // agrupamento solto (cítrica, tropical, nativa...)
  "faixas": {
    "ph":  { "min_ideal", "max_ideal", "min_critico", "max_critico", "nota" },
    "umidade_solo_pct": { "min_ideal", "max_ideal", "min_critico", "max_critico", "nota" },
    "luz": { "categoria", "horas_sol_min", "nota" },
    "npk": {
      "n": { "demanda": "baixa|média|alta", "nota" },
      "p": { ... },
      "k": { ... }
    }
  },
  "calcario": "resumo prático: gosta/tolera calagem ou não",
  "observacoes": "texto livre"
}
```

### Como o app usa as faixas

```
valor < min_critico  ou  valor > max_critico   →  🔴 crítico
valor fora de [min_ideal, max_ideal]           →  🟡 atenção
valor dentro de [min_ideal, max_ideal]         →  🟢 ok
```

### Categorias de luz
- `sol_pleno` — 6h+ de sol direto.
- `sol_a_meia_sombra` — vai bem ao sol, mas tolera sombra parcial.
- `meia_sombra` — prefere sombra parcial.

## O ponto-chave: cada espécie é diferente

Exemplos do catálogo que mostram por que a avaliação **tem que ser por espécie**:

| Espécie | pH ideal | Calcário? | Luz |
|---|---|---|---|
| Aceroleira | 6,0–7,0 | ✅ **gosta** de cálcio/calagem | sol pleno |
| Figueira | 6,0–7,5 | ✅ tolera solo calcário/alcalino | sol pleno |
| Jabuticabeira | 5,0–6,0 | ❌ **evitar** — quer solo ácido | sol a meia-sombra |
| Cafeeiro | 5,0–6,0 | ❌ quer solo ácido | sol a meia-sombra |

> Ou seja: jogar calcário pode **ajudar** uma acerola e **prejudicar** uma jabuticaba no
> mesmo quintal. É exatamente isso que o Brotar resolve ao olhar a espécie de cada árvore.

## Como adicionar uma espécie

1. Acrescente um objeto novo em `especies[]` no `catalog.json`.
2. Use um `id` em minúsculas, sem acento (ex.: `pitangueira`).
3. Preencha as 4 grandezas (pH, umidade, luz, NPK) + `calcario` + `observacoes`.
4. Valide o arquivo:
   ```sh
   python3 -c "import json; json.load(open('data/species/catalog.json')); print('ok')"
   ```

## Próximas espécies candidatas
Pitangueira, jaboticaba híbridas, romãzeira, videira/uva, atemoia/pinha, caquizeiro,
cajueiro, lichia, amoreira, citros adicionais (mexerica/pomelo).
