import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TRABAJADOR_URL } from '@utils/url_constants';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';


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
        params = params.append('Pages', pages.toString());
        params = params.append('Rows', rows.toString());
        params = params.append('idEstado', estado.toString());
        params = params.append('idTipo', tipo.toString());

        return this.http.get<any>(`${TRABAJADOR_URL}`, { params, headers: this.obtenerHeaders() });
    }

    getTipoTrabajador(
    ): Promise<any> {
        return this.http.get<any>(`${TRABAJADOR_URL}/Tipo`, { headers: this.obtenerHeaders() }).toPromise();
    }
}