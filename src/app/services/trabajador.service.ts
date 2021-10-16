import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { TRABAJADOR_URL } from '@utils/url_constants';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class TrabajadorService extends BaseService {

    constructor(
        private http: HttpClient,
    ) {
        super();
    }

    getTrabajadorPaginado({
        pages = 1,
        rows = 10, 
        estado = 0,
        tipo = 0
    }): Observable<any> {
        let params = new HttpParams();
        params = params.append('Pages' ,pages.toString());
        params = params.append('Rows'  ,rows.toString());
        params = params.append('idEstado',estado.toString());
        params = params.append('idTipo'  ,tipo.toString());

        return this.http.get<any>(`${TRABAJADOR_URL}`, { params, headers: this.obtenerHeaders()});
    }

}