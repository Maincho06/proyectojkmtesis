import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoRoutingModule } from './proyecto.routing';
import { SharedModule } from '../../../shared/shared.module';
import { GestionarTrabajadorComponent } from './gestionar-trabajador/gestionar-trabajador.component';

@NgModule({
  declarations: [
  GestionarTrabajadorComponent],
  imports: [
    CommonModule,
    ProyectoRoutingModule,
    SharedModule
  ]
})
export class ProyectoModule { }
