// Query Template Object Classes

export class Collapsing{
    max:number;
    mode:string;
    type:string;

    constructor( max:number =2 , mode:string ='OFF', type:string = 'OPTIMIZED') { 
        this.max = max;
        this.mode = mode;
        this.type = type;
    }
}
export class Snippet{
    field:string;
    tag:string;
    separator:string;
    maxSize:number;
    maxNumber:number;
    fragmenter:string;

    constructor(field:string, fragmenter:string = 'SENTENCE', tag:string = 'b', separator:string = '...', maxSize:number = 200, maxNumber:number = 1 ) { 
        this.field = field;
        this.tag = tag;
        this.separator = separator;
        this.maxSize = maxSize;
        this.maxNumber = maxNumber;
        this.fragmenter = fragmenter;
    }
}
export class SearchField{
    field:string;
    mode:string;
    boost:number;
    constructor(field:string, boost:number = 0, mode:string = "TERM_AND_PHRASE",) { 
        this.field = field;
        this.mode = mode;
        this.boost = boost;
    }
}
export class QueryFilter{
    type:string;
    negative:boolean;
    query:string;
    constructor( query:string = '', type:string = "QueryFilter", negative:boolean =false) { 
        this.type = type;
        this.negative = negative;
        this.query = query;
    }
}
export class Filter{
    term:string;
    count:string;
    constructor(term:string = '', count:string = '') { 
        this.term = term;
        this.count = count;
    }
}


export class OssTemplateQuery {
  query:string;
  start:number;
  rows:number;
  lang: string;
  filterOperator: string;
  filters: QueryFilter[];
  constructor(query:string = '', start:number = 0, rows:number = 10, filters:QueryFilter[] = [new QueryFilter()], filterOperator:string = 'AND') { 
        this.query = query;
        this.start = start;
        this.rows = rows;
        this.lang = 'ENGLISH';
        this.filters = filters;
        this.filterOperator = filterOperator;
    }
}
