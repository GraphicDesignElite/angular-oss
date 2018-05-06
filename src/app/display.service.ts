import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DisplayService {

    // Variables
    isSearchView = false;
    displayChange: Subject<boolean> = new Subject<boolean>();

    constructor() {
        this.displayChange.subscribe((value) => {
            this.isSearchView = value
        });
    }

    showSearchView() {
        this.displayChange.next(!this.isSearchView);
        console.log('searched at service');
    }


}
