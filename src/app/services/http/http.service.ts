import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ISiteText } from '../../@Interfaces/ISiteText';
import { IExpressError } from '../../@Interfaces/IExpressError';


@Injectable({
  providedIn: 'root'
})

export class HttpService {

  private baseURL: string = environment.backend_url;
  private home = '/';

  constructor(private http: HttpClient) { }

  getHomeText(url: string = `${this.baseURL}${this.home}`):
    Observable<ISiteText> {
      return this.http.get<ISiteText>(url);
    }

  handleError(err: IExpressError): string {
    if (err.error.errors) {
      return err.error.errors.detail;
    }

    return err.message;
  }
}
