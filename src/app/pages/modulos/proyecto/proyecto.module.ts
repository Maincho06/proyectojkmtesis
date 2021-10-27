import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos
import { ProyectoRoutingModule } from './proyecto.routing';
import { SharedModule } from '../../../shared/shared.module';

// Dialog
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

//Components
import { GestionarTrabajadorComponent } from './gestionar-trabajador/gestionar-trabajador.component';
import { DetalleTrabajadorComponent } from './gestionar-trabajador/detalle-trabajador/detalle-trabajador.component';


const components = [
  GestionarTrabajadorComponent , 
  DetalleTrabajadorComponent
]

@NgModule({
  declarations: [ ...components],
  imports: [
    CommonModule,
    ProyectoRoutingModule,
    SharedModule
  ],
  providers: [
    DialogService,
    ConfirmationService, 
    MessageService
  ]
})
export class ProyectoModule { }
