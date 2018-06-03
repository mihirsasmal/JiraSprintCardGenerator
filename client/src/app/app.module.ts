import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ServiceHandler} from './servicehandler';
import { AngularDualListBoxModule } from 'angular-dual-listbox';



import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,
    FormsModule,ReactiveFormsModule,
    CommonModule,
    AngularDualListBoxModule
  ],
  providers: [ServiceHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
