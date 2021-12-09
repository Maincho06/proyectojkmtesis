import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PRODUCTO_URL } from '@utils/url_constants';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { IRegisterProducto } from '@models/productomodel';

@Injectable({
  providedIn: 'root',
})
export class ProductoService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getProductoPaginado({ pages = 1, rows = 10 }): Observable<any> {
    let params = new HttpParams();
    params = params.append('Pages', pages.toString());
    params = params.append('Rows', rows.toString());

    return this.http.get<any>(`${PRODUCTO_URL}`, {
      params,
      headers: this.obtenerHeaders(),
    });
  }

  getProducto() {
    return this.http
      .get<any>(`${PRODUCTO_URL}`, { headers: this.obtenerHeaders() })
      .toPromise();
  }

  getProductoById(idProducto: number) {
    return this.http
      .get<any>(`${PRODUCTO_URL}/${idProducto}`, {
        headers: this.obtenerHeaders(),
      })
      .toPromise();
  }

  registrarProducto(body: IRegisterProducto): Promise<any> {
    return this.http.post<any>(`${PRODUCTO_URL}`, body).toPromise();
  }

  updateProducto(body: IRegisterProducto, idProducto: number) {
    return this.http
      .put<any>(`${PRODUCTO_URL}/${idProducto}`, body)
      .toPromise();
  }

  eliminarProducto(idProducto: number) {
    return this.http.delete<any>(`${PRODUCTO_URL}/${idProducto}`).toPromise();
  }
}
