import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { CATALOGO_URL } from '@utils/url_constants';
import { Observable } from 'rxjs';
import { IRegisterCatalogo, IUpdateCatalogo } from '@models/catalogomodel';

@Injectable({
    providedIn: 'root'
})

export class CatalogoService extends BaseService {

    constructor(
        private http: HttpClient,
    ) {
        super();
    }

    // Listado de Catálogo
    getCatalogoPaginado({ pages = 1, rows = 10 }): Observable<any> {

        let params = new HttpParams();
        params = params.append('Pages', pages.toString());
        params = params.append('Rows', rows.toString());

        return this.http.get<any>(`${CATALOGO_URL}`, { params, headers: this.obtenerHeaders() });
    }

    // Detalle de Catálogo x ID
    getCatalogoxID(idCatalogo: number): Observable<any> {

        let params = new HttpParams();
        const url = `${CATALOGO_URL}/${idCatalogo}`

        return this.http.get<any>(url, { params, headers: this.obtenerHeaders() });
    }

    // Registrar Catálogo
    registerCatalogo(catalogo: IRegisterCatalogo): Promise<any> {

        return this.http.post<any>(`${CATALOGO_URL}`, catalogo, { headers: this.obtenerHeaders() }).toPromise();
    }

    // Editar Catálogo
    editCatalogo(catalogo: IUpdateCatalogo): Promise<any> {

        const url = `${CATALOGO_URL}/${catalogo.idCatalogo}`
        return this.http.put<any>(url, catalogo, { headers: this.obtenerHeaders() }).toPromise()
    }

    // Actualizar Estado Catalogo
    updateEstadoCatalogo(idCatalogo: number): Promise<any> {
        
        const url = `${CATALOGO_URL}/${idCatalogo}/Estado`

        return this.http.put<any>(url, { headers: this.obtenerHeaders() }).toPromise()
    }

}