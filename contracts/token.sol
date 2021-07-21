// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC721, Ownable {

  struct Pet {
    uint8 damage; // 0-255
    uint8 magic;
    uint256 lastMeal;
    uint256 endurance;
  }

  mapping(uint256 => Pet) private _tokenDetails;

  constructor(string memory name, string memory symbol) ERC721(name, symbol) {

  }

  function mint(uint8 damage, uint8 magic, uint8 endurance) public onlyOwner {

  }


}