// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CertificateNFT is ERC721URIStorage {
    uint256 public tokenCounter;

    constructor() ERC721("EduCertificate", "EDU") {
        tokenCounter = 0;
    }

    /// @notice Cấp chứng chỉ cho học viên
    /// @param recipient Địa chỉ ví Ethereum của học viên
    /// @param certificateURI Liên kết IPFS chứa dữ liệu chứng chỉ
    function createCertificate(address recipient, string memory certificateURI)
        public
        returns (uint256)
    {
        uint256 newTokenId = tokenCounter;
        _safeMint(recipient, newTokenId);             // Gán NFT cho ví
        _setTokenURI(newTokenId, certificateURI);     // URI (IPFS CID)
        tokenCounter++;
        return newTokenId;
    }
}
