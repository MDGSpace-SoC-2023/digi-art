require("@nomiclabs/hardhat-ethers");
/** @type import('hardhat/config').HardhatUserConfig */
// const INFURA_API_KEY = "";
const SEPOLIA_PRIVATE_KEY = "2e62306f288f7cae165b1c438e22c793423bf393d708ab2ff17c860780a27dce";
module.exports = {
  solidity: "0.8.4",
  paths: {
    sources: "./src/SmartContracts/contracts",
    tests: "./src/SmartContract/test"
  },
  etherscan: {
    apiKey:"GKMF23H2SAUD457V262JQMSFD8BJSS6SAF",
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/bb6a3d050a0a4f98af107f8d8b651e8e`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  }
};
