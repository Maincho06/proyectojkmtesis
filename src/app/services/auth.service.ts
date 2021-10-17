import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_URL } from '@utils/url_constants';
import { BaseService } from './base.service';
import { ILogin } from '@models/authmodel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { getState, TOKEN_KEY } from '@utils/storage';

const jwtHelper = new JwtHelperService();
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public isAuthenticated(): boolean {
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

  getPerfil(): Promise<any> {
    return this.http
      .get(`${AUTH_URL}/Perfil`, {
        headers: this.obtenerHeaders(),
      })
      .toPromise();
  }
}
