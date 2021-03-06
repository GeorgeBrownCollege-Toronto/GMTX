pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import 'gmtx-solidity/contracts/GMTXRecipient.sol';


contract MessageHub is GMTXRecipient
{
	event NewMessage(address sender, string message);

	constructor() public GMTXRecipient(false) {}

	function publish(string calldata message) external
	{
		emit NewMessage(_msgSender(), message);
	}
}
