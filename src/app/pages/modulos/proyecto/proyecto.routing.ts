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
            //         path: 'gestionarProyecto',
            //         children: [
            //             { path: '',   component: GestionarProyectoComponent },
            //             { path: 'dashboard/:id', component: DashboardProyectoComponent },
            //         ]
            //     },
            //     { 
            //         path: 'gestionarTrabajadores',
            //         children: [
            //             { path: '', component: GestionarTrabajadoresComponent},
            //             { path: 'editar/:id', component: GestionarTrabajadorComponent },
            //             { path: 'agregar', component: GestionarTrabajadorComponent }
            //         ]
            //     },
            //     { path: '**', redirectTo: 'gestionarProyecto' },
            // ]
        },
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProyectoRoutingModule { }