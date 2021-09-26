import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoRoutingModule } from './proyecto.routing';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProyectoRoutingModule,
    SharedModule
  ]
})
export class ProyectoModule { }
