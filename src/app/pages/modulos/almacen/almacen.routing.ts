import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "app/pages/pages.component";
import { GestionarAlmacenComponent } from './gestionar-almacen/gestionar-almacen.component';

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
            { path: '**', redirectTo: 'gestionarProyecto' },
        ]
    },

]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AlmacenRoutingModule {}