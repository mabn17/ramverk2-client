import { Component, OnInit } from '@angular/core';

import { HttpService } from '../services/http/http.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private errorMessage: string;
  private email: string;
  private pass: string;
  private passAgain: string;

  constructor(private http: HttpService, private user: UserService) { }

  ngOnInit() { }

  register(userName = this.email, password = this.pass, passwordAgain = this.passAgain) {
    if (password !== passwordAgain) {
      this.errorMessage = 'Passwords not matching';
      return;
    }

    this.http.doRegister({ email: userName, pass: password }).subscribe(
      message => {
        this.http.doLogin({ email: userName, pass: password }).subscribe(
          data => {
            this.user.setToken(data.data.token);
            this.user.redirect('/', true);
          },
          err => {
            this.errorMessage = message.data.message;
          }
        );
      },
      err => {
        this.errorMessage = this.http.handleError(err);
      }
    );
  }
}
