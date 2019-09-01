import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http/http.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reports: any;
  errorMessage: string;

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.getAllReports().subscribe(
      data => {
        this.reports = data.extra;
      },
      err => {
        this.errorMessage = this.http.handleError(err);
      }
    );
  }

}
