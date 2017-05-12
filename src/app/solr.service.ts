import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseRequestOptions, RequestOptions } from '@angular/http';
import { Observable }      from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { OssQuery } from './models/oss_query.model';

@Injectable()
export class SolrService {

  // OSS Variables
  private oss_ip = '52.90.135.249';
  private queryOptions = new OssQuery();


  constructor( private _http : Http) {
      console.log('OSS Services Are Ready');
  }
 
  searchOSS(query:string, rows:number, offset:number){
        let oss_URL: string = 'http://' + this.oss_ip + ':9090/services/rest/index/query-OandO-1/search/field/?login=b1DVMLMAII8ihBVhsllf&key=8c2f587fcad8569e962e4fca50624dd6';
        let headers: Headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({headers: headers});

        // set options
        this.queryOptions.query = query;
        this.queryOptions.start = offset;
        this.queryOptions.rows = rows;


        console.log(JSON.stringify(this.queryOptions));// get rid of this !!!!!!!!
        return this._http.post(oss_URL, JSON.stringify(this.queryOptions), options)
        .map(res => res.json());    
  }


}
