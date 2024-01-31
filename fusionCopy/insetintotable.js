const { Client } = require("pg");
const insertdata = (transaction) => {
  let insertQuery = `INSERT INTO "data" (
        "transactionHash" ,
        "transactionIndex",
        "blockNumber",
        "blockHash",
        "from",
        "to",
        "cumulativeGasUsed",
        "gasUsed",
        "status",
        "effectiveGasPrice",
        "type"
        )
        values(
        '${transaction.transactionHash}',
        '${transaction.transactionIndex}',
        '${transaction.blockNumber}',
        '${transaction.blockHash}',
        '${transaction.from}',
        '${transaction.to}',
        '${transaction.cumulativeGasUsed}',
        '${transaction.gasUsed}',
        '${transaction.status}',
        '${transaction.effectiveGasPrice}',
        '${transaction.type}')`;
  const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5000,
    password: "Tesla@261600",
    database: "blockchain",
  });
  setTimeout(async () => {
    await client.connect();
    client.query(insertQuery, (err, result) => {
      console.log("fffffffffffffff");
      if (!err) {
        console.log("Insertion was successful");
      } else {
        console.log(err);
      }
    });
  }, 1000);
};
module.exports = { insertdata };
