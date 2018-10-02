import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header-component';
import { CatalogAdminComponent } from './components/catalog-admin/catalog-admin-component';
import { CatalogComponent } from './components/catalog/catalog-component';

import { AppRoutingModule } from './app-routing.module';

import { MetaModule } from "./meta/meta.module";

@NgModule({
  declarations: [
    AppComponent,
	HeaderComponent,
	CatalogAdminComponent,
	CatalogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	AppRoutingModule,
    MetaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
