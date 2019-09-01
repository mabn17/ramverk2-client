import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token?: string;

  constructor(private router: Router) { }

  public getDecoded(): { email: string; } {
    this.token = this.getToken(false);
    try {
      // tslint:disable-line
      return jwt_decode(this.token);
    } catch (e) {
      return { email: 'anonym' };
    }
  }

  public getToken(shouldRedirect = true): any {
    this.token = localStorage.getItem('userToken') || null;

    if (!this.token && shouldRedirect) {
      this.redirect('/login');
    }

    return this.token;
  }

  public setToken(payload: string): void {
    localStorage.setItem('userToken', payload);
  }

  public removeToken(path?: string): void {
    localStorage.removeItem('userToken');

    if (path) {
      this.redirect(path);
    }
  }

  public redirect(path: string, reload = false): void {
    this.router.navigate([path]);

    if (reload) {
      location.href = path;
    }
  }
}
