import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'redovisa';

  token?: string;

  constructor(private user: UserService) {}

  ngOnInit(): void {
    this.token = this.user.getToken(false);
  }

  logOut() {
    this.user.removeToken('/login');
    this.token = null;
  }
}
