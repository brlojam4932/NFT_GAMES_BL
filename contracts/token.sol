// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// https://youtu.be/_VVqa7zWSxA
// I BUILT NFT GAME IN 12 HOURS
// with Fillip - Moralis Web3

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC721, Ownable {

  struct Pet {
    uint8 damage; // 0-255
    uint8 magic;
    uint256 lastMeal;
    uint256 endurance;
  }

  uint256 nextId = 0;

  mapping(uint256 => Pet) private _tokenDetails;

  constructor(string memory name, string memory symbol) ERC721(name, symbol) {

  }

  function getTokenDetails(uint256 tokenId) public view returns(Pet memory) {
    return _tokenDetails[tokenId];

  }

  function mint(uint8 damage, uint8 magic, uint256 endurance) public onlyOwner {
    _tokenDetails[nextId] = Pet(damage, magic, block.timestamp, endurance);
    _safeMint(msg.sender, nextId);
    nextId++;
  }

  function feed(uint256 tokeId) public {
    Pet storage pet = _tokenDetails[nextId];
    require(pet.lastMeal + pet.endurance > block.timestamp);
    pet.lastMeal = block.timestamp;
  }

  function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual override {
      Pet storage pet = _tokenDetails[nextId];
      require(pet.lastMeal + pet.endurance > block.timestamp); // pet is still alive
    }


}