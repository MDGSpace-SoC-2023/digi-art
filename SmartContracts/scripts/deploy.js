
const { ethers }= require("hardhat");
async function main(){
  const [deployer]= await ethers.getSigners();
  console.log("Balance of deployer is :" + await deployer.getBalance())
  console.log(`address of deployer is ${deployer.address}`)
  const NFT = await ethers.getContractFactory("NFT")
  const MarketPlace = await ethers.getContractFactory("MarketPlace")
  const nft =  await NFT.deploy()
  const marketspace = await MarketPlace.deploy(5)
}
// main()
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
