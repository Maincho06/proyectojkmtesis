import { Component, OnInit } from '@angular/core';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [

    { path: '/dashboard', title: 'Dashboard', icon: 'pi-home', class: '' },
    { path: '/ventas/gestionarCotizacion', title: 'Gestionar Cotización', icon: 'pi-credit-card', class: '' },
    { path: '/ventas/gestionarVenta', title: 'Gestionar Venta', icon: 'pi-dollar', class: '' },
    { path: '/ventas/gestionarCliente', title: 'Gestionar Cliente', icon: 'pi-user', class: '' },
    { path: '/proyecto/gestionarTrabajadores', title: 'Gestionar Trabajadores', icon: 'pi-users', class: '' },
    { path: '/proyecto/gestionarUsuarios', title: 'Gestionar Usuarios', icon: 'pi-users', class: '' },
    { path: '/proyecto/gestionarProyecto', title: 'Gestionar Proyecto', icon: 'pi-credit-card', class: '' },
    { path: '/almacen/gestionarAlmacen', title: 'Gestionar Almacen',     icon:'pi-users',    class: '' },
    { path: '/ventas/gestionarPedidos', title: 'Gestionar Pedido', icon: 'pi-inbox', class: ''}

];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    public menuItems: any[];

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

}