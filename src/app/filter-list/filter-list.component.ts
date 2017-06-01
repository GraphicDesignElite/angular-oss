import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Filter } from '../models/oss_query.model';
@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {
  @Input() filterlist:Filter[];
  @Output() toggleFilter:EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
