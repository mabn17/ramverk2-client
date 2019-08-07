import { Component, OnInit } from '@angular/core';

import { HttpService } from '../services/http/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: any;
  errorMessage: string;

  constructor(private http: HttpService) { }

  ngOnInit() {

    this.http.getHomeText().subscribe(
      data => {
        this.data = data.data.data;
      },
      err => {
        this.errorMessage = this.http.handleError(err);
      }
    );
  }
}
