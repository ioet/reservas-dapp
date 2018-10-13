import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../services/web3.service';
import * as restaurantsJson from './../../../assets/data/restaurants.json';

@Component({
  selector: 'reservations-component',
  templateUrl: './reservations-component.html',
  styleUrls: ['./reservations-component.scss']
})

export class ReservationsComponent implements OnInit {
  public restaurants;
	public currentRestaurant: any;

  public reservations;

	private catalogInstance;
	private restaurantsMock: any;

	constructor(private web3Service: Web3Service) {

	}

  async getSpotsByRestaurant(id) {
    const [spotsId, minAllowances, maxAllowances] = await this.catalogInstance.getSpotsByRestaurant(id);

    if (!!spotsId && spotsId.length) {
      return spotsId.map((idx, index) => {

          return {
            id: idx.valueOf(),
            min: minAllowances[index].valueOf(),
            max: maxAllowances[index].valueOf()
          };
      });
    }

  }
  async ngOnInit() {
    this.reservations = [];
    this.restaurantsMock = restaurantsJson;
    this.catalogInstance = await (await this.web3Service.getCatalog()).deployed();

    const restaurantsIds = await this.catalogInstance.getRestaurantsIds();
    const promiseRestaurants = restaurantsIds.map( async(id, index) => {
      const spots = await this.getSpotsByRestaurant(id);
      const restaurant = this.restaurantsMock.find((r) => `${r.id}` === id.valueOf());
      restaurant.spots = spots;
      return restaurant;
    });

    this.restaurants = await Promise.all(promiseRestaurants);
    // Get all reservations

  	const allReservations = (await this.catalogInstance.getRsrvsCount()).valueOf();
    for (let i = 0; i < allReservations; i++) {
      const [ id, spotId, restaurantId, date, client ] = await this.catalogInstance.getRsrvByIndex(i);

      const restaurant = this.restaurants.find(async (r) => restaurantId.valueOf() === r.id);
	  const d = date.valueOf();
      this.reservations.push({ id: id.valueOf(),
                               spot: restaurant.spots.find(async (spot) => spotId.valueOf() === spot.id.valueOf()),
                               restaurant: restaurant.name,
                               date: d,
                               client: client.valueOf()});
    }

  }

}
