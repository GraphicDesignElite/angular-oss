import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { SolrService } from '../solr.service';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit {
  @ViewChild('searchinput') searchinput;

  private subscription;
  searching:boolean = false; // is searching?

  searchQuery :string = ''; // whats searched
  numFound: number; // how many results
  results :any; // Json
  page:number = 1;
  rowsToDisplay:number = 10;
  numPages:number = 0;
  offset:number = 0;
  documents:any[];
  responseTime:any;
  

  constructor(private _solrService: SolrService, public _route: ActivatedRoute, private _router: Router){
        _router.events.subscribe((val) => { // scroll to top after each search
            if (val instanceof NavigationEnd){
                window.scrollTo(0,0);
            }
        });
  }
  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      if (params['q']) {
          
          this.searchQuery = params['q'];
          if (params['page']) { // pagination
            this.page = parseInt(params['page']);
            this.offset = (this.page - 1) * this.rowsToDisplay -1; // Page 1 based
            if(this.offset!=0){this.offset++;}
          }
          this.subscription = this._solrService.searchOSSTemplate(this.searchQuery, this.rowsToDisplay, this.offset).subscribe(results =>{
            
            this.results = results;
            this.numFound = this.results.numFound;
            this.numPages = Math.ceil(this.numFound / this.rowsToDisplay);
            this.responseTime = this.results.time;
            this.documents = this.results.documents;

            //console.log(results);
            console.log(this.documents);
          });
    }
    });
  }
  searchApi(){

      this.searchinput.nativeElement.blur();
      if(this.searchQuery != ''){
        this._router.navigate(['/search'], { queryParams: {q:this.searchQuery} }) 
      }
      
  }
  isSearching(){
    if(this.searchQuery != ''){
        this.searching = true;
    }
    return this.searching;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
