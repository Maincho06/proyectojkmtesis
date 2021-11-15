import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from '@services/pedido.service';
import { ObvsService } from '@services/obvs.service';
import { ActivatedRoute } from '@angular/router';
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
  productos: any[];
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
    await this.obtenerEstados();
    this.inicializarFormulario(this.pedido);
  }

  crearFormPedido() {
    this.formPedido = this._formBuilder.group({
      codigo: [null, [Validators.required]],
      solicitante: [null, [Validators.required]],
      cliente: [null, [Validators.required]],
      fechaSolicitud: [null, [Validators.required]],
      fechaEntrega: [null, [Validators.required]],
      estado: [null, [Validators.required]],
    });
  }

  inicializarFormulario(pedido: any) {
    console.log('PEDIDO FORM: ', pedido);
    this.formPedido.reset({
      codigo: pedido.codigoOrden,
      solicitante: pedido.solicitante,
      cliente: pedido.cliente,
      fechaSolicitud: new Date(pedido.fechaRegistro),
      // fechaEntrega  : pedido.fechaEntrega,
      estado: pedido.estado,
    });
  }

  async obtenerPedidoById(id: number) {
    try {
      this._obvsService.toogleSpinner();
      this.pedido = await this._pedidoService.getPedidoById(id);
      this.productos = this.pedido.pedidos;
      this.precioTotal = this.pedido.precio;
    } catch (error) {
      console.error(error);
    } finally {
      this._obvsService.toogleSpinner();
    }
  }

  async obtenerEstados() {
    try {
      this.listEstados = await this._pedidoService.getEstados();
    } catch (error) {
      console.error(error);
    }
  }
}
