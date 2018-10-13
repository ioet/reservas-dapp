import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogAdminComponent } from './components/catalog-admin/catalog-admin-component';

const appRoutes: Routes = [
  { path: 'admin', component: CatalogAdminComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)],
        exports: [RouterModule],
})

export class AppRoutingModule {}
