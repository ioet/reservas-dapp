import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogAdminComponent } from './components/catalog-admin/catalog-admin-component';
import { CatalogComponent } from './components/catalog/catalog-component';
import { ReservationsComponent } from './components/reservations/reservations-component';

const appRoutes: Routes = [
  { path: 'admin', component: CatalogAdminComponent },
  { path: 'reservas', component: ReservationsComponent },
	{ path: '', component: CatalogComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)],
        exports: [RouterModule],
})

export class AppRoutingModule {}
