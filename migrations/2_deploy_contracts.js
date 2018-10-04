var Catalog = artifacts.require("./Catalog.sol");

module.exports = function(deployer, network) {
  deployer.deploy(Catalog);
};
