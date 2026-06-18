# Brotar — tarefas do projeto (fase de planejamento)
# Uso: `make` (ajuda) ou `make <alvo>`

CATALOG     := data/species/catalog.json
APP_CATALOG := mobile/lib/data/species.json
API_CATALOG := backend/src/species/catalog.json
PY          := python3

.DEFAULT_GOAL := help
.PHONY: help validate species stats tree todo decisions check overview sync-catalog catalog-synced

help: ## Lista os alvos disponíveis
	@echo "Brotar — alvos disponíveis:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

validate: ## Valida o catálogo de espécies (JSON)
	@$(PY) -c "import json; json.load(open('$(CATALOG)')); print('OK: $(CATALOG) é JSON válido')"

species: ## Lista as espécies do catálogo (pH, luz, calcário)
	@$(PY) -c "import json; d=json.load(open('$(CATALOG)')); \
print('%-16s %-9s %-18s %s' % ('ESPÉCIE','pH','LUZ','CALCÁRIO')); \
print('-'*70); \
[print('%-16s %-9s %-18s %s' % (e['nome_popular'], \
str(e['faixas']['ph']['min_ideal'])+'-'+str(e['faixas']['ph']['max_ideal']), \
e['faixas']['luz']['categoria'], \
e['calcario_resposta'])) \
for e in d['especies']]"

stats: ## Estatísticas do projeto (arquivos, espécies, docs)
	@echo "== Estatísticas do Brotar =="
	@printf "Espécies no catálogo : %s\n" "$$($(PY) -c "import json;print(len(json.load(open('$(CATALOG)'))['especies']))")"
	@printf "Arquivos versionados : %s\n" "$$(git ls-files | wc -l | tr -d ' ')"
	@printf "Documentos (.md)     : %s\n" "$$(git ls-files '*.md' | wc -l | tr -d ' ')"
	@printf "Commits              : %s\n" "$$(git rev-list --count HEAD 2>/dev/null || echo '-')"
	@printf "Último commit        : %s\n" "$$(git log -1 --pretty='%h %s' 2>/dev/null || echo '-')"

tree: ## Mostra a estrutura de arquivos do projeto
	@git ls-files | sed 's,[^/]*$$,\&,' | awk -F/ '{indent=""; for(i=1;i<NF;i++) indent=indent"  "; print indent $$NF}' 2>/dev/null || git ls-files

todo: ## Mostra o que ainda falta (itens [ ] do roadmap)
	@echo "== Pendências (roadmap) =="
	@grep -n '^\- \[ \]' docs/roadmap.md | sed 's/- \[ \]/•/' || echo "nada pendente"

decisions: ## Mostra as decisões já tomadas
	@echo "== Decisões registradas =="
	@grep -h '✅' docs/architecture.md | sed 's/^- /• /' || true

overview: stats species todo ## Visão geral: estatísticas + espécies + pendências

sync-catalog: ## Copia o catálogo para o app e o backend
	@cp $(CATALOG) $(APP_CATALOG) && echo "OK: app  -> $(APP_CATALOG)"
	@cp $(CATALOG) $(API_CATALOG) && echo "OK: api  -> $(API_CATALOG)"

catalog-synced: ## Verifica se as cópias (app e backend) batem com a fonte
	@cmp -s $(CATALOG) $(APP_CATALOG) || { echo "DESATUALIZADO (app): rode 'make sync-catalog'"; exit 1; }
	@cmp -s $(CATALOG) $(API_CATALOG) || { echo "DESATUALIZADO (api): rode 'make sync-catalog'"; exit 1; }
	@echo "OK: catálogo do app e do backend em sincronia"

check: validate catalog-synced ## Roda as verificações (valida JSON + sincronia do catálogo)
	@echo "Tudo certo."
