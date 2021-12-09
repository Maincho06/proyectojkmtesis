import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { SERVICIO_URL } from '@utils/url_constants';
import { Observable } from 'rxjs';
import { IRegisterServicio, IUpdateServicio } from '@models/serviciomodel';


@Injectable({
    providedIn: 'root'
})

export class ServicioService extends BaseService {

    constructor(
        private http: HttpClient,
    ) {
        super();
    }

    // Listado de Servicio
    getServicioPaginado({ pages = 1, rows = 10 }): Observable<any> {

        let params = new HttpParams();
        params = params.append('Pages', pages.toString());
        params = params.append('Rows', rows.toString());

        return this.http.get<any>(`${SERVICIO_URL}`, { params, headers: this.obtenerHeaders() });
    }

    // Detalle de Servicio x ID
    getServicioxID(idServicio: number): Observable<any> {

        let params = new HttpParams();
        const url = `${SERVICIO_URL}/${idServicio}`

        return this.http.get<any>(url, { params, headers: this.obtenerHeaders() });
    }

    // Registrar Servicio
    registerServicio(servicio: IRegisterServicio): Promise<any> {

        return this.http.post<any>(`${SERVICIO_URL}`, servicio, { headers: this.obtenerHeaders() }).toPromise();
    }

    // Editar Servicio
    editServicio(servicio: IUpdateServicio): Promise<any> {
        const url = `${SERVICIO_URL}/${servicio.idServicio}`
        return this.http.put<any>(url, servicio, { headers: this.obtenerHeaders() }).toPromise()
    }

    // Actualizar Estado Servicio
    updateEstadoServicio(idServicio: number): Promise<any> {
        
        const url = `${SERVICIO_URL}/${idServicio}/Estado`

        return this.http.put<any>(url, { headers: this.obtenerHeaders() }).toPromise()
    }



}