const IntegrityContract = artifacts.require("IntegrityContract");

module.exports = function (deployer) {
  deployer.deploy(IntegrityContract);
};
