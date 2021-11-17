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

// Gestionar Usuario
import { GestionarUsuarioComponent } from './gestionar-usuario/gestionar-usuario.component';
import { UsuarioRegisterComponent } from './gestionar-usuario/usuario-register/usuario-register.component';
import { UsuarioUpdateComponent } from './gestionar-usuario/usuario-update/usuario-update.component';
import { GestionarTipoTrabajadorComponent } from './gestionar-tipo-trabajador/gestionar-tipo-trabajador.component';
import { DetalleTipoTrabajadorComponent } from './gestionar-tipo-trabajador/detalle-tipo-trabajador/detalle-tipo-trabajador.component';


const components = [
  GestionarTrabajadorComponent , 
  DetalleTrabajadorComponent,
  GestionarUsuarioComponent,
  UsuarioRegisterComponent,
  UsuarioUpdateComponent,
  GestionarTipoTrabajadorComponent,
  DetalleTipoTrabajadorComponent
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
