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


export class OssQuery {

  query:string;
  start:number;
  rows:number;
  lang: string;
  operator:string;
  collapsing: Collapsing;
  returnedFields: string[];
  snippets: Snippet[];
  enableLog:boolean;
  searchFields: SearchField[];


  constructor(query:string = '', start:number = 0, rows:number = 10) { 
        this.query = query;
        this.start = start;
        this.rows = rows;
        this.lang = 'ENGLISH';
        this.operator = 'OR'
        this.collapsing = new Collapsing();
        this.returnedFields = ['url'];
        this.snippets = [new Snippet('title'), new Snippet('content')];
        this.enableLog = false;
        this.searchFields = [
            new SearchField('title', 10),
            new SearchField('content', 1),
            new SearchField('titleExact', 10),
            new SearchField('contentExact', 1),
        ]    
    }
}