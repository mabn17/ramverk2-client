import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddReportComponent } from './add-report.component';

describe('AddReportComponent', () => {
  let component: AddReportComponent;
  let fixture: ComponentFixture<AddReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'add/redovisa', component: AddReportComponent },
        ])
      ],
      declarations: [ AddReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  // Update later
  it('should create', () => {
    component.send();
    expect(component).toBeTruthy();
  });
});
