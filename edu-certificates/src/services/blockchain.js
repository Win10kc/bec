const { ethers } = require('ethers');
const Certificate = require('../models/Certificate');

// Kết nối với provider và ví Ethereum
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Địa chỉ hợp đồng và ABI
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = [
  // ABI của hợp đồng bạn sử dụng
];

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Hàm cấp chứng chỉ
const issueCertificate = async (recipientAddress, certificateURI) => {
  const tx = await contract.createCertificate(recipientAddress, certificateURI);
  const receipt = await tx.wait();

  if (receipt.status === 1) {
    // Lưu chứng chỉ vào MongoDB
    const newCertificate = new Certificate({
      studentAddress: recipientAddress,
      certificateURI,
      tokenId: receipt.events[0].args.tokenId.toNumber() // Lấy tokenId từ sự kiện
    });

    await newCertificate.save();
    return newCertificate;
  } else {
    throw new Error('Transaction failed');
  }
};

module.exports = { issueCertificate };
