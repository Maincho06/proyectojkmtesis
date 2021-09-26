import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './client/home/home.component';
import { NopagefoundComponent } from '@components/nopagefound/nopagefound.component';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: '**', component: NopagefoundComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), 
    PagesRoutingModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
