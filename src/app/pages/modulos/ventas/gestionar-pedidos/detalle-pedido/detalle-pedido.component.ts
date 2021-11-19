import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from '@services/pedido.service';
import { ObvsService } from '@services/obvs.service';
import { ActivatedRoute } from '@angular/router';
import { EstadoGeneral } from '@models/generalmodel';
import { Identifier } from '@models/identifiermodel';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss'],
})
export class DetallePedidoComponent implements OnInit {
  formPedido: FormGroup;
  pedido: any;
  idPedido: number;
  isEstadoCreado: boolean = true;
  productos: any[];
  listaEstadoPedido: EstadoGeneral[];
  precioTotal: number;
  listEstados: Identifier[];

  constructor(
    private _formBuilder: FormBuilder,
    private _pedidoService: PedidoService,
    private _obvsService: ObvsService,
    private route: ActivatedRoute
  ) {
    this.crearFormPedido();
  }

  async ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idPedido = params.id;
    });
    await this.obtenerPedidoById(this.idPedido);
    await this.obteneEstadoPedido();
    this.inicializarFormulario(this.pedido);
  }

  crearFormPedido() {
    this.formPedido = this._formBuilder.group({
      'codigo'        : [null,[Validators.required]],
      'solicitante'   : [null,[Validators.required]],
      'cliente'       : [null,[Validators.required]],
      'fechaSolicitud': [ {value: null, disabled: true},[Validators.required]],
      'fechaEntrega'  : [null, [Validators.required]],
      'estado'        : [null,[Validators.required]],
    });
  }

  inicializarFormulario(pedido: any) {
    this.formPedido.reset({
      codigo        : pedido.codigoOrden,
      solicitante   : pedido.solicitante,
      cliente       : pedido.cliente,
      fechaSolicitud: new Date(pedido.fechaRegistro),
      fechaEntrega  : pedido.fechaEntregaString !== null ? new Date(pedido.fechaEntrega) : null,
      estado        : pedido.estado
    });
    // if(!this.isEstadoCreado)  this.formPedido.get('fechaEntrega').disable();
  }

  async obtenerPedidoById(id: number) {
    try {
      this._obvsService.toogleSpinner();
      this.pedido = await this._pedidoService.getPedidoById(id);
      console.log(this.pedido)
      this.productos = this.pedido.pedidos;
      this.precioTotal = this.pedido.precio;
      this.isEstadoCreado = this.pedido.estado.id == 1 ? true : false;
    } catch (error) {
      console.error(error);
    } finally {
      this._obvsService.toogleSpinner();
    }
  }

  async obteneEstadoPedido() {
    try {
      this.listaEstadoPedido = await this._pedidoService.getEstadoPedido();
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }

  async actualizarPedido() {
    try {
      this._obvsService.toogleSpinner();
      const idEstado = this.formPedido.get('estado').value.id;
      const fechaEntrega = new Date(this.formPedido.get('fechaEntrega').value);


      const respEstado = await this._pedidoService.updatePedidoEstado(this.idPedido, idEstado);
      const respEntrega = await this._pedidoService.updatePedidoFechaEntrega(this.idPedido, fechaEntrega);

      console.log('RESP ESTADO: ', respEstado);
      console.log('RESP ENTREGA: ', respEntrega);
    } catch (error) {
      console.error(error);
    } finally {
      this._obvsService.toogleSpinner();
    }
  }



}
