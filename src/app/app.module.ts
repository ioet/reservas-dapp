import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header-component';


import { Web3Service } from './services/web3.service';
import { WindowRefService } from './services/window-ref.service';

@NgModule({
  declarations: [
    AppComponent,
	HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
	  Web3Service,
	  WindowRefService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
