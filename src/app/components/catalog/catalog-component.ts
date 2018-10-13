import { Component, OnInit } from '@angular/core';
import * as restaurantsJson from './../../../assets/data/restaurants.json';
import { Web3Service } from '../../services/web3.service';

@Component({
  selector: 'catalog-component',
  templateUrl: './catalog-component.html',
  styleUrls: ['./catalog-component.scss']
})
export class CatalogComponent implements OnInit {
	public restaurants;
	public currentRestaurant: any;

	private catalogInstance;
	private restaurantsMock: any;

	constructor(private web3Service: Web3Service) {

	}

	async ngOnInit() {
		this.restaurantsMock = restaurantsJson;

		this.catalogInstance = await (await this.web3Service.getCatalog()).deployed();

		const restaurantsIds = await this.catalogInstance.getRestaurantsIds();

		this.restaurants = restaurantsIds.map((id) => {
			const restaurant = this.restaurantsMock.find((r) => `${r.id}` === id.valueOf());
			return restaurant;
		});
	}

	public async viewRestaurantSpots(r) {
		this.currentRestaurant = r;

		const spots = await this.catalogInstance.getSpotsByRestaurant(this.currentRestaurant.id);

		if (!!spots && spots.length && spots[0].length) {
			this.currentRestaurant.spots = spots[0].map((id, index) => {
				return {
					id,
					min: spots[1][index],
					max: spots[2][index]
				};
			});
		}
	}

	public async saveReserve(spot) {
		console.log(spot);

		try {
			const result = await this.catalogInstance.createRsrv(Date.now(), spot.id.valueOf(), this.currentRestaurant.id);
		} catch (e) {
			console.log(e);
		}
	}

	public cancel() {
		this.currentRestaurant = null;
	}

}
