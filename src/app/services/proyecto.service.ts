import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { PROYECTO_URL, TRABAJADOR_URL } from '@utils/url_constants';
import { IApiResponse } from '@models/responsemodel';
import { Observable } from 'rxjs';
import { RegisterTrabajadorByProyecto, UpdateActividadByProyecto, UpdateProyecto } from '@models/proyectomodel';

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
    getProyectosPaginado(): Promise<any> {

        return this.http.get<any>(`${PROYECTO_URL}`, { headers: this.obtenerHeaders() }).toPromise();
    }

    getProyectoById(
        idProyecto: number
    ): Promise<any> {

        return this.http.get<any>(`${PROYECTO_URL}/${idProyecto}`, { headers: this.obtenerHeaders() }).toPromise();
    }

    getEstadosProyectos(): Promise<any> {

        return this.http.get<any>(`${PROYECTO_URL}/Estado`, { headers: this.obtenerHeaders() }).toPromise();
    }

    getActividadesByIdProyectos(
        idProyecto
    ): Promise<any> {

        return this.http.get<any>(`${PROYECTO_URL}/${idProyecto}/Actividades`, { headers: this.obtenerHeaders() }).toPromise();
    }

    getTrabajadoresByProyecto(
        idProyecto: number
    ): Promise<any> {

        return this.http.get<any>(`${PROYECTO_URL}/${idProyecto}/Trabajadores`, { headers: this.obtenerHeaders() }).toPromise();
    }


    deleteTrabajadoresByProyecto(
        idProyecto: number,
        idTrabajador: number
    ): Promise<any> {

        return this.http.delete<any>(`${PROYECTO_URL}/${idProyecto}/Trabajadores/${idTrabajador}`, { headers: this.obtenerHeaders() }).toPromise();
    }

    updateActividadByProyecto(
        proyecto: UpdateActividadByProyecto
    ): Promise<any> {
        return this.http.put<any>(`${PROYECTO_URL}/${proyecto.IdProyecto}/Actividades/${proyecto.IdActividad}`,
            proyecto, { headers: this.obtenerHeaders() }).toPromise();
    }


    updateProyecto(
        proyecto: UpdateProyecto
    ): Promise<any> {
        return this.http.put<any>(`${PROYECTO_URL}/${proyecto.IdProyecto}`,
            proyecto, { headers: this.obtenerHeaders() }).toPromise();
    }

    registerTrabajadorProyecto(
        proyecto: RegisterTrabajadorByProyecto
    ): Promise<any> {
        return this.http.post<any>(`${PROYECTO_URL}/${proyecto.IdProyecto}/Trabajadores`,
            proyecto, { headers: this.obtenerHeaders() }).toPromise();
    }
}