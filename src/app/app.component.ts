import { Component } from '@angular/core';
import { DisplayService } from './display.service'; // Import Service

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {

  isSearchView: boolean = false;

  constructor(private _displayService: DisplayService) {
    this._displayService.displayChange.subscribe((value) => {
      this.isSearchView = value
    });
  }


}
