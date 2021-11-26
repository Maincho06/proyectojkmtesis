import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from '@services/pedido.service';
import { ObvsService } from '@services/obvs.service';
import { ActivatedRoute } from '@angular/router';
import { EstadoGeneral } from '@models/generalmodel';
import { Identifier } from '@models/identifiermodel';
import { MessageService } from 'primeng/api';
import { toast } from '@utils/toast';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SIZE_MODAL } from '../../../../../utils/general_constants';
import { ModalContainerComponent } from '@components/modal-container/modal-container.component';
import * as moment from 'moment';

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
    private route: ActivatedRoute,
    public _dialogService: DialogService,
    private _messageService: MessageService,
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

    if (this.formPedido.invalid) {
      return Object.values(this.formPedido.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }
    
    if(this.validarFechaEntrega()) {
      toast({
        title: 'Alerta',
        message: 'La fecha de entrega no puede ser menor a la fecha actual',
        type: 'warn',
        messageService: this._messageService,
      });
      return;
    }
    try {
      this._obvsService.toogleSpinner();
      const idEstado = this.formPedido.get('estado').value.id;
      const fechaEntrega = new Date(this.formPedido.get('fechaEntrega').value);


      const respEstado = await this._pedidoService.updatePedidoEstado(this.idPedido, idEstado);
      const respEntrega = await this._pedidoService.updatePedidoFechaEntrega(this.idPedido, fechaEntrega);
      
      toast({
        title: 'Se actualizó de manera correcta',
        message: '',
        type: 'success',
        messageService: this._messageService,
      });

    } catch (error) {
      console.error(error);
    } finally {
      this._obvsService.toogleSpinner();
    }
  }

  verImagen(imagen: string) {
    const ref = this._dialogService.open(ModalContainerComponent, {
      width: SIZE_MODAL,
      data: {
        'imagen':imagen
      },
      dismissableMask: true,
      showHeader: false
    })
  }

  validarFechaEntrega(): boolean {
    const fechaEntregaForm = this.formPedido.get('fechaEntrega').value;
    const fechaEntregaString = moment(fechaEntregaForm).format('yyyy-MM-DD');
    const fechaEntregaM = moment(fechaEntregaString,'yyyy-MM-DD');
    const fechaHoy = moment(moment().format('yyyy-MM-DD'),'yyyy-MM-DD');
    if(fechaEntregaM < fechaHoy) return true;
    if(fechaEntregaM > fechaHoy) return false;
    return false;
  }

  // get Validación
  get getValidarFechaEntrega()  {
    if(this.validarFechaEntrega()) return true;
    if(this.formPedido.get('fechaEntrega').invalid && 
    this.formPedido.get('fechaEntrega').touched) return true;
  }

}
