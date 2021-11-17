import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from 'app/pages/pages.component';
import { GestionarTipoTrabajadorComponent } from './gestionar-tipo-trabajador/gestionar-tipo-trabajador.component';
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
        path: 'gestionarTipoTrabajador',
        children: [
          {
            path: '',
            component: GestionarTipoTrabajadorComponent,
            data: { breadcrumb: '' },
          },
        ],
        data: {
          breadcrumb: {
            label: 'Gestionar Tipo Trabajador',
            routerLink: '/proyecto/gestionarTipoTrabajador',
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

      { path: '**', redirectTo: 'gestionarProyecto' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProyectoRoutingModule {}
