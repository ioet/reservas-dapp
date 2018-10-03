import { Component, OnInit } from '@angular/core';
import * as restaurantsJson from './../../../assets/data/restaurants.json';
import { Web3Service } from "../../util/web3.service";

@Component({
  selector: 'catalog-admin-component',
  templateUrl: './catalog-admin-component.html',
  styleUrls: ['./catalog-admin-component.scss']
})
export class CatalogAdminComponent implements OnInit {
	public restaurants = [];
	public showRestaurantForm: boolean
	public newRestaurant: any;
	public currentRestaurant:any;
	public restaurantsMock;

	private catalogInstance: any;

	constructor(private web3Service: Web3Service) {

	}

	async ngOnInit() {
		this.restaurantsMock = restaurantsJson;
		this.catalogInstance = await this.web3Service.Catalog.deployed();
	}

	addRestaurant() {
		this.showRestaurantForm = true;
	}

	saveRestaurant() {
		console.log('save restaurant');
		this.catalogInstance.createRestaurant(this.newRestaurant.id)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error)
			})
	}

	cancel() {
		this.showRestaurantForm = false;
	}

}
