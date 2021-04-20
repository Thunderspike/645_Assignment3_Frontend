import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ChipModule } from 'primeng/chip';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { MessageService } from 'primeng/api';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HomeComponent,
    DashboardComponent,
  ],
  imports: [
    MenubarModule,
    CardModule,
    PanelModule,
    ButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    InputMaskModule,
    ChipModule,
    ToastModule,
    FormsModule,
    CheckboxModule,
    RadioButtonModule,
    HttpClientModule,
    AppRoutingModule,

    // left below in place in case app needs to be pulled from server services

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.

    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
    //   dataEncapsulation: false,
    // }),
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(public messageService: MessageService) {}
}
