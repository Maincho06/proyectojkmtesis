import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DetalleVentaComponent } from './detalle-venta/detalle-venta.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IVentaModel } from '@models/ventamodel';
import { VentasService } from '@services/ventas.service';
import { Router } from '@angular/router';
import { ObvsService } from '@services/obvs.service';

@Component({
  selector: 'app-gestionar-venta',
  templateUrl: './gestionar-venta.component.html',
  styleUrls: ['./gestionar-venta.component.scss'],
  providers: [DialogService, ConfirmationService, MessageService],
})
export class GestionarVentaComponent implements OnInit {
  listaVentas: IVentaModel[];
  formVentas: FormGroup;

  constructor(
    public dialogService: DialogService,
    private router: Router,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService,
    private _ventasService: VentasService,
    private _obvsService: ObvsService
  ) {}

  ngOnInit(): void {
    this.listarVentas();
  }

  async listarVentas() {
    try {
      this._obvsService.toogleSpinner();
      const data: any = await this._ventasService
        .getVentasPaginado({ pages: 1, rows: 10 })
        .toPromise();
      this.listaVentas = data.data;
      console.log('VENTAS', this.listaVentas);
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      this._obvsService.toogleSpinner();
    }
  }

  verDetalle(idVenta: number) {
    this.router.navigate(['/ventas/gestionarVenta/ver/' + idVenta]);
  }

  editarDetalle(idVenta: number) {
    this.router.navigate(['/ventas/gestionarVenta/editar/' + idVenta]);
  }

  eliminarVenta(idVenta: number) {
    this._confirmationService.confirm({
      message: '¿Estas seguro de eliminar esta venta?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          await this._ventasService.deleteVenta(idVenta).toPromise();
          this._messageService.add({
            severity: 'success',
            summary: 'Confirmado',
            detail: 'Se elimino la venta satisfactoriamente',
          });
        } catch (error) {
          console.log('Error: ', error);
        }
      },
      reject: () => {
        this._messageService.add({
          severity: 'error',
          summary: 'Cancelado',
          detail: 'No se elimino la venta',
        });
      },
    });
  }
}
