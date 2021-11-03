import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlmacenRoutingModule } from './almacen.routing';
import { GestionarAlmacenComponent } from './gestionar-almacen/gestionar-almacen.component';

import { GestionarAlmacenRegisterComponent } from './gestionar-almacen/components/gestionar-almacen-register/gestionar-almacen-register.component';

// Dialog
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from '../../../shared/shared.module';
import { GestionarAlmacenUpdateComponent } from './gestionar-almacen/components/gestionar-almacen-update/gestionar-almacen-update.component';

const COMPONENTS = [
  GestionarAlmacenComponent,
  GestionarAlmacenRegisterComponent,
  GestionarAlmacenUpdateComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
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
