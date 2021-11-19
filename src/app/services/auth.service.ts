import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_URL } from '@utils/url_constants';
import { BaseService } from './base.service';
import { ILogin } from '@models/authmodel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { clearState, getState, TOKEN_KEY } from '@utils/storage';
import { Router } from '@angular/router';

const jwtHelper = new JwtHelperService();
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(private http: HttpClient, private _router: Router) {
    super();
  }

  isAuthenticated(): boolean {
    const token = getState(TOKEN_KEY);
    if (!!token) return !jwtHelper.isTokenExpired(token);
    return false;
  }

  login({ username, password }): Promise<any> {
    const body = {
      username: username,
      password: password,
    };

    return this.http
      .post<ILogin>(`${AUTH_URL}/Login`, body, {
        headers: this.obtenerHeaders(),
      })
      .toPromise();
  }

  logout() {
    clearState();
    this._router.navigate(['/login']);
  }

  getPerfil(): Promise<any> {
    return this.http
      .get(`${AUTH_URL}/Perfil`, {
        headers: this.obtenerHeaders(),
      })
      .toPromise();
  }
}
