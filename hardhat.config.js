require("@nomiclabs/hardhat-ethers");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.4",
  paths: {
    sources: "./src/SmartContracts/contracts",
    tests: "./src/SmartContract/test"
  }
};
