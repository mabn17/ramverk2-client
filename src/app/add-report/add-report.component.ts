import { Component, OnInit } from '@angular/core';

import { HttpService } from '../services/http/http.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.scss']
})
export class AddReportComponent implements OnInit {

  title: string;
  data: string;
  apiToken?: string;
  errorMessage: string;

  constructor(private http: HttpService, private user: UserService) { }

  ngOnInit() {
    this.apiToken = this.user.getToken(false);

    if (!this.apiToken) {
      this.errorMessage = 'Please login or set your token in locastorage "userToken": "{token}"';
    }
  }

  send(
    reportTitle: string = this.title || '',
    reportData: string = this.data || '',
    token: string = this.apiToken || ''
  ) {
    this.http.addNewReport({ title: reportTitle, text: reportData }, token)
      .subscribe(
        data => {
          this.user.redirect(`/redovisa/${reportTitle}`);
        },
        err => {
          this.errorMessage = this.http.handleError(err);
        }
      );
  }
}
