import { splitNsName } from '@angular/compiler';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { AppConstant } from './appconstant';
import { Airport } from './models/airport';
import { CommonService } from './service/common_service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges, OnDestroy{
  title = 'flight-status';

  public airportList: any=[];
  public airports: any=[];
  public flightList: any;
  public leavingFrom_placeholder: any;
  public goingTo_placeholder: any;
  public showFlightList: boolean;
  public showloadingIndicator: boolean;
  public showValidationMsg: boolean;
  public validationMsg: string;
  public searchDate: string;
  public leavingFrom: string;
  public leavingCityName: string;
  public goingTo: string;
  public goingToCityName: string;
  private airportSubscription: SubscriptionLike;
  private flightStatusSubscription: SubscriptionLike;



  constructor(private commonService: CommonService) {
  }

  ngOnInit() {
    this.loadAirportList();
    this.showloadingIndicator=false;
    this.showValidationMsg = false;
  }
  ngOnChanges(): void {
    this.loadAirportList();
    this.showloadingIndicator=false;
    this.showValidationMsg = false;
  }
  setLeavingFrom(event){
    this.leavingFrom = event;
  }

  setGoingTo(event){
    this.goingTo = event;
  }
  setDate(date){
    this.searchDate = date;
  }

  showFlights(){
    this.showValidationMsg = false;
    this.validationMsg = null;
    this.showloadingIndicator=true;
    this.validate();
    this.getFlightStatus();
    this.leavingCityName = this.airportList.filter(t=>t.iataCode ===this.leavingFrom)[0].shortName ;
    this.goingToCityName = this.airportList.filter(t=>t.iataCode ===this.goingTo)[0].shortName;
    this.leavingCityName = this.leavingCityName + " ("+this.leavingFrom+")";
    this.goingToCityName = this.goingToCityName + " ("+this.goingTo+")";    
  }

  validate(){
    this.validationMsg = !this.searchDate ? "Please select a date!" : null;
    if(this.validationMsg){
    this.showloadingIndicator=false;
    this.showValidationMsg = true;
    }
  }

  loadAirportList() {
    this.airportSubscription = this.commonService.getAirportList(AppConstant.language)
      .subscribe(
        response => {          
            var temp: [];
            Object.keys(response.results).forEach( key => {
            var airport = new Airport();
            airport.iataCode = [response.results[key].iataCode].toString();
            airport.shortName = [response.results[key].shortName].toString();
            this.airportList.push(airport);
            this.airportList.sort((a,b) => a.shortName.localeCompare(b.shortName));//remove duplicates
            const uniqueObjectArray = [...new Map(this.airportList.map(item => [item[key], item])).values()]
         });
        },
        error => {
          //set flag for error page
          this.airportList = [];
        }
      );
  }

  getFlightStatus() { //"DXB","LHR","2022-03-17"     this.leavingFrom,this.goingTo,this.searchDate
    if(this.leavingFrom && this.goingTo && this.searchDate){
    this.flightStatusSubscription = this.commonService.getFlightStatus(this.leavingFrom,this.goingTo,this.searchDate)//make it dynamic
      .subscribe(
        response => {
          this.flightList = response ? response.results : [];
          this.showFlightList = true;
          this.showloadingIndicator=false;
          if(!this.flightList){
            this.showValidationMsg = true;
            this.validationMsg = "Sorry, No data found !";
          }
        },
        error => {
          this.flightList = [];
          this.showloadingIndicator=false;
          this.showValidationMsg = true;
          this.validationMsg = "Sorry, Error in service call !";
        }
      );
    }
  }
  
  ngOnDestroy() {
    this.airportSubscription.unsubscribe();
    this.flightStatusSubscription.unsubscribe();
  }
}
