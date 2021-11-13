import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NOTIFICATION_URL } from '@utils/url_constants';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  recoverAccount(body: { email: string }) {
    return this.http
      .post<any>(`${NOTIFICATION_URL}/auth/recuperarUsuario`, body, {
        headers: this.obtenerHeaders(),
      })
      .toPromise();
  }

  aceptarCotizacion(idCotizacion) {
    return this.http
      .post<any>(`${NOTIFICATION_URL}/cotizacion/${idCotizacion}`, {
        headers: this.obtenerHeaders(),
      })
      .toPromise();
  }
}
