import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http/http.service';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
})
export class ReportDetailsComponent implements OnInit {

  private kmom: string;
  private errorMessage: string;
  private data: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpService
  ) { }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.kmom = this.route.snapshot.paramMap.get('kmom');

    this.http.getSpesificReport(this.kmom).subscribe(
      data => {
        this.data = data.data.data;
      },
      err => {
        this.errorMessage = this.http.handleError(err);
      }
    );
  }

}
