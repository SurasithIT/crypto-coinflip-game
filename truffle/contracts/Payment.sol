pragma solidity >=0.4.22 <0.9.0;

contract Payment {
    address transferFrom;
    address payable transferTo;
    uint256 paymentAmount;

    constructor() public {
        transferFrom = msg.sender;
    }

    event TransferFund(
        address _transferTo,
        address _transferFrom,
        uint256 amount
    );

    function transferFund(address payable _transferTo)
        public
        payable
        returns (bool)
    {
        transferTo = _transferTo;
        transferTo.transfer(msg.value);

        emit TransferFund(transferTo, transferFrom, msg.value);

        return true;
    }

    function getBalanceOfCurrentAccount() public payable returns (uint256) {
        return transferFrom.balance;
    }
}
