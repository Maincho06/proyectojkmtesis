import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "app/pages/pages.component";
import { GestionarAlmacenComponent } from './gestionar-almacen/gestionar-almacen.component';
import { DetalleProductoComponent } from "./gestionar-inventario/detalle-producto/detalle-producto.component";
import { GestionarInventarioComponent } from './gestionar-inventario/gestionar-inventario.component';

const routes: Routes = [

    {
        path: '',
        component: PagesComponent,
        children: [
            { 
                path: 'gestionarAlmacen',
                children: [
                    { path: '', component: GestionarAlmacenComponent}
                ]
            },
            {
                path: 'gestionarInventario',
                children: [
                    {
                        path: '',
                        component: GestionarInventarioComponent,
                        data: {
                            breadcrumb: '',
                        },
                    },
                    {
                        path: 'crear',
                        component: DetalleProductoComponent,
                        data: {
                            breadcrumb: '/almacen/gestionarInventario',
                        },
                    }
                ],
                data: {
                    breadcrumb: {
                        label: 'Gestionar Inventario',
                        routerLink: '/almacen/gestionarInventario',
                    },
                },
            },
            { path: '**', redirectTo: 'gestionarAlmacen' },
        ]
    },

]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AlmacenRoutingModule {}