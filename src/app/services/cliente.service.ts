import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegisterCliente, IUpdateCliente } from '@models/clientemodel';
import { CLIENTE_URL } from '@utils/url_constants';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseService {

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  getClientePaginado({
    pages = 1,
    rows = 100
  }): Promise<any> {
    let params = new HttpParams();
    params = params.append('Pages', pages.toString());
    params = params.append('Rows', rows.toString());

    return this.http.get<any>(`${CLIENTE_URL}`, { params, headers: this.obtenerHeaders() }).toPromise();
  }

  registerCliente(
    cliente: IRegisterCliente
  ): Promise<any> {
    return this.http.post<any>(`${CLIENTE_URL}`, cliente, { headers: this.obtenerHeaders() }).toPromise();
  }

  updateCliente(
    cliente: IUpdateCliente
  ): Promise<any> {
    let params = new HttpParams();
    params = params.append('idCliente', cliente.IdCliente.toString());

    return this.http.put<any>(`${CLIENTE_URL}/${cliente.IdCliente}`, cliente, { headers: this.obtenerHeaders() }).toPromise();
  }
}
