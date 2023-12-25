require("@nomiclabs/hardhat-ethers");
/** @type import('hardhat/config').HardhatUserConfig */
// const INFURA_API_KEY = "";
const SEPOLIA_PRIVATE_KEY = "dfe53bf1851cea29ee86ab0deec33dab01710c2c0d17cd64f797e20891261955";
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
      gas: 2100000,
      gasPrice: 8000000000
   
    },
  }
};
