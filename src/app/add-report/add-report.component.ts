import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

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
  kmom: string;
  update: string;

  constructor(
    private http: HttpService,
    private user: UserService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.kmom = this.route.snapshot.paramMap.get('kmom');
    this.apiToken = this.user.getToken(false);

    if (!this.apiToken) {
      this.errorMessage = 'Please login or set your token in locastorage "userToken": "{token}"';
    }

    if (this.kmom) {
      this.getReport();
      this.update = 'y';
    }
  }

  private getReport(): void {
    this.http.getSpesificReport('', `${environment.backend_url}/reports`).subscribe(
      data => {
        for (const report of data.extra) {
          if (report.title === this.kmom) {
            this.title = report.title;
            this.data = report.data;
            break;
          }
        }

        if (!this.title) {
          this.user.redirect(`/add/redovisa`);
        }
      },
      err => {
        this.errorMessage = this.http.handleError(err);
      }
    );
  }

  send(
    reportTitle: string = this.title || '',
    reportData: string = this.data || '',
    token: string = this.apiToken || '',
    shouldUpdate: string = this.update || 'no'
  ) {
    this.http.addNewReport({ title: reportTitle, text: reportData, update: shouldUpdate }, token)
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
