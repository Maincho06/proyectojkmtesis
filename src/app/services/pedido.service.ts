import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoGeneral } from '@models/generalmodel';
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

  getPedidoById(idPedido: number): Promise<any> { 
    return this.http.get<any>(`${PEDIDO_URL}/${idPedido}`, { headers: this.obtenerHeaders()}).toPromise();
  }

  getEstadoPedido(): Promise<EstadoGeneral[]> { 
    return this.http.get<EstadoGeneral[]>(`${PEDIDO_URL}/Estados`, { headers: this.obtenerHeaders()}).toPromise();
  }

  updatePedidoEstado(idPedido: number, idEstado: number): Promise<any> {
    const body = {
      idEstado
    }
    return this.http.put<any>(`${PEDIDO_URL}/${idPedido}/Estado`,body, { headers: this.obtenerHeaders()}).toPromise();
  }

  updatePedidoFechaEntrega(idPedido: number, fechaEntrega: Date): Promise<any> {
    const body = {
      fechaEntrega
    };
    return this.http.put<any>(`${PEDIDO_URL}/${idPedido}/FechaEntrega`,body, { headers: this.obtenerHeaders()}).toPromise();
  }


}
