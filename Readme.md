![alt text](<Screenshot 2024-01-26 210700.png>)
![alt text](<Screenshot 2024-01-26 210352.png>)
# Project Setup Guide

## Setting up the Project

1. Navigate to the main folder of the project.

2. Run the following commands:

   ```bash
   npm i
   npm install -g truffle
   ```

3. Install the required dependencies by running:
   ```bash
   npm i --save ganache @truffle/hdwallet-provider web3
   ```

## Environment File Setup

1. Create a `.env` file in the main directory.

2. Add the following variables to your `.env` file:
   ```plaintext
   mnemonic=//your Metamask mnemonic
   PROJECT_ID=//Project ID where(like infura) you want to deploy only required when you deploy on testnet or mainnet not required if you deploy localhost ganach
   password= // your password
   PORT=//PGSQL Database Port Number(by default 5000)
   ```

## Compiling Contracts

To compile contracts, run the following command:

```bash
truffle compile
```

## Deployment

For deployment, use the following command:
Replace "your network name" with your desired network configuration, such as local ganache (Development) or testnet (goerli, sepolia, or others).

```bash
truffle deploy --network "your network name"
```

## Testing

To run tests, execute:

```bash
truffle test
```

## Running the Application

To run the main application, execute:

```bash
node index.js
```

