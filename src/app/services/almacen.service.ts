import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegisterCliente, IUpdateCliente } from '@models/clientemodel';
import { CLIENTE_URL } from '@utils/url_constants';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { IRegisterAlmacen } from '../shared/models/almacenmodel';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService extends BaseService {

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  getAlmacenPaginado({
    pages = 1,
    rows = 100
  }): Promise<any> {
    let params = new HttpParams();
    params = params.append('Pages', pages.toString());
    params = params.append('Rows', rows.toString());

    return this.http.get<any>(`${CLIENTE_URL}`, { params, headers: this.obtenerHeaders() }).toPromise();
  }

  registerAlmacen(
    almacen: IRegisterAlmacen
  ): Promise<any> {
    return this.http.post<any>(`${CLIENTE_URL}`, almacen, { headers: this.obtenerHeaders() }).toPromise();
  }

  updateAlmacen(
    cliente: IUpdateCliente
  ): Promise<any> {
    let params = new HttpParams();
    params = params.append('idCliente', cliente.IdCliente.toString());

    return this.http.put<any>(`${CLIENTE_URL}/${cliente.IdCliente}`, cliente, { headers: this.obtenerHeaders() }).toPromise();
  }
}
