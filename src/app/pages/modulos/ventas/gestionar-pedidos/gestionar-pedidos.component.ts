import { Component, OnInit } from '@angular/core';
import { PedidoService } from '@services/pedido.service';
import { BASE_INDEX_MODAL } from '@utils/general_constants';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DetallePedidoComponent } from './detalle-pedido/detalle-pedido.component';

@Component({
  selector: 'app-gestionar-pedidos',
  templateUrl: './gestionar-pedidos.component.html',
  styleUrls: ['./gestionar-pedidos.component.scss'],
  providers:[ DialogService]
})
export class GestionarPedidosComponent implements OnInit {

  listaPedido: any[];

  constructor(
    public dialogService: DialogService,
    private _pedidoService: PedidoService,
  ) { }

  async ngOnInit() {
    await this.obtenerPedido();
  }

  async obtenerPedido() {
    this.listaPedido = await this._pedidoService.getPedido();
  }

  detallePedido() {
    const dialogConfig = new DynamicDialogConfig();

    dialogConfig.width = '80vw';
    dialogConfig.baseZIndex = BASE_INDEX_MODAL;
    dialogConfig.header = 'Pedido';
    // dialogConfig.data = { 

    // }

    const ref = this.dialogService.open(DetallePedidoComponent, dialogConfig);
    ref.onClose.subscribe(async p => {
      console.log('P');
    })
  }

}
