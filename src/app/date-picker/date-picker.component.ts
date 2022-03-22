import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  @Output() selectedDate = new EventEmitter<any>();
  public model: any;
  
  constructor() { }

  ngOnInit() {
  }
  selectDate(event:NgbDate)
  {
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;
    let day = event.day <= 9 ? '0' + event.day : event.day;
    let finalDate = year + "-" + month + "-" + day;
    this.selectedDate.emit(finalDate);
  }

}
