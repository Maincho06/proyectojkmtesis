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
import {TooltipModule} from 'primeng/tooltip';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {InputMaskModule} from 'primeng/inputmask';
import {ToolbarModule} from 'primeng/toolbar';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputSwitchModule} from 'primeng/inputswitch';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { PasswordModule } from 'primeng/password';
import { MenuModule } from 'primeng/menu';
import {FileUploadModule} from 'primeng/fileupload';

const PRIMENG = [
  SidebarModule,
  ButtonModule,
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
  MessageModule,
  DynamicDialogModule,
  ConfirmDialogModule,
  TooltipModule,
  BreadcrumbModule,
  InputMaskModule,
  InputSwitchModule,
  PasswordModule,
  MenuModule,
  ToolbarModule,
  InputNumberModule,
  FileUploadModule
];

@NgModule({
  imports: [PRIMENG],
  exports: [PRIMENG],
})
export class PrimengModule {}
