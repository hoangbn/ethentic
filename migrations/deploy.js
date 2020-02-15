const DB = artifacts.require("DB");

module.exports = function(deployer) {
  deployer.deploy(DB);
};
