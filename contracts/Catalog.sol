pragma solidity ^0.4.2;

contract Catalog {
	struct Restaurant {
		uint id;
		uint[] spotsIds;
		mapping(uint => Spot) spots;
	}

	struct Rsrv {
		uint id;
		uint spotId;
		uint restaurantId;
		uint64 date;
		address client;
	}

	struct Spot {
		uint id;
		uint maxAllowance;
		uint minAllowance;
	}

	Restaurant[] restaurants;
	Rsrv[] rsrvs;

	mapping(uint => uint) public restaurantsIdxs;
}
