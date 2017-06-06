import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Filter } from '../models/oss_query.model';
@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {
  @Input() filterlist:Filter[];
  @Input() activeFilters:string = '';
  @Output() toggle:EventEmitter<string> = new EventEmitter();
  
  listShown:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  createFilter(filter:string){
      if(this.activeFilters == ''){ // add first filter
        this.activeFilters = filter; 
      }
      else if(this.activeFilters.includes(filter.toString())){ // remove filters
          this.activeFilters = this.activeFilters.replace('-' + filter, '');
          this.activeFilters = this.activeFilters.replace(filter + '-', '');
          this.activeFilters = this.activeFilters.replace(filter, '');
      }else{
         this.activeFilters += '-' + filter // add aditional filters
      }
      this.toggle.emit(this.activeFilters);  
  }
  activeFilter(filter:string){
    if(this.activeFilters.includes(filter)){
      return true;
    }
    return false;
  }
  showFilterlist(shown){
    this.listShown = !this.listShown;
  }
}
