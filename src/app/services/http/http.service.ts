import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IAllReports } from '../../@Interfaces/IAllReports';
import { IExpressError } from '../../@Interfaces/IExpressError';
import { ILogin } from '../../@Interfaces/ILogin';
import { ISiteText } from '../../@Interfaces/ISiteText';
import { IUserLogReg } from '../../@Interfaces/IUserLogReg';


@Injectable({
  providedIn: 'root'
})

export class HttpService {

  private baseURL: string = environment.backend_url;
  private home = `${this.baseURL}/`;
  private reports = `${this.baseURL}/reports`;
  private login = `${this.baseURL}/login`;

  constructor(private http: HttpClient) { }

  handleError(err: IExpressError): string {
    if (err.error.errors) {
      return err.error.errors.detail;
    }

    return err.message;
  }

  doLogin(userInfo: IUserLogReg, url: string = this.login):
    Observable<ILogin> {
      return this.http.post<ILogin>(url, userInfo);
    }

  getHomeText(url: string = this.home):
    Observable<ISiteText> {
      return this.http.get<ISiteText>(url);
    }

  getAllReports(url: string = this.reports):
    Observable<IAllReports> {
      return this.http.get<IAllReports>(url);
    }

  getSpesificReport(kmom: string, url: string = this.reports):
    Observable<ISiteText> {
      return this.http.get<ISiteText>(`${url}/${kmom}`);
    }
}
