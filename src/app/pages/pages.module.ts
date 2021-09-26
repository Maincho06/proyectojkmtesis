import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { PagesRoutingModule } from './pages.routing';
import { NgxSpinnerModule } from 'ngx-spinner';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrimengModule } from 'app/shared/primeng.module';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    // PrimengModule,
    SharedModule,
    RouterModule,
    PagesRoutingModule,
    NgxSpinnerModule
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
