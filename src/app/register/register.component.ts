import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Its needed ..
import { HttpService } from '../services/http/http.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMessage: string;
  email: string;
  pass: string;
  passAgain: string;
  yearValue: string;
  monthValue: string;
  dayValue: string;
  selectedDate: string;
  agreed: any;

  years = [
    { value: '2019', viewValue: '2019' },
    { value: '2015', viewValue: '2015' },
    { value: '2013', viewValue: '2013' },
    { value: '2020', viewValue: '2020' },
  ];

  months = [ // Addera +1 på månad
    { value: 'Januari', viewValue: '1' },
    { value: 'Februari', viewValue: '2' },
    { value: 'Mars', viewValue: '3' },
    { value: 'April', viewValue: '4' },
    { value: 'Maj', viewValue: '5' },
    { value: 'Juni', viewValue: '6' },
    { value: 'Juli', viewValue: '7' },
    { value: 'Augusti', viewValue: '8' },
    { value: 'September', viewValue: '9' },
    { value: 'Oktober', viewValue: '10' },
    { value: 'November', viewValue: '11' },
    { value: 'December', viewValue: '12' },
  ];

  days: Array<number>;

  constructor(private http: HttpService, private user: UserService) { }

  ngOnInit() {
    this.setYears();
  }

  register(
    userName = this.email,
    password = this.pass,
    passwordAgain = this.passAgain,
    bd = this.selectedDate
  ) {
    if (password !== passwordAgain) {
      this.errorMessage = 'Passwords not matching';
      return;
    }

    let formatedBD = '';

    if (bd) {
      formatedBD = bd.replace(/\//g, '-');
    }

    this.http.doRegister({ email: userName, pass: password, birthday: formatedBD }).subscribe(
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
        if (this.errorMessage.indexOf('SQLITE_CONSTRAINT') !== -1) {
          this.errorMessage = 'E-Post addressen är redan i användning.';
        }
      }
    );
  }

  public getDays(year = this.yearValue, month = this.monthValue): void {
    this.resetDayValue();

    if (!year || !month) {
      return;
    }

    const days = this.getNrOfDays(parseInt(year, 10), parseInt(month, 10));
    this.setDays(days);
  }

  private getNrOfDays(year: number, month: number): number {
    return new Date(year, month, 0).getDate() + 1;
  }

  private setDays(daysInDate: number): void {
    const days = new Array();

    for (let index = 1; index < daysInDate; index++) {
      days.push({
        value: index.toString(),
        viewValue: index.toString()
      });
    }

    this.days = days;
  }

  private resetDayValue(): void {
    this.setDays(0);
    this.dayValue = null;
    this.selectedDate = null;
  }

  private setYears(): void {
    const years = new Array();
    const nowYear = new Date().getFullYear();
    let startYear = nowYear - 100;

    while (startYear <= nowYear) {
      years.unshift({
        value: startYear.toString(),
        viewValue: startYear.toString()
      });
      startYear += 1;
    }

    this.years = years;
  }

  public setSelectedDate() {
    if (!this.yearValue || !this.monthValue || !this.dayValue) {
      this.selectedDate = null;
      return;
    }
    this.selectedDate = `${this.yearValue}/${this.monthValue}/${this.dayValue}`;
  }
}
