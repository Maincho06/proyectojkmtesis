import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DetalleVentaComponent } from './detalle-venta/detalle-venta.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IVentaModel } from '@models/ventamodel';
import { VentasService } from '@services/ventas.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gestionar-venta',
  templateUrl: './gestionar-venta.component.html',
  styleUrls: ['./gestionar-venta.component.scss'],
  providers: [DialogService, ConfirmationService, MessageService]
})

export class GestionarVentaComponent implements OnInit {

  listaVentas: IVentaModel[]
  formVentas: FormGroup

  constructor(
    public dialogService: DialogService,
    private router: Router,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService,
    private _ventasService: VentasService
  ) { }

  ngOnInit(): void {
    this.listarVentas()
  }

  async listarVentas() {

    try {
      const data: any = await this._ventasService.getVentasPaginado({ pages: 1, rows: 10 }).toPromise();
      this.listaVentas = data.data;
      console.log(data.data)
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  detalleVenta(idVenta: number) {
    this.router.navigate(['/ventas/detalleVenta/' + idVenta])
  }

  eliminarVenta(idVenta: number) {

    this._confirmationService.confirm({
      message: '¿Estas seguro de eliminar esta venta?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',

      accept: async () => {

        try {
          let data = await this._ventasService.deleteVenta(idVenta).toPromise()

          console.log(data)

          this._messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Se elimino la venta satisfactoriamente' });
        } catch (error) {
          console.log("Error: ", error);
        }
      },
      reject: () => {
        this._messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'No se elimino la venta' });
      }
    });
  }

}
