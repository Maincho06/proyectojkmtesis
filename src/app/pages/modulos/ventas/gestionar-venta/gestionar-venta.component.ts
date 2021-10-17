import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DetalleVentaComponent } from './detalle-venta/detalle-venta.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IVentaModel } from '@models/ventamodel';
import { VentasService } from '@services/ventas.service';


@Component({
  selector: 'app-gestionar-venta',
  templateUrl: './gestionar-venta.component.html',
  styleUrls: ['./gestionar-venta.component.scss'],
  providers: [DialogService, ConfirmationService, MessageService]
})

export class GestionarVentaComponent implements OnInit {

  listaVentas: IVentaModel[] = []
  formVentas: FormGroup

  constructor(
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _ventasService: VentasService
  ) { }

  ngOnInit(): void {
    this.listarVentas()
  }

  async listarVentas() {

    try {
      const data: any = await this._ventasService.getTrabajadorPaginado().toPromise();
      this.listaVentas = data.data;
    } catch (error) {
      console.log("Error: ", error);
    }
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
