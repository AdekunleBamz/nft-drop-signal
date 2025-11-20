import { ethers } from "hardhat";

async function main() {
  console.log("Deploying MiniSudoku contract to Base...");

  // USDC contract address on Base Mainnet
  const USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
  // For Base Sepolia testnet, use: 0x036CbD53842c5426634e7929541eC2318f3dCF7e

  const MiniSudoku = await ethers.getContractFactory("MiniSudoku");
  const miniSudoku = await MiniSudoku.deploy(USDC_BASE);

  await miniSudoku.waitForDeployment();

  const address = await miniSudoku.getAddress();
  console.log("MiniSudoku deployed to:", address);
  console.log("Save this address to your .env file as NEXT_PUBLIC_MINISUDOKU_CONTRACT");

  // Wait for a few block confirmations
  console.log("Waiting for block confirmations...");
  await miniSudoku.deploymentTransaction()?.wait(5);

  console.log("Deployment complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
