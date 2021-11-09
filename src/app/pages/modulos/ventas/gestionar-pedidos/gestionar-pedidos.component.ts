import { Component, OnInit } from '@angular/core';
import { IPedidoModel } from '@models/pedidomodel';
import { BASE_INDEX_MODAL } from '@utils/general_constants';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ModalDetallePedidoComponent } from './modal-detalle-pedido/modal-detalle-pedido.component';

@Component({
  selector: 'app-gestionar-pedidos',
  templateUrl: './gestionar-pedidos.component.html',
  styleUrls: ['./gestionar-pedidos.component.scss'],
  providers:[ DialogService]
})
export class GestionarPedidosComponent implements OnInit {

  listaPedidos: IPedidoModel[] = [
    { id: 1, solicitante: "Mauricio", cliente: "Mauricio", fechaSolicitud: "01-11-2021", fechaEntrega: "15-12-2021" },
    { id: 2, solicitante: "Farfan", cliente: "Cesar", fechaSolicitud: "01-11-2021", fechaEntrega: "15-12-2021" },
  ];

  constructor(
    public dialogService: DialogService,
  ) { }

  ngOnInit(): void {

    

  }

  detallePedido() {
    const dialogConfig = new DynamicDialogConfig();

    dialogConfig.width = '80vw';
    dialogConfig.baseZIndex = BASE_INDEX_MODAL;
    dialogConfig.header = 'Pedido';
    // dialogConfig.data = { 

    // }

    const ref = this.dialogService.open(ModalDetallePedidoComponent, dialogConfig);
    ref.onClose.subscribe(async p => {
      console.log('P');
    })
  }

}
