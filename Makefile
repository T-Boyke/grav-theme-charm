# Variablen
APP_NAME = grav-theme-charm

# Standard-Ziel
.PHONY: help
help: ## Zeigt diese Hilfe an
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.PHONY: install
install: ## Installiert Abhängigkeiten
	npm install

.PHONY: dev
dev: ## Startet den Entwicklungsserver
	npm run dev

.PHONY: test
test: ## Führt Tests aus
	echo "No tests defined yet"

.PHONY: build
build: ## Baut die Anwendung für Produktion
	npm run build

.PHONY: clean
clean: ## Löscht temporäre Dateien
	rm -rf dist build coverage
