const Token = artifacts.require("Token");

module.exports = async function (deployer) {
  await deployer.deploy(Token, "NFT GAME", "NFTG");
  let tokenInstance = await Token.deployed();
  await tokenInstance.mint(100, 200, 1000); // token id 0
  await tokenInstance.mint(255, 100, 2000); // token id 1
  let pet = await tokenInstance.getTokenDetails(0);
  console.log(pet);

  // truffle migrate --network development
};