import { Component, OnInit } from '@angular/core';
import * as restaurantsJson from './../../../assets/data/restaurants.json';

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

	constructor() {

	}

	ngOnInit() {
		this.restaurantsMock = restaurantsJson;
	}

	addRestaurant() {
		this.showRestaurantForm = true;
	}

	saveRestaurant() {
		console.log('save restaurant');
	}

	cancel() {
		this.showRestaurantForm = false;
	}

}
