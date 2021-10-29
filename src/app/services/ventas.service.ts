import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { VENTA_URL } from '@utils/url_constants';
import { Observable } from 'rxjs';
import { IRegisterVentaCuotas } from '@models/ventamodel';


@Injectable({
    providedIn: 'root'
})

export class VentasService extends BaseService {

    constructor(
        private http: HttpClient,
    ) {
        super();
    }

    getVentasPaginado({
        pages = 1,
        rows = 10,
    }): Observable<any> {
        let params = new HttpParams();
        params = params.append('Pages', pages.toString());
        params = params.append('Rows', rows.toString());

        return this.http.get<any>(`${VENTA_URL}`, { params, headers: this.obtenerHeaders() });
    }

    getVentaxID(idVenta: number): Observable<any> {
        let params = new HttpParams();
        const url = `${VENTA_URL}/${idVenta}`

        return this.http.get<any>(url, { params, headers: this.obtenerHeaders() });
    }

    registerCuotasxVenta(ventaCuotas: IRegisterVentaCuotas): Promise<any> {
        return this.http.post<any>(`${VENTA_URL}`, ventaCuotas, { headers: this.obtenerHeaders() }).toPromise();
    }

    getCuotasxVenta(idVenta: number): Observable<any> {
        let params = new HttpParams();
        const url = `${VENTA_URL}/${idVenta}/Cuotas`

        return this.http.get<any>(url, { params, headers: this.obtenerHeaders() })
    }

    deleteVenta(idVenta: number): Observable<any> {
        let params = new HttpParams();
        const url = `${VENTA_URL}/${idVenta}`

        return this.http.delete<any>(url, { params, headers: this.obtenerHeaders() })
    }

    getTipoVenta(): Observable<any> {
        let params = new HttpParams();
        const url = `${VENTA_URL}/Tipo`

        return this.http.get<any>(url, { params, headers: this.obtenerHeaders() });
    }

}