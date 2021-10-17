import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VerticalBarChartComponent } from './pages/dashboard/vertical-bar-charts/vertical-bar-charts.component';
import { AdvancePieChartComponent } from './pages/dashboard/advance-pie-charts/advance-pie-charts.component';
import { PagesModule } from './pages/pages.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    AppComponent,
    VerticalBarChartComponent,
    AdvancePieChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PagesModule,
    HttpClientModule,
    NgxChartsModule,
    NgxSpinnerModule
  ],
  exports: [
    VerticalBarChartComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
