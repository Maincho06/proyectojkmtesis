import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DetalleVentaComponent } from './detalle-venta/detalle-venta.component';
import { ConfirmationService, MessageService } from 'primeng/api';

export interface VentaModel {
  idVenta: number;
  precioTotal: number;
  ruc: string;
  razonSocial: string;
  fechaRegistro: Date | string | null;
  idTipo: number;
  tipoDescripcion: string;
  idEstado: number;
  estadoDescripcion: string;
}

@Component({
  selector: 'app-gestionar-venta',
  templateUrl: './gestionar-venta.component.html',
  styleUrls: ['./gestionar-venta.component.scss'],
  providers: [DialogService, ConfirmationService, MessageService]
})

export class GestionarVentaComponent implements OnInit {

  ventas: VentaModel[]
  formVentas: FormGroup

  constructor(
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.ventas = [
      {
        idVenta: 1,
        precioTotal: 15,
        ruc: "123123",
        razonSocial: "venta 1",
        fechaRegistro: "14/10/2021",
        idTipo: 2,
        tipoDescripcion: "Tipo",
        idEstado: 2,
        estadoDescripcion: "Estado",
      },
      {
        idVenta: 2,
        precioTotal: 15,
        ruc: "123123",
        razonSocial: "venta 2",
        fechaRegistro: "14/10/2021",
        idTipo: 2,
        tipoDescripcion: "Tipo",
        idEstado: 2,
        estadoDescripcion: "Estado",
      },
      {
        idVenta: 3,
        precioTotal: 15,
        ruc: "123123",
        razonSocial: "venta 3",
        fechaRegistro: "14/10/2021",
        idTipo: 2,
        tipoDescripcion: "Tipo",
        idEstado: 2,
        estadoDescripcion: "Estado",
      },
      {
        idVenta: 4,
        precioTotal: 15,
        ruc: "123123",
        razonSocial: "venta 4",
        fechaRegistro: "14/10/2021",
        idTipo: 2,
        tipoDescripcion: "Tipo",
        idEstado: 2,
        estadoDescripcion: "Estado",
      },
      {
        idVenta: 5,
        precioTotal: 15,
        ruc: "123123",
        razonSocial: "venta 5",
        fechaRegistro: "14/10/2021",
        idTipo: 2,
        tipoDescripcion: "Tipo",
        idEstado: 2,
        estadoDescripcion: "Estado",
      },
    ]
  }

  detalleVenta() {

    const dialogConfig = new DynamicDialogConfig()

    dialogConfig.width = '50vw'
    dialogConfig.header = 'Registrar Venta'

    const ref = this.dialogService.open(DetalleVentaComponent, dialogConfig);
  }

  eliminarVenta() {

    this.confirmationService.confirm({
      message: '¿Estas seguro de eliminar esta venta?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Se elimino la venta satisfactoriamente' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'No se elimino la venta' });
      }
    });
  }

}
