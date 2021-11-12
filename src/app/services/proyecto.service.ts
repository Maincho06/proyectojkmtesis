import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { PROYECTO_URL, TRABAJADOR_URL } from '@utils/url_constants';
import { IApiResponse } from '@models/responsemodel';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProyectoService extends BaseService {

    constructor(
        private http: HttpClient,
    ) {
        super();
    }

    // Listado de Proyectos
    getProyectosPaginado(): Observable<any> {

        return this.http.get<any>(`${PROYECTO_URL}`, {  headers: this.obtenerHeaders() });
    }
    

}