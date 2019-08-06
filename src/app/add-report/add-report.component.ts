import { Component, OnInit } from '@angular/core';

import { HttpService } from '../services/http/http.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.scss']
})
export class AddReportComponent implements OnInit {

  private title: string;
  private data: string;
  private apiToken: string;
  private errorMessage: string;

  constructor(private http: HttpService, private user: UserService) { }

  ngOnInit() {
    this.apiToken = this.user.getToken();
  }

  send(
    reportTitle: string = this.title,
    reportData: string = this.data,
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
