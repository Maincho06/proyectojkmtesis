import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { USUARIO_URL } from '@utils/url_constants';
import { Observable } from 'rxjs';
import { IRegisterUsuario } from '@models/usuariomodel';

@Injectable({
    providedIn: 'root'
})

export class UsuariosService extends BaseService {

    constructor(
        private http: HttpClient,
    ) {
        super();
    }

    // Listado de Usuarios
    getUsuariosPaginado({
        pages = 1,
        rows = 10,
    }): Observable<any> {
        let params = new HttpParams();
        params = params.append('Pages', pages.toString());
        params = params.append('Rows', rows.toString());

        return this.http.get<any>(`${USUARIO_URL}`, { params, headers: this.obtenerHeaders() });
    }

    // Detalle de Usuario x ID
    getUsuarioxID(idUsuario: number): Observable<any> {
        let params = new HttpParams();
        const url = `${USUARIO_URL}/${idUsuario}`

        return this.http.get<any>(url, { params, headers: this.obtenerHeaders() });
    }

    // Registrar Usuario
    registerUsuario(usuario: IRegisterUsuario): Promise<any> {
        return this.http.post<any>(`${USUARIO_URL}`, usuario, { headers: this.obtenerHeaders() }).toPromise();
    }

    // Editar Usuario
    // editUsuario(idUsuario: string, usuario: IUsuarioModel){

    // }

    // Eliminar Usario
    deleteUsuario(idUsuario: number): Observable<any> {
        let params = new HttpParams();
        const url = `${USUARIO_URL}/${idUsuario}`

        return this.http.delete<any>(url, { params, headers: this.obtenerHeaders() })
    }

    // Roles Usuario
    getRoles(): Observable<any> {
        let params = new HttpParams();
        const url = `${USUARIO_URL}/Rol`

        return this.http.get<any>(url, { params, headers: this.obtenerHeaders() });
    }

}