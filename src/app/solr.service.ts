import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseRequestOptions, RequestOptions } from '@angular/http';
import { Observable }      from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {QueryFilter, OssTemplateQuery } from './models/oss_query.model';

@Injectable()
export class SolrService {

  // OSS Variables

  private oss_url = 'dlns-pep-m3d2s9nc4y52ws55.search.luxury';
  private templateQueryOptions = new OssTemplateQuery();

  private index = 'luxury-search-master-1-v2';
  private template = 'textSearch';
  private lg = 'Lrben2WAAFZML4ak';
  private tk = 'e960453669c7e2f96167ca058da13857';

  constructor( private _http : Http) {
      console.log('OSS Services Are Ready');
  }
 

  searchOSSTemplate(query:string, rows:number, offset:number, filters:QueryFilter[]){
        let oss_URL: string = 'http://' + this.oss_url + ':9090/services/rest/index/' + this.index + '/search/field/'+ this.template +'?login='+ this.lg +'&key='+ this.tk;
        let headers: Headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({headers: headers});

        // set options
        this.templateQueryOptions.query = query;
        this.templateQueryOptions.start = offset;
        this.templateQueryOptions.rows = rows;
        this.templateQueryOptions.filters = filters;

        console.log(JSON.stringify(this.templateQueryOptions));// get rid of this !!!!!!!!

        return this._http.post(oss_URL, JSON.stringify(this.templateQueryOptions), options)
        .map(res => res.json());    
  }


}
