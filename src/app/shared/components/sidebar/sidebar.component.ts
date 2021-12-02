import { Component, OnInit } from '@angular/core';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [

    { path: '/dashboard', title: 'Dashboard', icon: 'pi-home', class: '' },

    // Proyecto
    { path: '/proyecto/gestionarUsuarios', title: 'Gestionar Usuarios', icon: 'pi-users', class: '' },
    { path: '/proyecto/gestionarTipoTrabajador', title: 'Gestionar Tipo Trabajador',     icon:'pi-spinner',    class: '' },
    { path: '/proyecto/gestionarTrabajadores', title: 'Gestionar Trabajadores', icon: 'pi-id-card', class: '' },
    { path: '/proyecto/gestionarProyecto', title: 'Gestionar Proyecto', icon: 'pi-credit-card', class: '' },

    // Ventas
    { path: '/ventas/gestionarCliente', title: 'Gestionar Cliente', icon: 'pi-briefcase', class: '' },
    { path: '/ventas/gestionarCotizacion', title: 'Gestionar Cotización', icon: 'pi-credit-card', class: '' },
    { path: '/ventas/gestionarVenta', title: 'Gestionar Venta', icon: 'pi-dollar', class: '' },
    { path: '/ventas/gestionarPedido', title: 'Gestionar Pedido', icon: 'pi-inbox', class: ''},
    { path: '/ventas/gestionarCatalogo', title: 'Gestionar Catálogo', icon: 'pi-book', class: ''},

    // Almacen
    { path: '/almacen/gestionarAlmacen', title: 'Gestionar Almacen',     icon:'pi-map-marker',    class: '' },
    { path: '/almacen/gestionarInventario', title: 'Gestionar Inventario',     icon:'pi-table',    class: '' },
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    visibleSidebar1 = true;
    public menuItems: any[];

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

}