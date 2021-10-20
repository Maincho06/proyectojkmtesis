import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegisterCotizacion, IRegisterTrabajadorCotizacion, IUpdateCotizacion } from '@models/cotizacionmodel';
import { COTIZACION_URL } from '@utils/url_constants';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService extends BaseService {

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  getCotizacionPaginado({
    pages = 1,
    rows = 100
  }): Promise<any> {
    let params = new HttpParams();
    params = params.append('Pages', pages.toString());
    params = params.append('Rows', rows.toString());

    return this.http.get<any>(`${COTIZACION_URL}`, { params, headers: this.obtenerHeaders() }).toPromise();
  }

  getCotizacionById(
    idCotizacion: number
  ): Promise<any> {

    return this.http.get<any>(`${COTIZACION_URL}/${idCotizacion}`, { headers: this.obtenerHeaders() }).toPromise();
  }

  registerCotizacion(
    cotizacion: IRegisterCotizacion
  ): Promise<any> {
    return this.http.post<any>(`${COTIZACION_URL}`, cotizacion, { headers: this.obtenerHeaders() }).toPromise();
  }

  updateCotizacion(
    cotizacion: IUpdateCotizacion
  ): Promise<any> {
    return this.http.put<any>(`${COTIZACION_URL}/${cotizacion.IdCotizacion}`, cotizacion, { headers: this.obtenerHeaders() }).toPromise();
  }

  registerTipoTrabajadorCotizacion(
    tipoTrabajador: IRegisterTrabajadorCotizacion
  ): Promise<any> {
    return this.http.post<any>(`${COTIZACION_URL}/${tipoTrabajador.IdCotizacion}/Trabajadores`,
      tipoTrabajador, { headers: this.obtenerHeaders() }).toPromise();
  }
}
