import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../shared/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RegisterComponent } from './register.component';

const backendUrl = ' http://localhost:8080';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'register', component: RegisterComponent }
        ])
      ],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Checks non matching passwords', () => {
    const compiled = fixture.debugElement.nativeElement;
    const email = compiled.querySelector('#email');
    const pass = compiled.querySelector('#pass');
    const passAgain = compiled.querySelector('#passAgain');

    email.value = 'test@test.se';
    pass.value = 'pass';
    passAgain.value = 'passA';

    component.register(email.value, pass.value, passAgain.value);

    expect(component.errorMessage).toEqual('Passwords not matching');
  });

  // Update Later
  it('should stay', () => {
    component.register();

    expect(component).toBeTruthy();
  });
});
