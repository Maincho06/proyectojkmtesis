import { NgModule } from '@angular/core';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
import {CalendarModule} from 'primeng/calendar';
import {TreeTableModule} from 'primeng/treetable';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CardModule} from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import { ToastModule } from "primeng/toast";
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

const PRIMENG = [
  SidebarModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  TableModule,
  TabViewModule,
  CalendarModule,
  TreeTableModule,
  InputTextareaModule,
  CardModule,
  DialogModule,
  DropdownModule,
  ToastModule,
  MessagesModule,
  MessageModule
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
