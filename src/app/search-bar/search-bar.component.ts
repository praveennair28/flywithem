import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-search',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnChanges {

  @Input() airportList: any
  @Input() placeholder: any
  @Output() selectedAirport = new EventEmitter<any>();

  public defaultInput_code : string;
  public defaultInput_city : string;
  public title: string;

  constructor() {
    
   }

  ngOnInit() {
    this.defaultInput_code = this.placeholder=="Leaving from" ? "DXB" : "LHR";
    this.defaultInput_city = this.placeholder=="Leaving from" ? "Dubai" : "London";
    this.title = this.placeholder == "Leaving from" ? "Leaving from" : "Going to";
  }
  ngOnChanges(): void {
    this.defaultInput_code = this.placeholder=="Leaving from" ? "DXB" : "LHR";
    this.defaultInput_city = this.placeholder=="Leaving from" ? "Dubai" : "London";
    this.placeholder=="Leaving from" ? this.selectedAirport.emit("DXB"): this.selectedAirport.emit("LHR");
  }
  SelectItem(event)
  {
    console.info(event);
    this.selectedAirport.emit(event);
  }

}
