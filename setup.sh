#!/bin/bash

# NFT Drop Signal Setup Script
# This script sets up the development environment for NFT Drop Signal

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Main setup function
main() {
    print_status "Starting NFT Drop Signal development environment setup..."

    # Check prerequisites
    print_status "Checking prerequisites..."

    if ! command_exists node; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi

    if ! command_exists npm; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi

    if ! command_exists npx; then
        print_warning "npx is not available. Some commands may not work."
    fi

    print_success "Prerequisites check complete."

    # Setup frontend
    print_status "Setting up frontend..."
    npm install
    print_success "Frontend dependencies installed."

    # Setup contracts
    print_status "Setting up smart contracts..."
    if command_exists npx; then
        print_status "Compiling contracts..."
        npx hardhat compile
        print_success "Contracts compiled."
    else
        print_warning "npx not available. Please run 'npx hardhat compile' manually."
    fi

    # Create environment files
    print_status "Setting up environment files..."

    if [ ! -f ".env" ]; then
        cat > .env << EOF
# NFT Drop Signal Environment Variables
BASE_RPC_URL=https://mainnet.base.org
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
PRIVATE_KEY=your-private-key-here
BASESCAN_API_KEY=your-basescan-api-key
NEXT_PUBLIC_APP_NAME=NFT Drop Signal
NEXT_PUBLIC_RPC_URL=https://mainnet.base.org
EOF
        print_success ".env file created."
    else
        print_status ".env file already exists."
    fi

    # Setup Docker environment (optional)
    if command_exists docker && command_exists docker-compose; then
        print_status "Docker environment ready for use."
    else
        print_warning "Docker not available. Docker commands will not work."
    fi

    print_success "NFT Drop Signal setup complete!"
    echo ""
    print_status "Next steps:"
    echo "  1. Update the PRIVATE_KEY and BASESCAN_API_KEY in .env file"
    echo "  2. Run 'make dev' to start development servers"
    echo "  3. Run 'make deploy-sepolia' to deploy to testnet"
    echo ""
    print_status "Available commands:"
    echo "  make help          - Show all available commands"
    echo "  make dev           - Start development servers"
    echo "  make build         - Build all components"
    echo "  make test          - Run all tests"
    echo "  make deploy-sepolia - Deploy to Base Sepolia testnet"
    echo "  make docker-run    - Start services with Docker"
}

# Run main function
main "$@"