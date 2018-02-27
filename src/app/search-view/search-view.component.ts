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
  filterString:string = ''; // Serialize Query URL
  responseTime:any;
  

  constructor(private _solrService: SolrService, public _route: ActivatedRoute, private _router: Router){
        _router.events.subscribe((val) => { // scroll to top 
            if (val instanceof NavigationEnd){
                window.scrollTo(0,0);
            }
        });
  }
  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      if (params['q']) { // If Searching
          
          this.searchQuery = params['q'];
          this.searchedLast = this.searchQuery;


          if (params['page']) { // Paginate Based On Page Parameter
            this.page = parseInt(params['page']);
            this.offset = (this.page - 1) * this.rowsToDisplay -1; // Page 1 based
            if(this.offset!=0){this.offset++;}
          }

          if (params['filter']) { // Retain Filters and Set QueryFilter
            this.filterString = params['filter'];
            var query = 'searchLuxuryHost:' + this.filterString.replace(/\-/g,' OR searchLuxuryHost:'); // replace - url symbol with additional query setup
            this.queryFilters[0] = new QueryFilter(query, "QueryFilter", false); // add processed url filters into query object
          }else{
            this.queryFilters[0] = new QueryFilter('', "QueryFilter", false);
            this.filterString = '';
          }


          // Call our service
          this.subscription = this._solrService.searchOSSTemplate(this.searchQuery, this.rowsToDisplay, this.offset, this.queryFilters).subscribe(results =>{
            this.results = results;
            this.numFound = this.results.numFound - this.results.collapsedDocCount;
            this.responseTime = this.results.time;
            this.documents = this.results.documents;
            
            // set up local storage for current search term only
            if(sessionStorage.getItem('query') != this.searchQuery || this.filterString == ""){
              sessionStorage.setItem('query', this.searchQuery);
              this.searchFacets = this.results.facets[0].terms; // get search facets
              sessionStorage.setItem('facets', JSON.stringify(this.searchFacets)); // store search facets
            }
            else{
              // recall available site filters for current search term
              this.searchFacets = JSON.parse(sessionStorage.getItem('facets'));
            }

            console.log("The Results Returned From OSS: ");
            console.log(results);
            
          });
        }
    });
  }
  searchApi(){
      this.searchinput.nativeElement.blur();
      var searchParams = this.generateParameters();
      this._router.navigate(['/search'], { queryParams: searchParams })
      
  }
  toggleFilter(filter:string){
      this.filterString = filter;
      this.searchApi();
  }
  generateParameters(){
    var params = {};
    if(this.searchQuery != ''){// Check only If Query
      params["q"] = this.searchQuery;
      if(this.page){
        params["page"] = 1;   
      } 
      if(this.filterString != ''){
        params["filter"] = this.filterString;   
      }
    }
    return params; 
  }
  isSearching(){
    if(this.searchQuery != ''){
        return this.searching = true;
    }
    return this.searching;
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
