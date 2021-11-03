import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

import { VentasRoutingModule } from './ventas.routing';
import { GestionarCotizacionComponent } from './gestionar-cotizacion/gestionar-cotizacion.component';

import { GestionarVentaComponent } from './gestionar-venta/gestionar-venta.component';
import { GestionarCotizacionDetalleComponent } from './gestionar-cotizacion/components/gestionar-cotizacion-detalle/gestionar-cotizacion-detalle.component';
import { DatosCotizacionComponent } from './gestionar-cotizacion/components/datos-cotizacion/datos-cotizacion.component';
import { TrabajadoresCotizacionComponent } from './gestionar-cotizacion/components/trabajadores-cotizacion/trabajadores-cotizacion.component';
import { ActividadesCotizacionComponent } from './gestionar-cotizacion/components/actividades-cotizacion/actividades-cotizacion.component';
import { GestionarClienteComponent } from './gestionar-cliente/gestionar-cliente.component';
import { GestionarClientRegisterComponent } from './gestionar-cliente/components/gestionar-client-register/gestionar-client-register.component';
import { GestionarClientUpdateComponent } from './gestionar-cliente/components/gestionar-client-update/gestionar-client-update.component';
import { DetalleVentaComponent } from './gestionar-venta/detalle-venta/detalle-venta.component';
import { GestionarPedidosComponent } from './gestionar-pedidos/gestionar-pedidos.component';
import { ModalDetallePedidoComponent } from './gestionar-pedidos/modal-detalle-pedido/modal-detalle-pedido.component';

// Dialog
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';



@NgModule({
  declarations: [
    GestionarCotizacionComponent,
    GestionarVentaComponent,
    GestionarCotizacionDetalleComponent,
    DatosCotizacionComponent,
    TrabajadoresCotizacionComponent,
    ActividadesCotizacionComponent,
    GestionarClienteComponent,
    GestionarClientRegisterComponent,
    GestionarClientUpdateComponent,
    DetalleVentaComponent,
    GestionarPedidosComponent,
    ModalDetallePedidoComponent,
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    SharedModule
  ],
  providers: [
    DialogService,
    ConfirmationService, 
    MessageService
  ]
})
export class VentasModule { }
