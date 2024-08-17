# Raffle Smart Contract

## 📖 Overview

This repository serves as a practical demonstration of utilizing the Hardhat framework and  Chainlink automation for Ethereum smart contract development. Inspired by the [Solidity, Blockchain, and Smart Contract Course – Beginner to Expert Python Tutorial](https://www.youtube.com/watch?v=gyMwXuJrbJQ&t=34221s) by Patrick Collins from freeCodeCamp, project is structured to provide a hands-on experience in building, compiling, deploying, and testing Solidity smart contracts. It utilizes chainlink automation to randomly select a winner among those users that register into the raffle with 0.1 eth participation fee. 


## 🚀 Getting Started

### 🔍 Prerequisites

- Node.js
- NPM (Node Package Manager) or yarn
- Hardhat

### 🛠 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/leonnloo/Ruffle-Lottery-Smart-Contract
   ```
2. Navigate to the project directory:
   ```bash
   cd Ruffle-Lottery-Smart-Contract
   ```
3. Install npm dependencies using package.json

### 📝 Compile Contracts

Compile the smart contracts using Hardhat:
```bash
npx hardhat compile
```

### 🌐 Deploy Contracts

Deploy the contracts to the local blockchain:
```bash
npx hardhat run scripts/deploy.js
```

### 🧪 Run Tests

Execute the test cases:
```bash
npx hardhat test
```

### 🛜 Staging test
1. Get SubId for Chainlink VRF & Fund at vrf.chain.link
2. Deploy contract using the the SubId
3. Register the contract with Chainlink VRF & it's SubId
4. Register the contract with Chainlink Automation
5. Run Staging test

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for bugs, features, or improvements.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙌 Acknowledgments

- Inspired by Patrick Collins and freeCodeCamp's comprehensive [Solidity and Blockchain course](https://www.youtube.com/watch?v=gyMwXuJrbJQ&t=34221s).
- Thanks to the Hardhat team for providing a robust framework for Ethereum development.

