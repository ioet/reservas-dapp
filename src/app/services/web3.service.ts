import { Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract';

import { WindowRefService } from './window-ref.service';
import catalog_artifacts from '../../../build/contracts/Catalog.json';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class Web3Service {

	private web3: Web3;
	private accounts: string[];
	public Catalog: any;

	public accountsObservable = new Subject<string[]>();

	constructor(private windowRef: WindowRefService) {
		this.setupCatalogContract();
	}

	private async setupMetamaskWeb3() {
		if (!this.windowRef.nativeWindow) {
			throw new Error('Can not get the window');
		}
		if (!this.windowRef.nativeWindow.web3) {
			throw new Error('Not a metamask browser');
		}
		this.web3 = new Web3(this.windowRef.nativeWindow.web3.currentProvider);
	}

	private setupCatalogContract() {
		this.setupMetamaskWeb3();

		this.Catalog = contract(catalog_artifacts);
		this.Catalog.setProvider(this.web3.currentProvider);
	}

	async getCatalog() {
		const accounts = await this.web3.eth.getAccounts();
		this.Catalog.web3.eth.defaultAccount = accounts[0];
		return this.Catalog;
	}
}
