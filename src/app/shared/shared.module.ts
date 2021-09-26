import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDirective } from './directives/onlyNumbers.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NopagefoundComponent } from './components/nopagefound/nopagefound.component';
import { FormularioCardComponent } from './components/formulario-container/formulario-card.component';
import { TableContainerComponent } from './components/table-container/table-container.component';
import { ModalContainerComponent } from './components/modal-container/modal-container.component';
import { CardActividadComponent } from './components/card-actividad/card-actividad.component';
import { RouterModule } from '@angular/router';
import { PrimengModule } from './primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMPONENTS =  [
  NavbarComponent,
  SidebarComponent,
  FooterComponent,
  NopagefoundComponent,
  FormularioCardComponent,
  TableContainerComponent,
  ModalContainerComponent,
  CardActividadComponent
]

const DIRECTIVES = [
  NumberDirective,
]

const MODULES = [
  CommonModule,
  RouterModule,
  PrimengModule,
  FormsModule,
  ReactiveFormsModule
]

@NgModule({
  declarations: [
    COMPONENTS,
    DIRECTIVES,
  ],
  imports: [
    MODULES
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    FormularioCardComponent,
    TableContainerComponent,
    ModalContainerComponent,
    MODULES,
    DIRECTIVES,
    CardActividadComponent
  ]
})
export class SharedModule { }
