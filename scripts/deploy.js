const hre = require("hardhat");

async function main() {
  console.log("Deploying TodoContract...");

  const TodoContract = await hre.ethers.getContractFactory("TodoContract");
  const todoContract = await TodoContract.deploy();

  await todoContract.deployed();

  console.log("TodoContract deployed to:", todoContract.address);
  
  // Save the contract address to a file for easy access
  const fs = require("fs");
  const contractsDir = __dirname + "/../src/constants";
  
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }
  
  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ TodoContract: todoContract.address }, undefined, 2)
  );
  
  console.log("Contract address saved to src/constants/contract-address.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
