import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AUTH_URL } from '@utils/url_constants';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { ILogin } from '@models/authmodel';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(private http: HttpClient) {
    super();
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
