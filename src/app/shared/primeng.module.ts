import { NgModule } from '@angular/core';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';


const PRIMENG = [
  SidebarModule,
  ButtonModule
];

@NgModule({
  imports: [
    PRIMENG
  ],
  exports: [
    PRIMENG
  ]
})
export class PrimengModule { }
