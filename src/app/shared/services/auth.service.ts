import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'; 

@Injectable()
export class AuthService {
  tokenKey = 'x-token';

  get user(): any {
    const token = this.token;
    let returnObj;

    if (token) {
      const jwt = new JwtHelperService();
      returnObj = jwt.decodeToken(token);
    } else {
      returnObj = {};
    }

    return returnObj;
  }

  get token() {
    return localStorage.getItem(this.tokenKey) || '';
  }

  set token(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  logout() { 
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn() {
    const jwtHelper = new JwtHelperService();
    return this.token && jwtHelper.isTokenExpired(this.token);
  }

}
