let client;
const { Client } = require("pg");
const createDatabase = async () => {
  try {
    const client = new Client({
      host: "127.0.0.1",
      user: "postgres",
      password: process.env.password,
      port: process.env.port,
    });
    await client.connect();
    await client.query("CREATE DATABASE blockchain");
    console.log("database created tryrrrr"); // sends queries
    return true;
  } catch (error) {
    console.log(error.stack);
    console.log(error.code);
    return true;
  } finally {
    // await client.end(); // closes connection
  }
};
const startdb = async () => {
  await createDatabase();
  client = new Client({
    host: "localhost",
    user: "postgres",
    password: process.env.password,
    port: process.env.port,
    database: "blockchain",
  });
  await client.connect();
  const creattingtable = `
            CREATE TABLE IF NOT EXISTS "data" (
                "transactionHash" VARCHAR(66) NOT NULL UNIQUE,
                "transactionIndex" VARCHAR(32),
                "blockNumber" VARCHAR(32),
                "blockHash" VARCHAR(66),
                "from" VARCHAR(42),
                "to" VARCHAR(42),
                "cumulativeGasUsed" VARCHAR(64),
                "gasUsed" VARCHAR(32),
                "status" VARCHAR(32),
                "effectiveGasPrice" VARCHAR(32),
                "type" VARCHAR(32)
            );`;
  await client.query(creattingtable).then((y) => {
    console.log("data table created");
  });
};
module.exports = { startdb, client };
