import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "app/pages/pages.component";
import { GestionarTrabajadorComponent } from './gestionar-trabajador/gestionar-trabajador.component';

const routes: Routes =
    [
        {
            path: '',
            component: PagesComponent,
            children: [
                { 
                    path: 'gestionarTrabajadores',
                    children: [
                        { path: '', component: GestionarTrabajadorComponent}
                    ]
                },
                { path: '**', redirectTo: 'gestionarProyecto' },
            ]
        },
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProyectoRoutingModule { }