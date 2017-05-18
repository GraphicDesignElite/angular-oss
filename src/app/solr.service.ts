import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseRequestOptions, RequestOptions } from '@angular/http';
import { Observable }      from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { OssQuery, OssTemplateQuery } from './models/oss_query.model';

@Injectable()
export class SolrService {

  // OSS Variables
  private oss_ip = '34.204.52.99';
  private queryOptions = new OssQuery();
  private templateQueryOptions = new OssTemplateQuery();

  private index = 'discover-luxury-S1CM1';
  private template = 'textSearch';
  private lg= ']9-pp9.e[v5HF5Z2;W:"';
  private tk= "617ed356967a0ae72ebef2a5d0b2b8a4";

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
  searchOSSTemplate(query:string, rows:number, offset:number){
        let oss_URL: string = 'http://' + this.oss_ip + ':9090/services/rest/index/' + this.index + '/search/field/'+ this.template +'?login='+ this.lg +'&key='+ this.tk;
        let headers: Headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({headers: headers});

        // set options
        this.templateQueryOptions.query = query;
        this.templateQueryOptions.start = offset;
        this.templateQueryOptions.rows = rows;

        console.log('template search');
        console.log(JSON.stringify(this.templateQueryOptions));// get rid of this !!!!!!!!

        return this._http.post(oss_URL, JSON.stringify(this.templateQueryOptions), options)
        .map(res => res.json());    
  }


}
