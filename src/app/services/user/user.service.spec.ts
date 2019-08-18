import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from './user.service';


describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ RouterTestingModule ]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('Tests getDecoded', () => {
    const service: UserService = TestBed.get(UserService);
    const token = service.getDecoded();

    expect(typeof token.email).toEqual('string');
  });

  it('Tests setToken() and removeToken()', () => {
    const service: UserService = TestBed.get(UserService);
    localStorage.removeItem('userToken');

    let token = localStorage.getItem('userToken') || null;
    expect(token).toEqual(null);

    service.setToken('test');
    token = localStorage.getItem('userToken') || null;
    expect(token).toEqual('test');

    service.removeToken();
    token = localStorage.getItem('userToken') || null;
    expect(token).toEqual(null);
  });

  it('Tests getToken()', () => {
    localStorage.removeItem('userToken');
    const service: UserService = TestBed.get(UserService);
    const token = service.getToken();

    expect(token).toEqual(null);

    service.removeToken('/');
    expect(true).toEqual(true);
  });
});
