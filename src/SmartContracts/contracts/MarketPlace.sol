// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import  "@openzeppelin/contracts/security/ReentrancyGuard.sol";
// Author: Karthik Sathish
contract MarketPlace is ReentrancyGuard {
    uint feepercent;
    address payable feeaddress;
    uint public  token_Listed_count =0;
    // constructor(uint _feePercent){
    //     feepercent = _feePercent;
    //     feeaddress = payable (msg.sender);
    // }
    struct Item {
        uint itemID;
        IERC721 NFT;
        uint tokenID;
        uint price;
        bool sold;
        address payable seller;
         }
    event token_is_Listed(
        uint itemID,
        uint tokenID,
        uint price,
        address indexed NFT,
        address indexed seller
    );
    event token_sold(
        uint itemID,
        uint tokenID,
        uint price,
        address indexed NFT,
        address indexed seller,
        address indexed buyer
    );
    mapping(uint => Item) public Items;
function ListItem(uint _price,IERC721 _NFT, uint _tokenID) external nonReentrant{
    require(_price>0,"price should be greater than zero");
    token_Listed_count++;
    _NFT.transferFrom(msg.sender,address(this), _tokenID);
    Items[token_Listed_count]= Item(
        token_Listed_count,
        _NFT,
        _tokenID,
        _price,
        false,
        payable(msg.sender)
         );
    emit token_is_Listed(
    token_Listed_count,
    _tokenID,
    _price,
    address (_NFT),
    msg.sender
    ); }
function BuyItem( uint _ItemID) external payable {
   Item storage item = Items[_ItemID];
//    uint Total_price = getTotalPrice(_ItemID);
//    require(msg.value>Total_price,"Value is less then the listed price, try again") ;
   require(_ItemID>0 && _ItemID<=token_Listed_count,"Enter valid itemID");
   require(!item.sold,"Item already sold");

   item.seller.transfer(item.price);
//    feeaddress.transfer(Total_price-item.price);
   
IERC721 nft = Items[_ItemID].NFT;
nft.transferFrom(address(this),msg.sender,Items[_ItemID].tokenID);
item.sold = true;
emit token_sold (
    Items[_ItemID].itemID,
    Items[_ItemID].tokenID,
    Items[_ItemID].price,
    address(Items[_ItemID].NFT),
    Items[_ItemID].seller,
    msg.sender
);  
}
// function getTotalPrice(uint _ItemID)public view returns(uint){
// Item storage  item = Items[_ItemID];
// return()}
}