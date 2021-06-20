pragma solidity >=0.4.22 <0.9.0;

contract KOSCoinflip {
    address player1;
    address player2;
    uint256 player1Balance;
    uint256 player2Balance;

    event TransferFund(
        address _transferTo,
        address _transferFrom,
        uint256 amount
    );

    function getPlayer1Address() public view returns (address) {
        return player1;
    }

    function getPlayer2Address() public view returns (address) {
        return player2;
    }

    function getPlayer1Balance() public view returns (uint256) {
        return player1Balance;
    }

    function getPlayer2Balance() public view returns (uint256) {
        return player2Balance;
    }

    function random(uint256 _someNumber) private view returns (uint256) {
        uint256 randomHash =
            uint256(keccak256(abi.encodePacked(block.difficulty, _someNumber)));
        return uint256(randomHash % 2);
    }

    function setPlayer(address _player1, address _player2) public {
        player1 = _player1;
        player2 = _player2;
    }

    function bet(
        address _player1,
        uint256 _address1res,
        address _player2,
        uint256 _address2res,
        uint256 _someNumber
    ) public view returns (uint256, address) {
        uint256 answer = random(_someNumber);
        address winner;
        if (_address1res == answer) {
            winner = _player1;
        } else if (_address2res == answer) {
            winner = _player2;
        }
        return (answer, winner);
    }

    function transfer(address payable _transferTo)
        public
        payable
        returns (bool)
    {
        // transferTo = _transferTo;
        _transferTo.transfer(msg.value);

        emit TransferFund(_transferTo, msg.sender, msg.value);

        return true;
    }
}
