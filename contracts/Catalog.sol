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

	function createRestaurant(uint id) public {

	}

	function verifyRestaurantCreation (uint id) private view returns (bool) {

	}

	function addSpotToRestaurant(uint restaurantId, uint spotId, uint minAllowance, uint maxAllowance) public {

	}

	function getRestaurantsIds() public view returns(uint[]) {

	}

	function getSpotsByRestaurant(uint id) public view returns(uint[], uint[], uint[]) {

	}

	function createRsrv(uint64 date, uint spotId, uint restaurantId) public {

	}

	function verifyRsrv(uint date, uint spotId, uint restaurantId) private view returns (bool) {

	}

	function getRsrvsCount() public view returns(uint) {

	}

	function getRsrvByIndex(uint index) public view returns(uint, uint, uint, uint64, address) {

	}
}
