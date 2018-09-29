const Catalog = artifacts.require("./Catalog.sol");

contract('Catalog', (accounts) => {
	let catalog;

	beforeEach(async() => {
		catalog = await Catalog.new();
	});

	it('should create the contract', () => {
		assert.isDefined(catalog, 'catalog defined');
	});

	it('should create a restaurant', async() => {
		await catalog.createRestaurant(123);

		const restaurants = await catalog.getRestaurantsIds();
		assert.equal(restaurants.length, 1);
	});

	it('should add spots to a restaurant', async() => {
		const restaurantId = 123;
		const spot = {
			id: 1,
			minAllowance: 2,
			maxAllowance: 4
		}

		await catalog.createRestaurant(restaurantId);
		const result = await catalog.addSpotToRestaurant(restaurantId, spot.id, spot.minAllowance, spot.maxAllowance);

		assert.equal(result.receipt.status, '0x1');
	});

	it('should not add a spot if the range is not valid', async() => {
		const restaurantId = 123;
		const spot = {
			id: 1,
			minAllowance: 6,
			maxAllowance: 4
		}

		await catalog.createRestaurant(restaurantId);

		try {
			await catalog.addSpotToRestaurant(restaurantId, spot.id, spot.minAllowance, spot.maxAllowance);
		} catch (error) {
			const revert =  error.message.search('revert') >= 0;
			assert.isTrue(revert, 'max and min must be within the range');
		}
	});

	it('should get spots by restaurant', async() => {
		const restaurantId = 123;
		const spot = {
			id: 1,
			minAllowance: 2,
			maxAllowance: 4
		}

		await catalog.createRestaurant(restaurantId);
		const result = await catalog.addSpotToRestaurant(restaurantId, spot.id, spot.minAllowance, spot.maxAllowance);

		const [ ids, minAllowances, maxAllowances] = await catalog.getSpotsByRestaurant(restaurantId);

		assert.equal(ids[0].valueOf(), spot.id);
		assert.equal(minAllowances[0].valueOf(), spot.minAllowance);
		assert.equal(maxAllowances[0].valueOf(), spot.maxAllowance);
	});

	it('should create a reserve', async() => {
		await catalog.createRsrv(1, Date.now(), 2);

		const rsrvs = await catalog.getRsrvsCount();
		assert.equal(rsrvs, 1);
	});

	it('should get a reserve by index', async() => {
		const rsrv = {
			spotId: 1,
			date: Date.now(),
			restaurantId: 2
		}

		await catalog.createRsrv(rsrv.spotId, rsrv.date, rsrv.restaurantId);
		const rsrvResult = await catalog.getRsrvByIndex(0);

		assert.equal(rsrvResult[0].valueOf(), 1);
		assert.equal(rsrvResult[1].valueOf(), rsrv.spotId);
		assert.equal(rsrvResult[2].valueOf(), rsrv.restaurantId);
		assert.equal(rsrvResult[3].valueOf(), rsrv.date);
	});
});
