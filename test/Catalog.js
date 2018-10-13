const Catalog = artifacts.require("./Catalog.sol");

contract('Catalog', (accounts) => {
	let catalog;

	beforeEach(async() => {
		catalog = await Catalog.new();

		const restaurantId = 123;
		const spot = {
			id: 0,
			minAllowance: 2,
			maxAllowance: 4
		}

		await catalog.createRestaurant(restaurantId);
		const result = await catalog.addSpotToRestaurant(restaurantId, spot.id, spot.minAllowance, spot.maxAllowance);

	});

	it('should create the contract', () => {
		assert.isDefined(catalog, 'catalog defined');
	});

	it('should create a restaurant', async() => {
		await catalog.createRestaurant(001);

		const restaurants = await catalog.getRestaurantsIds();
		assert.equal(restaurants.length, 2);
	});

	if('should fail if the add a restauran with an id already used', async() => {
		await catalog.createRestaurant(123);

		try {
			await catalog.createRestaurant(123);
		} catch (result) {
			const revert =  error.message.search('revert') >= 0;
			assert.isTrue(revert, 'the restaurant is already saved');
		}

		const restaurantsCount = await catalog.getRestaurantsIds();
		assert.equal(restaurantsCount.length, 1);
	})

	it('should add spots to a restaurant', async() => {
		const restaurantId = 001;
		const spot = {
			id: 1,
			minAllowance: 2,
			maxAllowance: 4
		}

		await catalog.createRestaurant(restaurantId);
		const result = await catalog.addSpotToRestaurant(restaurantId, spot.id, spot.minAllowance, spot.maxAllowance);

		assert.equal(result.receipt.status, 0x1);
	});

	it('should not add a spot if the range is not valid', async() => {
		const restaurantId = 001;
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
		const restaurantId = 001;
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
		await catalog.createRsrv(Date.now(), 0, 0);

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
		assert.equal(rsrvResult[3].valueOf(), rsrv.spotId);
		assert.equal(rsrvResult[2].valueOf(), rsrv.restaurantId);
		assert.equal(rsrvResult[1].valueOf(), rsrv.date);
	});

	it('should fail if the spot is not available', async () => {
		const rsrv = {
			spotId: 1,
			date: Date.now(),
			restaurantId: 2
		}

		await catalog.createRsrv(rsrv.spotId, rsrv.date, rsrv.restaurantId);

		try {
			await catalog.createRsrv(rsrv.spotId, rsrv.date, rsrv.restaurantId);
		} catch (error) {
			const revert =  error.message.search('revert') >= 0;
			assert.isTrue(revert, 'the spot is already used');
		}

		const rsrvCount = (await catalog.getRsrvsCount()).valueOf();
		assert.equal(rsrvCount, 1);
	});


});
