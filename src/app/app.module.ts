import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { NgSelectModule } from '@ng-select/ng-select';

import { CreateVehicleComponent } from './components/vehicle/create-vehicle/create-vehicle.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CreateVehicleComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FileUploadModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule ,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
