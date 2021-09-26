import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes =
    [
        {
            path: 'dashboard',
            component: PagesComponent,
            children: [
                { path: '', component: DashboardComponent }
            ]
        },
        { path: 'ventas'  , loadChildren: () => import('./modulos/ventas/ventas.module').then((m) => m.VentasModule) },
        { path: 'proyecto', loadChildren: () => import('./modulos/proyecto/proyecto.module').then((m) => m.ProyectoModule) },
        { path: 'almacen' , loadChildren: () => import('./modulos/almacen/almacen.module').then((m) => m.AlmacenModule) },
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule { }