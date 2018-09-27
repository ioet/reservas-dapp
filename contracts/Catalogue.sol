pragma solidity ^0.4.2;

contract Catalog {

	struct Restaurant {
		address id;
		Spot[] spots;
	}

	struct Rsrv {
    	uint id;
		uint spotId;
    	address restaurantId;
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

  	mapping(address => uint) public restaurantsIdxs;

	function createRestaurant(address id) public {
		restaurants.push(Restaurant(id, new Spot[](0)));
	}

	function getRestaurantsIds() public view returns(address[] ids) {
		for (uint i = 0; i < restaurants.length; i++) {
			ids[i] = restaurants[i].id;
		}

		return ids;
	}

	function getSpotsByRestaurant(address id) public view returns(uint[], uint[], uint[]) {
		uint idx = restaurantsIdxs[id];
		Restaurant storage restaurant = restaurants[idx];
		uint spotsCount = restaurant.spots.length;

		uint[] memory ids = new uint[](spotsCount);
		uint[] memory maxAllowance = new uint[](spotsCount);
		uint[] memory minAllowance = new uint[](spotsCount);

		for (uint i = 0; i < spotsCount; i++) {
		    ids[i] = restaurant.spots[i].id;
		    maxAllowance[i] = restaurant.spots[i].maxAllowance;
		    minAllowance[i] = restaurant.spots[i].minAllowance;
		}

		return (ids, maxAllowance, minAllowance);
	}


	function createReserve(uint spotId, uint32 date, address restaurantId) public {
		uint id = rsrvs.length;

		Rsrv memory newRsrv = Rsrv({
			id: id,
			spotId: spotId,
			restaurantId: restaurantId,
			date: date,
			client: msg.sender
		});

		rsrvs.push(newRsrv);
	}
}
