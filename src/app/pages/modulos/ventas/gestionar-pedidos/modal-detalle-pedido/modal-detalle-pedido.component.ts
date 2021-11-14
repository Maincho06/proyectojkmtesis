import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-detalle-pedido',
  templateUrl: './modal-detalle-pedido.component.html',
  styleUrls: ['./modal-detalle-pedido.component.scss']
})
export class ModalDetallePedidoComponent implements OnInit {

  formPedido: FormGroup;
  products: any[];


  constructor(
    private _formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
    this.crearFormPedido();
   }

  ngOnInit(): void {
    console.log('HOLA');
  }

  crearFormPedido() {
    this.formPedido = this._formBuilder.group({
      'codigo'        : [null,[Validators.required]],
      'solicitante'   : [null,[Validators.required]],
      'cliente'       : [null,[Validators.required]],
      'fechaSolicitud': [null,[Validators.required]],
      'fechaEntrega'  : [null, [Validators.required]],
      'estado'        : [null,[Validators.required]],
      'tipo'        : [null,[Validators.required]]
    });
  }

}
