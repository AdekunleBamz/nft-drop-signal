# NFT Drop Signal Development Makefile
# This Makefile provides convenient commands for development, testing, and deployment

.PHONY: help install install-frontend install-contract build build-frontend build-contract test test-frontend test-contract clean clean-frontend clean-contract lint lint-frontend lint-contract format format-frontend format-contract dev dev-frontend dev-contract docker-build docker-run docker-stop docker-clean setup setup-frontend setup-contract deploy deploy-contract deploy-sepolia

# Default target
help: ## Show this help message
	@echo "NFT Drop Signal Development Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Installation commands
install: install-frontend install-contract ## Install all dependencies

install-frontend: ## Install frontend dependencies
	npm install

install-contract: ## Install contract dependencies
	npm install

# Build commands
build: build-frontend build-contract ## Build all components

build-frontend: ## Build frontend application
	npm run build

build-contract: ## Build smart contracts
	npx hardhat compile

# Test commands
test: test-frontend test-contract ## Run all tests

test-frontend: ## Run frontend tests
	npm test

test-contract: ## Run contract tests
	npx hardhat test

# Clean commands
clean: clean-frontend clean-contract ## Clean all build artifacts

clean-frontend: ## Clean frontend build artifacts
	rm -rf .next out node_modules/.cache

clean-contract: ## Clean contract build artifacts
	rm -rf artifacts cache

# Linting commands
lint: lint-frontend lint-contract ## Run all linters

lint-frontend: ## Lint frontend code
	npm run lint

lint-contract: ## Lint contract code
	npx hardhat check

# Formatting commands
format: format-frontend format-contract ## Format all code

format-frontend: ## Format frontend code
	npm run lint -- --fix

format-contract: ## Format contract code
	npx prettier --write "contracts/**/*.sol"

# Development commands
dev: ## Start all development servers
	@echo "Starting development servers..."
	@make -j2 dev-frontend dev-contract

dev-frontend: ## Start frontend development server
	npm run dev

dev-contract: ## Start contract development environment
	npx hardhat node

# Docker commands
docker-build: ## Build Docker containers
	docker-compose build

docker-run: ## Start all services with Docker
	docker-compose up -d

docker-stop: ## Stop all Docker services
	docker-compose down

docker-clean: ## Clean Docker containers and volumes
	docker-compose down -v --remove-orphans
	docker system prune -f

# Setup commands
setup: setup-frontend setup-contract ## Setup development environment

setup-frontend: ## Setup frontend environment
	npm install
	@echo "Frontend setup complete. Run 'make dev-frontend' to start development server."

setup-contract: ## Setup contract environment
	npm install
	@echo "Contract setup complete. Run 'make dev-contract' to start development environment."

# Deployment commands
deploy: deploy-sepolia ## Deploy to testnet (default)

deploy-contract: deploy-sepolia ## Deploy smart contracts to Base Sepolia

deploy-sepolia: ## Deploy smart contracts to Base Sepolia testnet
	npx hardhat run scripts/deploy.ts --network base-sepolia

deploy-mainnet: ## Deploy smart contracts to Base mainnet
	npx hardhat run scripts/deploy.ts --network base

# Verification commands
verify-contract: ## Verify smart contracts on Base Sepolia
	npx hardhat verify --network base-sepolia <CONTRACT_ADDRESS>

verify-mainnet: ## Verify smart contracts on Base mainnet
	npx hardhat verify --network base <CONTRACT_ADDRESS>

# Utility commands
update-deps: ## Update all dependencies
	npm update

check-security: ## Run security checks
	npm audit
	npx hardhat run scripts/security-check.ts

# CI/CD commands
ci: install lint test build ## Run CI pipeline locally

# Environment setup
env-setup: ## Setup environment variables template
	@echo "Creating .env file..."
	@cp .env.example .env 2>/dev/null || echo "# NFT Drop Signal Environment Variables" > .env
	@echo "BASE_RPC_URL=https://mainnet.base.org" >> .env
	@echo "BASE_SEPOLIA_RPC_URL=https://sepolia.base.org" >> .env
	@echo "PRIVATE_KEY=your-private-key-here" >> .env
	@echo "BASESCAN_API_KEY=your-basescan-api-key" >> .env
	@echo "NEXT_PUBLIC_APP_NAME=NFT Drop Signal" >> .env
	@echo "NEXT_PUBLIC_RPC_URL=https://mainnet.base.org" >> .env

# Project information
info: ## Show project information
	@echo "NFT Drop Signal - Web3 NFT Drop Platform"
	@echo "Frontend: Next.js $(shell node -p "require('./package.json').dependencies.next")"
	@echo "Contract: Hardhat with Solidity $(shell grep 'version:' hardhat.config.ts | head -1 | sed 's/.*version: "\([^"]*\)".*/\1/')"
	@echo "Networks: Base, Base Sepolia"

# Quick start
quick-start: setup env-setup dev ## Quick start development environment
	@echo "NFT Drop Signal development environment is ready!"
	@echo "Frontend: http://localhost:3000"
	@echo "Hardhat Node: http://localhost:8545"
	@echo "Contracts: Ready for deployment"