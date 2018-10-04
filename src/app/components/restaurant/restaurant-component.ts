import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Web3Service } from '../../services/web3.service';

@Component({
  selector: 'restaurant-component',
  templateUrl: './restaurant-component.html',
  styleUrls: ['./restaurant-component.scss']
})
export class RestaurantComponent {
	@Input() public restaurant: any;
	@Output() public onRestaurantClick: EventEmitter<any> = new EventEmitter();

	constructor() {

	}

	public viewRestaurant() {
		this.onRestaurantClick.emit(this.restaurant);
	}

}
