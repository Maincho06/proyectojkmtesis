import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService as AuthGuard } from '@services/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [{ path: '', component: DashboardComponent }],
    canActivate: [AuthGuard],
  },
  {
    path: 'ventas',
    loadChildren: () =>
      import('./modulos/ventas/ventas.module').then((m) => m.VentasModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'proyecto',
    loadChildren: () =>
      import('./modulos/proyecto/proyecto.module').then(
        (m) => m.ProyectoModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'almacen',
    loadChildren: () =>
      import('./modulos/almacen/almacen.module').then((m) => m.AlmacenModule),
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
