const { default: Web3 } = require("web3");

solc = require("solc");
fs = require("fs");
// let Web3 = require("web3");
const web3 = new Web3("http://127.0.0.1:7545");
fileContent = fs.readFileSync("demo.sol").toString();
console.log(fileContent);
var input = {
  language: "Solidity",
  sources: {
    "demo.sol": {
      content: fileContent,
    },
  },

  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};
var output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log("Output: ", output);

ABI = output.contracts["demo.sol"]["demo"].abi;
bytecode = output.contracts["demo.sol"]["demo"].evm.bytecode.object;
console.log("Bytecode: ", bytecode);
console.log("ABI: ", ABI);
