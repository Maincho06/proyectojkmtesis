import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PRODUCTO_URL } from '@utils/url_constants';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class ProductoService extends BaseService {

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  getProducto(): Promise<any> {

    return this.http.get<any>(`${PRODUCTO_URL}`, { headers: this.obtenerHeaders() }).toPromise();
  }

}
