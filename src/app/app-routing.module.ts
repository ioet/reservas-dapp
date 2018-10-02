import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    // { path: '', component: null },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)],
        exports: [RouterModule],
})

export class AppRoutingModule {}
