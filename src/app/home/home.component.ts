import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private data: any;
  private errorMessage = 'Placeholder';

  constructor() { }

  ngOnInit() {
    // Figure out how to get data from api
  }

}
