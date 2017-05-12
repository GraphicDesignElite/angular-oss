import { Component, Input, OnInit, OnChanges  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pagination-buttons',
  templateUrl: './pagination-buttons.component.html',
  styleUrls: ['./pagination-buttons.component.css']
})
export class PaginationButtonsComponent implements OnInit, OnChanges {
  
  @Input() page: number;
  @Input() searchQuery: string;
  @Input() numFound: number;
  adjacent: number = 6;

  repeat = Array;
  currentPage: number;
  constructor(private _router: Router) { 
    this.currentPage = this.page;
  }
  ngOnInit() {
    this.currentPage = this.page;
  }
  ngOnChanges(changes:any):void {
    this.currentPage = this.page;
  }
  paginateToPage(page:number){
    this._router.navigate(['/search'], { queryParams: {q:this.searchQuery, page:page} })
  }
  paginateNext(){
     // check this against total 
    let nextPage:number = this.page + 1;
    this._router.navigate(['/search'], { queryParams: {q:this.searchQuery, page:nextPage} })
    
  }
  paginatePrev(){
    if(this.page > 0){
      this._router.navigate(['/search'], { queryParams: {q:this.searchQuery, page:this.page - 1} })
    }
  }
  
  
}
