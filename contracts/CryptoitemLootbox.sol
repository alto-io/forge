pragma solidity ^0.4.21;

import "./TradeableERC721Token.sol";
import "./Cryptoitem.sol";
import "./Factory.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract CryptoitemLootBox is TradeableERC721Token {
    uint256 QUANTITY_OF_CRYPTOITEMS_PER_BOX = 3;
    uint256 OPTION_ID = 0;
    address factoryAddress;

    constructor(address _proxyRegistryAddress, address _factoryAddress) TradeableERC721Token("Cryptoitem Demo Collection Loot Box", "CIDCLB", _proxyRegistryAddress) public {
        factoryAddress = _factoryAddress;
    }

    function unpack(uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender);

        // Insert custom logic for configuring the item here -- this defeaults to minting X items directly without loot box odds
        for (uint256 i = 0; i < QUANTITY_OF_CRYPTOITEMS_PER_BOX; i++) {

            // Mint the ERC721 item(s).
            Factory factory = Factory(factoryAddress);
            factory.mint(OPTION_ID, msg.sender);
        }

        // Burn the presale item.
        _burn(msg.sender, _tokenId);
    }

    function baseTokenURI() public view returns (string) {
        return "https://cimds.herokuapp.com/box/";
    }

    function itemsPerLootbox() public view returns (uint256) {
        return QUANTITY_OF_CRYPTOITEMS_PER_BOX;
    }
}