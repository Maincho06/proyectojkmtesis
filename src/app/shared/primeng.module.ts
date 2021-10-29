import { NgModule } from '@angular/core';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {TooltipModule} from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ToolbarModule} from 'primeng/toolbar';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputSwitchModule} from 'primeng/inputswitch';
import {CalendarModule} from 'primeng/calendar';

// import {} from '';

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

const PRIMENG = [
  SidebarModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  TooltipModule,
  DialogModule,
  DynamicDialogModule,
  DropdownModule,
  ConfirmDialogModule,
  BreadcrumbModule,
  ToastModule,
  MessagesModule,
  MessageModule,
  ToolbarModule,
  InputNumberModule,
  InputSwitchModule,
  CalendarModule
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
