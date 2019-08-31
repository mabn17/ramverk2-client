import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http/http.service';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
})
export class ReportDetailsComponent implements OnInit {

  kmom: string;
  id?: string;
  errorMessage: string;
  data: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpService
  ) { }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.kmom = this.route.snapshot.paramMap.get('kmom');
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.kmom === 'week' && this.id) {
      const kmom = this.id.length === 1 ? `0${this.id}` : this.id;
      this.kmom = `kmom${kmom}`;
      console.log(this.kmom);
    }

    this.getReport();
  }

  private getReport(): void {
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
