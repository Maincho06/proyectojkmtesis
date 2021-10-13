import { NgModule } from '@angular/core';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';


const PRIMENG = [
  SidebarModule,
  ButtonModule,
  TableModule
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
