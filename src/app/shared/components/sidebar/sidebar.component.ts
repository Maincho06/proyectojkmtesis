import { Component, OnInit } from '@angular/core';

// declare const $: any;
// declare interface IRouteInfo {
//   path : string;
//   title: string;
//   icon : string;
//   class: string;
// }
// export const ROUTES: IRouteInfo[] = [
//   { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: 'Dashboard' },
//   { path: '/proyecto/gestionarTrabajadores', title: 'Gestionar Trabajadores', icon: 'person', class: 'Ventas' },
//   { path: '/ventas/gestionarCotizacion', title: 'Gestionar Cotización', icon: 'person', class: 'Cotización' },
//   { path: '/ventas/gestionarVenta', title: 'Gestionar Venta', icon: 'person', class: 'Venta' },
//   { path: '/proyecto/gestionarProyecto', title: 'Gestionar Proyectos', icon: 'person', class: 'Proyecto' },
// ];

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
  { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
  { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
  { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
  { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
  { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
  { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
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
