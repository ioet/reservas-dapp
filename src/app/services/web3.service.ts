import { Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract';

import { WindowRefService } from './window-ref.service';
import metacoin_artifacts from '../../../build/contracts/MetaCoin.json';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class Web3Service {

  private web3: Web3;
  private accounts: string[];
  public MetaCoin: any;

  public accountsObservable = new Subject<string[]>();

  constructor(private windowRef: WindowRefService) {
    this.setupMetacoinContract();
  }

  private setupMetamaskWeb3() {
    if (!this.windowRef.nativeWindow) {
      throw new Error('Can not get the window');
    }
    if (!this.windowRef.nativeWindow.web3) {
      throw new Error('Not a metamask browser');
    }
    this.web3 = new Web3(this.windowRef.nativeWindow.web3.currentProvider);
  }

  private setupMetacoinContract() {
    this.setupMetamaskWeb3();
    this.MetaCoin = contract(metacoin_artifacts);
    this.MetaCoin.setProvider(this.web3.currentProvider);
  }
}
