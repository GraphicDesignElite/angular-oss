import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { SolrService } from '../solr.service'; // Import Service
import { QueryFilter } from '../models/oss_query.model'; // Import Query Model

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit {
  @ViewChild('searchinput') searchinput; // Model Our Input
  private subscription; // Clean Our Service 
  searching:boolean = false; // Modifies Visual Output Only After Typing
  searchQuery :string = ''; // Search Input Value
  searchedLast : string; // Store Searched For Highlighting
  numFound: number; // How Many Records Returned

  // Returned From Endpoint
  results :any; 
  documents:any[];
  searchFacets:any[];
  // Sensible Defaults
  page:number = 1;
  rowsToDisplay:number = 10;
  offset:number = 0;

  queryFilters:QueryFilter[] = []; // Query Filter
  filterString:string = ''; // Serialize Query - URL
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
      if (params['q']) { // If Query
          
          this.searchQuery = params['q'];
          this.searchedLast = this.searchQuery;

          if (params['page']) { // Pagination only if page is set
            this.page = parseInt(params['page']);
            this.offset = (this.page - 1) * this.rowsToDisplay -1; // Page 1 based
            if(this.offset!=0){this.offset++;}
          }

          if (params['filter']) { // Retain Filters and Set QueryFilter
            this.filterString = params['filter'];
            var query = 'searchLuxuryHost:' + this.filterString.replace(/\-/g,' searchLuxuryHost:');
            this.queryFilters[0] = new QueryFilter(query, "QueryFilter", false);
            console.log(this.queryFilters[0]);
          }else{
            this.queryFilters[0] = new QueryFilter('', "QueryFilter", false);
          }


          

          // Call our service
          this.subscription = this._solrService.searchOSSTemplate(this.searchQuery, this.rowsToDisplay, this.offset, this.queryFilters).subscribe(results =>{
            this.results = results;
            this.numFound = this.results.numFound;
            this.responseTime = this.results.time;
            this.documents = this.results.documents;
            this.searchFacets = this.results.facets[0].terms; // get search facets
            console.log(results);
            
          });
    }
    });
  }
  searchApi(){
      this.searchinput.nativeElement.blur();
      var params = this.generateParameters();
      
      this._router.navigate(['/search'], { queryParams: params })
      
  }
  toggleFilter(filter:string){

      if(this.filterString == ''){ // add first filter
        this.filterString = filter; 
      }
      else if(this.filterString.includes(filter.toString())){ // remove filters
          this.filterString = this.filterString.replace('-' + filter, '');
          this.filterString = this.filterString.replace(filter + '-', '');
          this.filterString = this.filterString.replace(filter, '');
      }else{
         this.filterString += '-' + filter // add aditional filters
      }
      this.searchApi(); // call search
  }
  generateParameters(){
    var params = {};
    if(this.searchQuery != ''){
      params["q"] = this.searchQuery; 
    }
    if(this.page){
      params["page"] = 1;   
    } 
    if(this.filterString != ''){
        params["filter"] = this.filterString;   
    }
    return params; 
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
