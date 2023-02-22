// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

contract ChaiWala{

    struct Memo{
        string name;
        string message;
        uint timestamp;
        address from;
    }

    Memo[] memo;
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function buyChai(string memory name, string memory message) public payable{
        require(msg.value > 0, "Please pay greater then 0 ether");
        owner.transfer(msg.value);
        memo.push(Memo(name, message, block.timestamp, msg.sender));
    }

    function getMemos() public view returns(Memo[] memory){
        return memo;
    }
}

// 0xba3aeBF2aF77722Fa5c03fB08beA5e6aA3c596f8