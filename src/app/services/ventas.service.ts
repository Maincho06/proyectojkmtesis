import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    getTrabajadorPaginado(): Observable<any> {
        return this.http.get<any>(`${VENTA_URL}`, { headers: this.obtenerHeaders() });
    }

}