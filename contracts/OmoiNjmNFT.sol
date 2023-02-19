// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

// ERC721A is a little more gas efficient when someones minting multiple NFTs

contract OmoiNjmNFT is ERC721, Ownable {
   uint256 public mintPrice; // price of the mint
   uint256 public totalSupply; // total number of NFTs being minted
   uint256 public maxSupply; // maximum number of NFTs
   uint256 public maxPerWallet; // maximum number of NFTs a specific wallet can mint
   bool public isPublicMintEnabled; // determines when users can mint
   string internal baseTokenUri; // opensea can determine where the images are located
   address payable public withdrawWallet; // use to withdraw money from the contract
   mapping(address => uint256) public walletMints; // keeps track of all your mints for each wallet

   // slightly cheaper to initialize variables here
   constructor() payable ERC721('Omoi', 'OM') {
      mintPrice = 0.02 ether;
      totalSupply = 0;
      maxSupply = 1000;
      maxPerWallet = 3;
      // set withdraw wallet address
      // withdrawWallet = "0xbd6Fd0A86d4966a96CD9CE6D3b72cA60391F7432";
   }

   // allows only the owner to call this function
   function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner {
      isPublicMintEnabled = isPublicMintEnabled_;
   }

   function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
      baseTokenUri = baseTokenUri_;
   }

   // by default it exsits in ERC721
   // but since we declared baseToeknUri we have to override this function so opensea has the correct URL to call
   function tokenURI(uint256 tokenId_) public view override returns (string memory) {
      require(_exists(tokenId_), 'Token does not exist!');
      return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json"));
   }

   function withdraw() external onlyOwner {
      (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');
      require(success, 'withdraw failed');
   }

   function mint(uint256 quantity_) public payable {
      require(isPublicMintEnabled, 'minting not enabled');
      require(msg.value == quantity_ * mintPrice, 'wrong mint value');
      require(totalSupply + quantity_ <= maxSupply, 'sold out');
      require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'exceed max wallet');

      for(uint256 i = 0 ; i < quantity_; i++) {
         uint256 newTokenId = totalSupply + 1;
         totalSupply++;
         _safeMint(msg.sender, newTokenId); // this function exsits in ERC721 
      }
   }
}
