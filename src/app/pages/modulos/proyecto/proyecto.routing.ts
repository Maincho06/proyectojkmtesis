import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from 'app/pages/pages.component';
import { DetalleGestionarProyectoComponent } from './gestionar-proyecto/components/detalle-gestionar-proyecto/detalle-gestionar-proyecto.component';
import { GestionarProyectoComponent } from './gestionar-proyecto/gestionar-proyecto.component';
import { GestionarTrabajadorComponent } from './gestionar-trabajador/gestionar-trabajador.component';
import { GestionarUsuarioComponent } from './gestionar-usuario/gestionar-usuario.component';
import { UsuarioRegisterComponent } from './gestionar-usuario/usuario-register/usuario-register.component';
import { UsuarioUpdateComponent } from './gestionar-usuario/usuario-update/usuario-update.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'gestionarTrabajadores',
        children: [
          {
            path: '',
            component: GestionarTrabajadorComponent,
            data: { breadcrumb: '' },
          },
        ],
        data: {
          breadcrumb: {
            label: 'Gestionar Trabajador',
            routerLink: '/proyecto/gestionarTrabajadores',
          },
        },
      },
      {
        path: 'gestionarUsuarios',
        children: [
          {
            path: '',
            component: GestionarUsuarioComponent,
            data: {
              breadcrumb: '',
            },
          },
          {
            path: 'registrar',
            component: UsuarioRegisterComponent,
            data: {
              breadcrumb: {
                label: 'Registrar',
                routerLink: '/proyecto/gestionarUsuarios',
              },
            },
          },
          {
            path: 'ver',
            component: UsuarioUpdateComponent,
            data: {
              breadcrumb: {
                label: 'Ver',
                routerLink: '/proyecto/gestionarUsuarios',
              },
            },
          },
          {
            path: 'editar',
            component: UsuarioUpdateComponent,
            data: {
              breadcrumb: {
                label: 'Editar',
                routerLink: '/proyecto/gestionarUsuarios',
              },
            },
          },
        ],
        data: {
          breadcrumb: {
            label: 'Gestionar Usuario',
            routerLink: '/proyecto/gestionarUsuarios',
          },
        },
      },
      {
        path: 'gestionarProyecto',
        children: [
          {
            path: '',
            component: GestionarProyectoComponent,
            data: {
              breadcrumb: '',
            },
          },
          {
            path: ':id',
            component: DetalleGestionarProyectoComponent,
            data: {
              breadcrumb: {
                label: 'Editar',
                routerLink: '/proyecto/gestionarProyecto/:id',
              },
            },
          },
        ],
        data: {
          breadcrumb: {
            label: 'Gestionar Proyecto',
            routerLink: '/proyecto/gestionarProyecto',
          },
        },
      },
      { path: '**', redirectTo: 'gestionarProyecto' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProyectoRoutingModule {}
