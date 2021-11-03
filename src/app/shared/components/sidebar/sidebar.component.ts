import { Component, OnInit } from '@angular/core';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon:'nc-bank', class: '' },
  { path: '/ventas/gestionarCotizacion',     title: 'Gestionar Cotización',             icon:'nc-bank',    class: '' },
  { path: '/ventas/gestionarVenta',          title: 'Gestionar Venta',              icon:'nc-bank',      class: '' },
  { path: '/ventas/gestionarCliente',          title: 'Gestionar Cliente',              icon:'nc-bank',      class: '' },
  { path: '/proyecto/gestionarTrabajadores', title: 'Gestionar Trabajadores',     icon:'nc-bank',    class: '' },
  { path: '/almacen/gestionarAlmacen', title: 'Gestionar Almacen',     icon:'nc-bank',    class: '' },
  // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
  selector   : 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls  : ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

}
