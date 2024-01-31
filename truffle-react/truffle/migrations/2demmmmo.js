const Simpledemo = artifacts.require("demo");

module.exports = function (deployer) {
  deployer.deploy(Simpledemo);
};
