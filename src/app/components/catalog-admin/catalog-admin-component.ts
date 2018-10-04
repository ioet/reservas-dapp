import { Component, OnInit } from '@angular/core';
import * as restaurantsJson from './../../../assets/data/restaurants.json';
import { Web3Service } from '../../services/web3.service';

@Component({
  selector: 'catalog-admin-component',
  templateUrl: './catalog-admin-component.html',
  styleUrls: ['./catalog-admin-component.scss']
})
export class CatalogAdminComponent implements OnInit {
	public restaurants = [];
	public showRestaurantForm: boolean;
	public newRestaurant: any;
	public currentRestaurant: any;
	public restaurantsMock;
	public showSpotForm: boolean;
	public spot: any = {};

	private catalogInstance: any;

	constructor(private web3Service: Web3Service) {

	}

	async ngOnInit() {
		this.restaurantsMock = restaurantsJson;
		this.catalogInstance = await (await this.web3Service.getCatalog()).deployed();
		await this.getRestaurants();
	}

	public addRestaurant() {
		this.showRestaurantForm = true;
		this.currentRestaurant = null;
	}

	public async saveRestaurant() {
		try {
			const result = await this.catalogInstance.createRestaurant(this.newRestaurant.id);
		} catch (e) {
			console.log(e);
		}
	}

	private async getRestaurants() {
		const restaurantsIds = await this.catalogInstance.getRestaurantsIds();
		this.restaurants = restaurantsIds.map((id) => {
			const restaurant = this.restaurantsMock.find((r) => `${r.id}` === id.valueOf());
			return restaurant;
		});
	}

	public cancel() {
		this.showRestaurantForm = false;
		this.currentRestaurant = null;
	}

	public async viewSpots(r) {
		this.showRestaurantForm = false;
		this.showSpotForm = false;

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

	public addSpot() {
		this.showSpotForm = true;
	}

	public async saveSpot() {
		try {
			const result = await this.catalogInstance.addSpotToRestaurant(this.currentRestaurant.id, this.spot.id, this.spot.min, this.spot.max);
		} catch (e) {
			console.log(e);
		}
	}

}
