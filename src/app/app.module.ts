import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { FlightDetailComponent } from './flight-detail/flight-detail.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { ValidationMessageComponent } from './validation-message/validation-message.component';
//import { NgbModule } 

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    DatePickerComponent,
    FlightDetailComponent,
    LoadingIndicatorComponent,
    ValidationMessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
