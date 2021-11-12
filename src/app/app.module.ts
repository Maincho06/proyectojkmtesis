import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { VerticalBarChartComponent } from './pages/dashboard/vertical-bar-charts/vertical-bar-charts.component';
import { AdvancePieChartComponent } from './pages/dashboard/advance-pie-charts/advance-pie-charts.component';
import { PagesModule } from './pages/pages.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InterceptorService } from '@services/interceptor.service';

import { MessageService } from "primeng/api";
import { SharedModule } from 'app/shared/shared.module';
import { LoginModule } from './pages/login/login.module';
import { JwtModule } from '@auth0/angular-jwt';


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
    JwtModule,
    SharedModule,
    NgxChartsModule,
    NgxSpinnerModule,
    LoginModule
  ],
  exports: [
    VerticalBarChartComponent,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
