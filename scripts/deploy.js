// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const chaiwala = await hre.ethers.getContractFactory("ChaiWala");
  const chai = await chaiwala.deploy();

  await chai.deployed();

  console.log(
    `deployed to ${chai.address}`
  );
}

// 0xba3aeBF2aF77722Fa5c03fB08beA5e6aA3c596f8

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
