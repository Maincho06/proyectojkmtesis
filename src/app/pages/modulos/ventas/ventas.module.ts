import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

import { VentasRoutingModule } from './ventas.routing';
import { GestionarCotizacionComponent } from './gestionar-cotizacion/gestionar-cotizacion.component';

import { GestionarVentaComponent } from './gestionar-venta/gestionar-venta.component';
import { DetalleVentaComponent } from './gestionar-venta/detalle-venta/detalle-venta.component';



@NgModule({
  declarations: [
    GestionarCotizacionComponent,
    GestionarVentaComponent,
    DetalleVentaComponent,
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    SharedModule
  ]
})
export class VentasModule { }
