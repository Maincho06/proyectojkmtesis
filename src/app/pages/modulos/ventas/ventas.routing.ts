import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "app/pages/pages.component";

const routes: Routes =
    [
        {
            path: '',
            component: PagesComponent,
            // children: [
            //     {
            //         path: 'gestionarCotizacion',
            //         children: [
            //             { path: '', component: GestionarCotizacionComponent },
            //             { path: 'dashboard/:id', component: DashboardCotizacionComponent }
            //         ]

            //     },
            //     {
            //         path: 'gestionarVenta',
            //         children: [
            //             { path: '', component: GestionarVentasComponent },
            //             { path: 'editar/:id', component: EditarVentaComponent },
            //         ]
            //     },

            // ]
        },
    ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VentasRoutingModule { }