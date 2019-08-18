import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IAllReports } from '../../@Interfaces/IAllReports';
import { IAllChatMessage } from '../../@Interfaces/IAllChatMassage';
import { ICreateNewReport } from '../../@Interfaces/ICreateNewReport';
import { IExpressError } from '../../@Interfaces/IExpressError';
import { ILogin } from '../../@Interfaces/ILogin';
import { INewReport } from '../../@Interfaces/INewReport';
import { IRegister } from '../../@Interfaces/IRegister';
import { ISiteText } from '../../@Interfaces/ISiteText';
import { IUserLogReg } from '../../@Interfaces/IUserLogReg';

import { IChatMessage } from '../../@Interfaces/IChatMessage';


@Injectable({
  providedIn: 'root'
})

export class HttpService {

  baseURL: string = environment.backend_url;
  home = `${this.baseURL}/`;
  reports = `${this.baseURL}/reports`;
  login = `${this.baseURL}/login`;
  register = `${this.baseURL}/register`;
  chat = `${this.baseURL}/chat`;

  constructor(private http: HttpClient) { }

  public handleError(err: IExpressError): string {
    if (err.error.errors) {
      return err.error.errors.detail;
    }

    return err.message;
  }

  public doLogin(userInfo: IUserLogReg, url: string = this.login):
    Observable<ILogin> {
      return this.http.post<ILogin>(url, userInfo);
    }

  public doRegister(userInfo: IUserLogReg, url: string = this.register):
    Observable<IRegister> {
      return this.http.post<IRegister>(url, userInfo);
    }

  public getHomeText(url: string = this.home):
    Observable<ISiteText> {
      return this.http.get<ISiteText>(url);
    }

  public getAllReports(url: string = this.reports):
    Observable<IAllReports> {
      return this.http.get<IAllReports>(url);
    }

  public getSpesificReport(kmom: string, url: string = this.reports):
    Observable<ISiteText> {
      return this.http.get<ISiteText>(`${url}/${kmom}`);
    }

  public addNewReport(
    report: ICreateNewReport,
    token: string,
    url: string = this.reports
  ): Observable<INewReport> {
      return this.http.post<INewReport>(url, report, {
        headers: {
          'x-access-token': token
        }
      });
    }

  public saveChatMessages(
    chatMessages: Array<IChatMessage>,
    url: string = this.chat
  ): Observable<any> {
    return this.http.post(url, { message: chatMessages });
  }

  public getChatMessages(
    url: string = this.chat
  ): Observable<IAllChatMessage> {
    return this.http.get<IAllChatMessage>(url);
  }
}
