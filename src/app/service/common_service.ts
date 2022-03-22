import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConstant } from '../appconstant';
import { Airport } from '../models/airport';

@Injectable({
    providedIn: 'root'
  })
  export class CommonService {
    constructor(private httpService: HttpClient) { }
  

    getAirportList(language: any): Observable<any> {
          return this.httpService.get<any>(`${AppConstant.get_airportList_Api}lang=${language}`);
          //ToDo :map the required fields only
      }

    getFlightStatus(origin: string, destination:string,date:string): Observable<any> {
          return this.httpService.get<any>(`${AppConstant.get_flightStatus_Api}departureDate=${date}&origin=${origin}&destination=${destination}`
          );    
      }

}