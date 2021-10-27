import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { VENTA_URL } from '@utils/url_constants';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class VentasService extends BaseService {

    constructor(
        private http: HttpClient,
    ) {
        super();
    }

    getTrabajadorPaginado({
        pages = 1,
        rows = 10,
    }): Observable<any> {
        let params = new HttpParams();
        params = params.append('Pages', pages.toString());
        params = params.append('Rows', rows.toString());

        return this.http.get<any>(`${VENTA_URL}`, { params, headers: this.obtenerHeaders() });
    }

}