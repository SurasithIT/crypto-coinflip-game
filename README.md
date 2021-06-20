# Crypto Coinflip Game

the game let two players bet on coin flip (BTC and ETH)

## Setup manual and how to run (locally)

- run [Ganache](https://www.trufflesuite.com/ganache) with localhost port 8545
- install web dependency with command `npm i`
- install truffle dependency with command `npm run init-contract`
- deploy contract in local with command `npm run deploy-contract`
- using angular serve command (if you didn't install, have to install with command `npm install -g @angular/cli`)
  `ng serve`
- access the game with http://localhost:4200
- connect MetaMask wallet with local ganache network and import yours wallet
- insert wallet address of player 1 and 2
- select your lucky coin
- press "Toss!!"

you can test connect to smart contract with app.js file in truffle directory (have to set env in .env file first)

## Tech stack

- Web frontend using [Angular](https://angular.io/)
- local ethereum network using [Ganache](https://www.trufflesuite.com/ganache)
- Deploy smart contract by [Truffle](https://www.trufflesuite.com/)
- Node JS library to connect with ethereum provider is [Ethers JS](https://docs.ethers.io/)
- Wallet is using [MetaMask](https://metamask.io/)

## Knowledge reference

- [Ethers JS](https://docs.ethers.io/v5/getting-started/)
- [Truffle Migrations Explained](https://www.sitepoint.com/truffle-migrations-explained/)
- [Build a DApp using Ethereum and Angular 6](https://walkingtree.tech/dapps-using-ethereum-angular/)
- [Ethers JS (my example project)](https://github.com/SurasithIT/EthersJS-App)
- [Angular animation flip card](https://embed.plnkr.co/plunk/PdjBGS)
- [Best practices for generating a random uint256](https://ethereum.stackexchange.com/questions/62375/best-practices-for-generating-a-random-uint256)

## Task

- [x] Create Web Application with mockup UI (has 2 player side with Coin select and wallet address and Coin toss).
- [x] Create Smart contract with bet function and return winner with trasfer function to pay bet money.
- [x] connect Web Application with MetaMask wallet for pay.
- [x] connect Web Application with smart contract for call contract function.
- [ ] Deploy smart contract with testnet using Infura. (cannot deploy yet because of gasprice error)
- [ ] Deploy web app with Docker (with NGINX).
