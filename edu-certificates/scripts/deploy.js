const hre = require("hardhat");

async function main() {
  console.log("🟡 Đang deploy...");
  const CertificateNFT = await hre.ethers.getContractFactory("CertificateNFT");
  console.log("📦 Hợp đồng đã được biên dịch!");

  const contract = await CertificateNFT.deploy();
  await contract.waitForDeployment();  // Thay thế deployed()

  const txHash = contract.deploymentTransaction().hash;
  console.log("🔗 Giao dịch deploy:", `https://sepolia.etherscan.io/tx/${txHash}`);

  const address = await contract.getAddress();
  console.log("✅ Hợp đồng đã triển khai tại địa chỉ:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Lỗi khi deploy:", error);
    process.exit(1);
  });
