import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PEDIDO_URL } from '@utils/url_constants';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends BaseService {

  constructor(
    private http: HttpClient
  ) { 
    super();
  }


  getPedido(): Promise<any> { 
    return this.http.get<any>(`${PEDIDO_URL}`, { headers: this.obtenerHeaders()}).toPromise();
  }

  getEstados(): Promise<any> { 
    return this.http.get<any>(`${PEDIDO_URL}/Estados`, { headers: this.obtenerHeaders()}).toPromise();
  }

  getPedidoById(idPedido: number): Promise<any> { 
    return this.http.get<any>(`${PEDIDO_URL}/${idPedido}`, { headers: this.obtenerHeaders()}).toPromise();
  }


}
