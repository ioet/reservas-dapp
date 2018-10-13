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
		require(verifyRestaurantCreation(id));

		restaurantsIdxs[id] = restaurants.length;
		restaurants.push(Restaurant(id, new uint[](0)));
	}

	function verifyRestaurantCreation (uint id) private view returns (bool) {
		for (uint i = 0; i < restaurants.length; i ++) {
			if(restaurants[i].id == id) {
				return false;
			}
		}

		return true;
	}

	function addSpotToRestaurant(uint restaurantId, uint spotId, uint minAllowance, uint maxAllowance) public {
		require(maxAllowance >= minAllowance);

		uint idx = restaurantsIdxs[restaurantId];
		restaurants[idx].spotsIds.push(spotId);
		restaurants[idx].spots[spotId].id = spotId;
		restaurants[idx].spots[spotId].maxAllowance = maxAllowance;
		restaurants[idx].spots[spotId].minAllowance = minAllowance;
	}

	function getRestaurantsIds() public view returns(uint[]) {
		uint[] memory ids = new uint[](restaurants.length);
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
		uint[] memory maxAllowances = new uint[](spotsCount);
		uint[] memory minAllowances = new uint[](spotsCount);

		for (uint i = 0; i < spotsCount; i++) {
			uint spotId = restaurant.spotsIds[i];
			Spot memory spot = restaurant.spots[spotId];
		    ids[i] = spot.id;
		    maxAllowances[i] = spot.maxAllowance;
		    minAllowances[i] = spot.minAllowance;
		}

		return (ids, minAllowances, maxAllowances);
	}


	function createRsrv(uint64 date, uint spotId, uint restaurantId) public {
		require(verifyRsrv(date, spotId, restaurantId));

		Rsrv memory newRsrv = Rsrv(rsrvs.length + 1, spotId, restaurantId, date, msg.sender);
		rsrvs.push(newRsrv);
	}

	function verifyRsrv(uint date, uint spotId, uint restaurantId) private view returns (bool) {

		for(uint i = 0; i < rsrvs.length; i++) {
				if(rsrvs[i].spotId == spotId &&
					rsrvs[i].restaurantId == restaurantId &&
					rsrvs[i].date == date) {
					return false;
			}
		}
		return true;
	}

	function getRsrvsCount() public view returns(uint) {
		return rsrvs.length;
	}

	function getRsrvByIndex(uint index) public view returns(uint, uint, uint, uint64, address) {
		Rsrv memory r = rsrvs[index];
		return (r.id, r.spotId, r.restaurantId, r.date, r.client);
	}
}
