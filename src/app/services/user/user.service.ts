import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public token?: string;

  constructor(private router: Router) { }

  getToken(shouldRedirect = true): any {
    this.token = localStorage.getItem('userToken') || null;

    if (!this.token && shouldRedirect) {
      this.redirect('/login');
    }

    return this.token;
  }

  setToken(payload: string): void {
    localStorage.setItem('userToken', payload);
  }

  removeToken(path?: string): void {
    localStorage.removeItem('userToken');

    if (path) {
      this.redirect(path);
    }
  }

  redirect(path: string, reload = false) {

    this.router.navigate([path]);
    if (reload) {
      location.href = path;
    }
  }
}
