// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

contract SavingsDApp {
    IERC20 public stableToken;
    mapping(address => uint256) public balances;

    constructor(address _stableToken) {
        stableToken = IERC20(_stableToken);
    }

    function deposit(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");

        stableToken.transferFrom(msg.sender, address(this), amount);
        balances[msg.sender] += amount;
    }

    function withdraw(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        stableToken.transfer(msg.sender, amount);
        balances[msg.sender] -= amount;
    }

    function getBalance(address account) external view returns (uint256) {
        return balances[account];
    }
}
