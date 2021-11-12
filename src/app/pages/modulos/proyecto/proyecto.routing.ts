import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "app/pages/pages.component";
import { GestionarTrabajadorComponent } from './gestionar-trabajador/gestionar-trabajador.component';
import { GestionarUsuarioComponent } from "./gestionar-usuario/gestionar-usuario.component";
import { UsuarioRegisterComponent } from "./gestionar-usuario/usuario-register/usuario-register.component";
import { UsuarioUpdateComponent } from "./gestionar-usuario/usuario-update/usuario-update.component";

const routes: Routes =
    [
        {
            path: '',
            component: PagesComponent,
            children: [
                {
                    path: 'gestionarTrabajadores',
                    children: [
                        { path: '', component: GestionarTrabajadorComponent }
                    ]
                },

                {
                    path: 'gestionarUsuarios',
                    children: [
                        { path: '', component: GestionarUsuarioComponent },
                        { path: 'registrar', component: UsuarioRegisterComponent },
                        { path: 'ver', component: UsuarioUpdateComponent },
                        { path: 'editar', component: UsuarioUpdateComponent },
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