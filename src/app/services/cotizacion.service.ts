import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAceptarCotizacion, IRegisterActividadCotizacion, IRegisterCotizacion, IRegisterTrabajadorCotizacion, IUpdateActividadCotizacion, IUpdateCotizacion, IUpdateTrabajadorCotizacion } from '@models/cotizacionmodel';
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

  getCotizacionPaginado(): Promise<any> {

    return this.http.get<any>(`${COTIZACION_URL}`, { headers: this.obtenerHeaders() }).toPromise();
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

  getTrabajadoresByCotizacion(
    idCotizacion: number
  ): Promise<any> {

    return this.http.get<any>(`${COTIZACION_URL}/${idCotizacion}/Trabajadores`, { headers: this.obtenerHeaders() }).toPromise();
  }

  updateTipoTrabajadorCotizacion(
    cotizacion: IUpdateTrabajadorCotizacion
  ): Promise<any> {
    return this.http.put<any>(`${COTIZACION_URL}/${cotizacion.IdCotizacion}/Trabajadores/${cotizacion.IdTipoTrabajador}`,
      cotizacion, { headers: this.obtenerHeaders() }).toPromise();
  }

  deleteTipoTrabajadorCotizacion(
    idCotizacion: number,
    idTipo: number
  ): Promise<any> {
    return this.http.delete<any>(`${COTIZACION_URL}/${idCotizacion}/Trabajadores/${idTipo}`, { headers: this.obtenerHeaders() }).toPromise();
  }


  getActividadByCotizacion(
    idCotizacion: number
  ): Promise<any> {
    return this.http.get<any>(`${COTIZACION_URL}/${idCotizacion}/Actividades`, { headers: this.obtenerHeaders() }).toPromise();
  }

  registerActividadByCotizacion(
    actividad: IRegisterActividadCotizacion
  ): Promise<any> {
    return this.http.post<any>(`${COTIZACION_URL}/${actividad.IdCotizacion}/Actividades`,
      actividad, { headers: this.obtenerHeaders() }).toPromise();
  }

  updateActividadByCotizacion(
    cotizacion: IUpdateActividadCotizacion
  ): Promise<any> {
    return this.http.put<any>(`${COTIZACION_URL}/${cotizacion.IdCotizacion}/Actividades/${cotizacion.IdActividad}`,
      cotizacion, { headers: this.obtenerHeaders() }).toPromise();
  }

  deleteActividadCotizacion(
    idCotizacion: number,
    idActividad: number
  ): Promise<any> {
    return this.http.delete<any>(`${COTIZACION_URL}/${idCotizacion}/Actividades/${idActividad}`, { headers: this.obtenerHeaders() }).toPromise();
  }


  rechazarCotizacion(
    idCotizacion: number
  ): Promise<any> {
    return this.http.put<any>(`${COTIZACION_URL}/${idCotizacion}/rechazar`, { headers: this.obtenerHeaders() }).toPromise();
  }

  aceptarCotizacion(
    cotizacion: IAceptarCotizacion
  ): Promise<any> {
    return this.http.put<any>(`${COTIZACION_URL}/${cotizacion.IdCotizacion}/aceptar`, cotizacion, { headers: this.obtenerHeaders() }).toPromise();
  }
}
