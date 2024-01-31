const artifact = require("./build/contracts/IntegrityContract.json");
const { default: Web3 } = require("web3");
const { startdb } = require("./db");
const { Client } = require("pg");
const { insertdata } = require("./insetintotable");
const { trace, error } = require("console");
require("dotenv").config();
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
web3.eth.handleRevert = true;
async function x(
  transactionIndex,
  blockNumber,
  blockHash,
  from,
  to,
  cumulativeGasUsed,
  gasUsed,
  status,
  effectiveGasPrice,
  type
) {
  const accounts = await web3.eth.getAccounts();
  const networkID = await web3.eth.net.getId();
  const abi = artifact.abi;
  let address, contract;
  address = artifact.networks[networkID].address;
  contract = new web3.eth.Contract(abi, address);

  try {
    const accountscount = await web3.eth.requestAccounts();
    const transaction = await contract.methods
      .addAsset(
        transactionIndex,
        blockNumber,
        blockHash,
        from,
        to,
        cumulativeGasUsed,
        gasUsed,
        status,
        effectiveGasPrice,
        type
      )
      .send({ from: accounts[1], gas: 500000 });
    console.log(transaction);
    insertdata(transaction);
    const value = await contract.methods
      .allassets(0)
      .call({ from: accounts[1] });
    const value2 = await contract.methods
      .allassets(0)
      .call({ from: accounts[1] });
    console.log("value", value);
    console.log("value2", value2);
  } catch (err) {
    if (err.innerError) {
      console.error("comming from  catch if function=", err.innerError.message);
    } else {
      console.error("comming from catch else function=", err.message);
    }
  }
}
startdb();
x("sandeep17", "b", "ccccccc", "d", "e", "f", "aaaaaa");
