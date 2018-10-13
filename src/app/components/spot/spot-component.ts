import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Web3Service } from '../../services/web3.service';

@Component({
  selector: 'spot-component',
  templateUrl: './spot-component.html',
  styleUrls: ['./spot-component.scss']
})
export class SpotComponent {
	@Input() public spot: any;
	@Output() public onSpotClick: EventEmitter<any> = new EventEmitter();

	constructor() {

	}

	public saveReserve() {
		this.onSpotClick.emit(this.spot);
	}

}
