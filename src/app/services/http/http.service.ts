import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IAllReports } from '../../@Interfaces/IAllReports';
import { IExpressError } from '../../@Interfaces/IExpressError';
import { ISiteText } from '../../@Interfaces/ISiteText';


@Injectable({
  providedIn: 'root'
})

export class HttpService {

  private baseURL: string = environment.backend_url;
  private home = '/';
  private reports = '/reports';

  constructor(private http: HttpClient) { }

  handleError(err: IExpressError): string {
    if (err.error.errors) {
      return err.error.errors.detail;
    }

    return err.message;
  }

  getHomeText(url: string = `${this.baseURL}${this.home}`):
    Observable<ISiteText> {
      return this.http.get<ISiteText>(url);
    }

  getAllReports(url: string = `${this.baseURL}${this.reports}`):
    Observable<IAllReports> {
      return this.http.get<IAllReports>(url);
    }
}
