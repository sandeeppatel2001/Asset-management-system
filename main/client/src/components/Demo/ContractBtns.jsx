import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const artifact2 = require("../../contracts/OrgContract.json");
const abi2 = artifact2.abi;
function ContractBtns({ setValue }) {
  const {
    state: { contract, accounts },
  } = useEth();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const read = async () => {
    const value = await contract.methods
      .Orgaddress("sandeep")
      .call({ from: accounts[0] });
    const value3 = await contract.methods
      .allassets(0)
      .call({ from: accounts[0] });

    console.log("llllllll", value3);
    // const contract2 = new web3.eth.Contract(
    //   abi2,
    //   "0x848af32B8F888aa44b316b354E59bBD8e2C50158"
    // );
    // const value2 = await contract2.methods
    //   .orgHash()
    //   .call({ from: accounts[0] });
    // console.log("orghash= ", value2);
    // const value = await contract.methods.read().call({ from: accounts[0] });

    setValue(value);
  };

  const write = async (e) => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(inputValue);
    // await contract.methods.write(newValue).send({ from: accounts[0] });
    const transaction = await contract.methods
      .addAsset("sandeep", "b", "c", "d", "e", "f", `aaaaaa=${newValue}`)
      .send({ from: accounts[0] });
    console.log(transaction);
  };

  return (
    <div className="btns">
      <button onClick={read}>read()</button>

      <div onClick={write} className="input-btn">
        write(
        <input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />
        )
      </div>
    </div>
  );
}

export default ContractBtns;
