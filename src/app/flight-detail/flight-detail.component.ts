import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})
export class FlightDetailComponent implements OnInit {

  @Input() flightData: any;
  @Input() origin: string;
  @Input() destination: string;
  @Input() searchDate: string;

  public originTime: string;
  public originDate: string;
  public originSchDepTime: string;

  public arrTime: string;
  public arrDate: string;
  public arrSchDepTime: string;

  public statusColor: string;
  public statusText: string;



  constructor() { }

  ngOnInit() {
    this.originTime = '---'
    this.originDate = 'NA';
    this.arrTime = '---';
    this.arrDate = 'NA';
    this.arrSchDepTime = 'NA';
    this.originSchDepTime = 'NA';



    var week = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    const months = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
      
    const dpTimeActual = new Date(this.flightData.flightRoute[0].departureTime.actual);
    const dpTimeSched = new Date(this.flightData.flightRoute[0].departureTime.schedule);

    const arrTimeActual = new Date(this.flightData.flightRoute[0].arrivalTime.actual);
    const arrTimeSched = new Date(this.flightData.flightRoute[0].arrivalTime.schedule);

    if(!isNaN(dpTimeActual.getTime())){
    var depDay  = week[dpTimeActual.getDay()].slice(0, 3);
    var depMonth = months[dpTimeActual.getMonth()].slice(0,3);
    this.originTime = this.Format(dpTimeActual.getUTCHours()) + ':' + this.Format(dpTimeActual.getUTCMinutes());
    this.originDate = depDay +' ' + dpTimeActual.getDate() + ' '+ depMonth;
    }
    if(!isNaN(dpTimeSched.getTime())){
    this.originSchDepTime = this.Format(dpTimeSched.getUTCHours()) + ':' + this.Format(dpTimeSched.getUTCMinutes());
    }

    if(!isNaN(arrTimeActual.getTime())){
    var arrDay  = week[arrTimeActual.getDay()].slice(0, 3);
    var arrMonth = months[arrTimeActual.getMonth()].slice(0,3);
    this.arrTime = this.Format(arrTimeActual.getUTCHours()) + ':' + this.Format(arrTimeActual.getUTCMinutes());
    this.arrDate = arrDay +' ' + arrTimeActual.getDate() + ' '+ arrMonth;
    }
    if(!isNaN(arrTimeSched.getTime())){
    this.arrSchDepTime = this.Format(arrTimeSched.getUTCHours()) + ':' + this.Format(arrTimeSched.getUTCMinutes());
    }

    if(this.flightData.flightRoute[0].statusCode == "ARVD")
    {
      this.statusColor = "buttonBgColorGreen";
      this.statusText = "Arrived";
    }
    else if(this.flightData.flightRoute[0].statusCode == "PDEP")
    {
      this.statusColor = "buttonBgColorBlue";
      this.statusText = "Not yet arrived";
    }
    else
    {
      this.statusColor = "buttonBgColorAmber";
      this.statusText = "Not yet arrived";
    }
  }

  Format(data){
    if(data){
      var newData: number = +data;
      return newData <= 9 ? '0' + newData.toString() : newData.toString();
    }
  }

}
