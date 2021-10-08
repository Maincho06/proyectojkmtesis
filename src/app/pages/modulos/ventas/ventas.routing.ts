import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "app/pages/pages.component";
import { GestionarCotizacionComponent } from './gestionar-cotizacion/gestionar-cotizacion.component';
import { GestionarVentaComponent } from './gestionar-venta/gestionar-venta.component';

const routes: Routes =
    [
        {
            path: '',
            component: PagesComponent,
            children: [
                {
                    path: 'gestionarCotizacion',
                    children: [
                        { path: '', component: GestionarCotizacionComponent }
                    ]

                },
                {
                    path: 'gestionarVenta',
                    children: [
                        { path: '', component: GestionarVentaComponent },
                    ]
                },

            ]
        },
    ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VentasRoutingModule { }