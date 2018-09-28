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
		uint32 date;
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
		restaurants.push(Restaurant(id, new uint[](0)));
	}

	function addSpotToRestaurant(uint restaurantId, uint spotId, uint maxAllowance, uint minAllowance) public {
		uint idx = restaurantsIdxs[restaurantId];
		restaurants[idx].spotsIds.push(spotId);
		restaurants[idx].spots[spotId].id = spotId;
		restaurants[idx].spots[spotId].maxAllowance = maxAllowance;
		restaurants[idx].spots[spotId].minAllowance = minAllowance;
	}

	function getRestaurantsIds() public view returns(uint[] ids) {
		for (uint i = 0; i < restaurants.length; i++) {
			ids[i] = restaurants[i].id;
		}

		return ids;
	}

	function getSpotsByRestaurant(uint id) public view returns(uint[], uint[], uint[]) {
		uint idx = restaurantsIdxs[id];
		Restaurant storage restaurant = restaurants[idx];
		uint spotsCount = restaurant.spotsIds.length;

		uint[] memory ids = new uint[](spotsCount);
		uint[] memory maxAllowance = new uint[](spotsCount);
		uint[] memory minAllowance = new uint[](spotsCount);

		for (uint i = 0; i < spotsCount; i++) {
			uint spotId = restaurant.spotsIds[i];
			Spot memory spot = restaurant.spots[spotId];
		    ids[i] = spot.id;
		    maxAllowance[i] = spot.maxAllowance;
		    minAllowance[i] = spot.minAllowance;
		}

		return (ids, maxAllowance, minAllowance);
	}


	function createRsrv(uint spotId, uint32 date, uint restaurantId) public {
		Rsrv memory newRsrv = Rsrv(rsrvs.length, spotId, restaurantId, date, msg.sender);
		rsrvs.push(newRsrv);
	}

	function getRsrvsCount() public view returns(uint) {
		return restaurants.length;
	}

	function getRsrvByIndex(uint index) public view returns(uint, uint, uint, uint32, address) {
		Rsrv memory r = rsrvs[index];
		return (r.id, r.spotId, r.restaurantId, r.date, r.client);
	}
}
