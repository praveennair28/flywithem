import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { FlightDetailComponent } from './flight-detail/flight-detail.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CommonService } from './service/common_service';
import { ValidationMessageComponent } from './validation-message/validation-message.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     providers: [CommonService,HttpClient,HttpHandler],
     imports:[BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      FormsModule,
      NgbModule],
      declarations: [
        AppComponent,
        SearchBarComponent,
        DatePickerComponent,
        FlightDetailComponent,
        LoadingIndicatorComponent,
        ValidationMessageComponent
      ],
    }).compileComponents();
  }));

  
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.airportList = ['1','2'];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit', () => {
    component.ngOnInit();
    expect(component.airportList).toBeTruthy();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('get airport list called', async(() =>
  {
    let cmnService = fixture.debugElement.injector.get(CommonService);   

    component.loadAirportList();
    expect(component.loadAirportList()).toBeTruthy();
  
  }));

  it('get flight list', async(() =>
  {
    let cmnService = fixture.debugElement.injector.get(CommonService);  

    component.getFlightStatus();
  
  }));

  it('get flight list called', async(() =>
  {
    let cmnService = fixture.debugElement.injector.get(CommonService);  

    component.getFlightStatus();
  
  }));

  it('validate() called', async(() =>
  {
    component.searchDate=null;
    component.validationMsg = '';
    component.validate();  
  }));

});
