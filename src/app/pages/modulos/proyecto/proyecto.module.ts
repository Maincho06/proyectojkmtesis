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
import { GestionarProyectoComponent } from './gestionar-proyecto/gestionar-proyecto.component';
import { DatosProyectoComponent } from './gestionar-proyecto/components/datos-proyecto/datos-proyecto.component';
import { TrabajadorProyectoComponent } from './gestionar-proyecto/components/trabajador-proyecto/trabajador-proyecto.component';
import { ActividadProyectoComponent } from './gestionar-proyecto/components/actividad-proyecto/actividad-proyecto.component';
import { DetalleGestionarProyectoComponent } from './gestionar-proyecto/components/detalle-gestionar-proyecto/detalle-gestionar-proyecto.component';


const components = [
  GestionarTrabajadorComponent , 
  DetalleTrabajadorComponent,
  GestionarUsuarioComponent,
  UsuarioRegisterComponent,
  UsuarioUpdateComponent

]

@NgModule({
  declarations: [ ...components, UsuarioRegisterComponent, UsuarioUpdateComponent, GestionarProyectoComponent, DatosProyectoComponent, TrabajadorProyectoComponent, ActividadProyectoComponent, DetalleGestionarProyectoComponent],
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
