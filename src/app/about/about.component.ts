import { Component, OnInit } from '@angular/core';

import { HttpService } from '../services/http/http.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  data: any;
  errorMessage: string;

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.getHomeText(`${environment.backend_url}/reports/3`).subscribe(
      data => {
        this.data = data.data.data;
      },
      err => {
        this.errorMessage = this.http.handleError(err);
      }
    );
  }

}
