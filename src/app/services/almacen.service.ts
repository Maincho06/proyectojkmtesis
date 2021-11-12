import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegisterCliente, IUpdateCliente } from '@models/clientemodel';
import { ALMACEN_URL, CLIENTE_URL } from '@utils/url_constants';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { IAlmaceModel, IRegisterAlmacen } from '../shared/models/almacenmodel';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService extends BaseService {

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  getAlmacen(): Promise<IAlmaceModel[]> {
    return this.http.get<IAlmaceModel[]>(`${ALMACEN_URL}`, { headers: this.obtenerHeaders() }).toPromise();
  }

  registerAlmacen(
    almacen: IRegisterAlmacen
  ): Promise<any> {
    return this.http.post<any>(`${ALMACEN_URL}`, almacen, { headers: this.obtenerHeaders() }).toPromise();
  }

  updateAlmacen(
    almacen: IRegisterAlmacen
  ): Promise<any> {
    return this.http.put<any>(`${ALMACEN_URL}/${almacen.idAlmacen}`, almacen, { headers: this.obtenerHeaders() }).toPromise();
  }
}
