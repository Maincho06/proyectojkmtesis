import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlmacenRoutingModule } from './almacen.routing';
import { GestionarAlmacenComponent } from './gestionar-almacen/gestionar-almacen.component';


// Dialog
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from '../../../shared/shared.module';
import { DetalleAlmacenComponent } from './gestionar-almacen/detalle-almacen/detalle-almacen.component';
import { GestionarInventarioComponent } from './gestionar-inventario/gestionar-inventario.component';
import { DetalleProductoComponent } from './gestionar-inventario/detalle-producto/detalle-producto.component';

const COMPONENTS = [
  GestionarAlmacenComponent,
  DetalleAlmacenComponent,
  GestionarInventarioComponent,
  DetalleProductoComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    AlmacenRoutingModule,
    SharedModule
  ],
  providers: [
    DialogService,
    ConfirmationService, 
    MessageService,
  ],
})
export class AlmacenModule { }
