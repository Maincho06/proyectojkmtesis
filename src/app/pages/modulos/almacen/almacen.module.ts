import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlmacenRoutingModule } from './almacen.routing';
import { GestionarAlmacenComponent } from './gestionar-almacen/gestionar-almacen.component';
import { SharedModule } from 'app/shared/shared.module';
import { GestionarAlmacenRegisterComponent } from './gestionar-almacen/components/gestionar-almacen-register/gestionar-almacen-register.component';
import { GestionarAlmacenUpdate } from './gestionar-almacen/components/gestionar-almacen-update/gestionar-almacen-update.component';

// Dialog
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

const COMPONENTS = [
  GestionarAlmacenComponent,
  GestionarAlmacenRegisterComponent,
  GestionarAlmacenUpdate
];

@NgModule({
  declarations: [
    GestionarAlmacenComponent,
    GestionarAlmacenRegisterComponent,
    GestionarAlmacenUpdate],
  imports: [
    CommonModule,
    AlmacenRoutingModule,
    SharedModule
  ],
  providers: [
    DialogService,
    ConfirmationService, 
    MessageService
  ],
})
export class AlmacenModule { }
