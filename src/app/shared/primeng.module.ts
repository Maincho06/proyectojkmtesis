import { NgModule } from '@angular/core';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';


const PRIMENG = [
  SidebarModule,
  ButtonModule,
  TableModule,
  InputTextModule
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
