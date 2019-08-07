import { Component, OnInit } from '@angular/core';

import { HttpService } from '../services/http/http.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  email: string;
  pass: string;

  constructor(private http: HttpService, private user: UserService) { }

  ngOnInit() { }

  login(userName = this.email, password = this.pass) {
    this.http.doLogin({ email: userName, pass: password }).subscribe(
     (data: any) => {
       this.user.setToken(data.data.token);
       this.user.redirect('/', true);
     },
     err => {
       this.errorMessage = this.http.handleError(err);
     }
   );
  }
}
