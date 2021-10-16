import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';


@Injectable({
    providedIn: 'root'
})
export class CotizacionService extends BaseService {

    constructor(
        private http: HttpClient,
    ) {
        super();
    }

}