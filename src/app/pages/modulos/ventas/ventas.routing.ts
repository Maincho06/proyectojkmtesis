import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "app/pages/pages.component";
import { GestionarClienteComponent } from "./gestionar-cliente/gestionar-cliente.component";
import { GestionarCotizacionDetalleComponent } from "./gestionar-cotizacion/components/gestionar-cotizacion-detalle/gestionar-cotizacion-detalle.component";
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
                        { path: '', component: GestionarCotizacionComponent },
                        { path:'crear', component: GestionarCotizacionDetalleComponent},
                        { path:':id', component: GestionarCotizacionDetalleComponent}
                    ]

                },
                {
                    path: 'gestionarVenta',
                    children: [
                        { path: '', component: GestionarVentaComponent },
                    ]
                },
                {
                    path: 'gestionarCliente',
                    children: [
                        { path: '', component: GestionarClienteComponent },
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