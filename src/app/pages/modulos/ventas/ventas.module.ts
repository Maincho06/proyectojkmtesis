import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

import { VentasRoutingModule } from './ventas.routing';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    SharedModule
  ]
})
export class VentasModule { }
