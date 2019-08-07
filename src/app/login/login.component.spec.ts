import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot([
          { path: 'login', component: LoginComponent, pathMatch: 'full' }
        ])
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('checking uppdate values', () => {
    const compiled = fixture.debugElement.nativeElement;
    const email = compiled.querySelector('#email');
    const pass = compiled.querySelector('#password');
    const submit = compiled.querySelector('#go');

    email.value = 'test@test.se';
    pass.value = 'pass';
    submit.click();

    expect(component).toBeTruthy();
  });
});
