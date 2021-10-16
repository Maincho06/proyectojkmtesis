import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class ProyectoService extends BaseService {

    constructor(
        private http: HttpClient,
    ) {
        super();
    }

}