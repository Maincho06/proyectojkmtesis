import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from 'app/pages/pages.component';
import { GestionarClienteComponent } from './gestionar-cliente/gestionar-cliente.component';
import { GestionarCotizacionDetalleComponent } from './gestionar-cotizacion/components/gestionar-cotizacion-detalle/gestionar-cotizacion-detalle.component';
import { GestionarCotizacionComponent } from './gestionar-cotizacion/gestionar-cotizacion.component';
import { DetalleVentaComponent } from './gestionar-venta/detalle-venta/detalle-venta.component';
import { GestionarVentaComponent } from './gestionar-venta/gestionar-venta.component';
import { GestionarPedidosComponent } from './gestionar-pedidos/gestionar-pedidos.component';
import { DetallePedidoComponent } from './gestionar-pedidos/detalle-pedido/detalle-pedido.component';
import { GestionarCatalogoComponent } from './gestionar-catalogo/gestionar-catalogo.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'gestionarCotizacion',
        children: [
          {
            path: '',
            component: GestionarCotizacionComponent,
            data: {
              breadcrumb: '',
            },
          },
          {
            path: 'crear',
            component: GestionarCotizacionDetalleComponent,
            data: {
              breadcrumb: {
                label: 'Registrar',
                routerLink: '/ventas/gestionarCotizacion',
              },
            },
          },
          {
            path: ':id',
            component: GestionarCotizacionDetalleComponent,
            data: {
              breadcrumb: {
                label: 'Editar',
                routerLink: '/ventas/gestionarCotizacion',
              },
            },
          },
        ],
        data: {
          breadcrumb: {
            label: 'Gestionar Cotizacion',
            routerLink: '/ventas/gestionarCotizacion',
          },
        },
      },
      {
        path: 'gestionarVenta',
        children: [
          {
            path: '',
            component: GestionarVentaComponent,
            data: { breadcrumb: '' },
          },
          {
            path: 'ver/:id',
            component: DetalleVentaComponent,
            data: {
              breadcrumb: {
                label: 'Visualizar',
                routerLink: '/ventas/gestionarVenta/',
              },
            },
          },
          {
            path: 'editar/:id',
            component: DetalleVentaComponent,
            data: {
              breadcrumb: {
                label: 'Editar',
                routerLink: '/ventas/gestionarVenta/',
              },
            },
          },
        ],
        data: {
          breadcrumb: {
            label: 'Gestionar Venta',
            routerLink: '/ventas/gestionarVenta',
          },
        },
      },
      {
        path: 'gestionarCliente',
        children: [
          {
            path: '',
            component: GestionarClienteComponent,
            data: { breadcrumb: '' },
          },
        ],
        data: {
          breadcrumb: {
            label: 'Gestionar Cliente',
            routerLink: '/ventas/gestionarCliente',
          },
        },
      },
      {
        path: 'gestionarPedido',
        children: [
          {
            path: '',
            component: GestionarPedidosComponent,
            data: {
              breadcrumb: ''
            }
          },
          {
            path: ':id',
            component: DetallePedidoComponent,
            data: {
              breadcrumb: {
                label: 'Editar',
                routerLink: '/ventas/gestionarPedido',
              },
            },
          },
        ],
        data: {
          breadcrumb: {
            label: 'Gestionar Pedido',
            routerLink: '/ventas/gestionarPedido'
          }
        }
      },
      {
        path: 'gestionarCatalogo',
        children: [
          {
            path: '',
            component: GestionarCatalogoComponent,
            data: {
              breadcrumb: ''
            }
          }
        ],
        data: {
          breadcrumb: {
            label: 'Gestionar Catálogo',
            routerLink: '/ventas/gestionarCatalogo'
          }
        }
      }
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentasRoutingModule { }
