import { Component, OnInit } from '@angular/core';
import { IProductoModel } from '@models/productomodel';
import { ProductoService } from '@services/producto.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { toast } from '@utils/toast';
import { IApiResponseModelGet } from '@models/responsemodel';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BASE_INDEX_MODAL } from '@utils/general_constants';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';

@Component({
  selector: 'app-gestionar-inventario',
  templateUrl: './gestionar-inventario.component.html',
  styleUrls: ['./gestionar-inventario.component.scss']
})
export class GestionarInventarioComponent implements OnInit {

  listProductos: IProductoModel[];

  constructor(
    private _productoService: ProductoService,
    private _messageService: MessageService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService
    ) {}

  async ngOnInit() {
    await this.listarProductos();
  }

  async listarProductos() {
    try {
      this.listProductos =
        await this._productoService
          .getProducto();
    } catch (error) {
      console.log('Error: ', error);
    } finally {
    }
  }

  detalleProducto(isRegistrar: boolean, data: any) {
    const dialogConfig = new DynamicDialogConfig();

    dialogConfig.width = '80vw';
    dialogConfig.baseZIndex = BASE_INDEX_MODAL;
    dialogConfig.header = 'Registrar Producto';
    dialogConfig.data = {
      isRegistrar: isRegistrar,
      data: data,
    };

    const ref = this.dialogService.open(
      DetalleProductoComponent,
      dialogConfig
    );

    ref.onClose.subscribe(async () => await this.listarProductos());
  }


  eliminarProducto(idProducto: number) {
    this.confirmationService.confirm({
      message: '¿Seguro que desea eliminar el producto?',
      header: 'Alerta',
      icon: 'pi pi-info-circle',
      accept: async () => {
        const data = await this._productoService.eliminarProducto(
          idProducto
        );
        if (!!data.message) {
          this.listProductos = this.listProductos.filter(
            (item) => item.idProducto != idProducto
          );
          toast({
            title: 'Eliminación exitosa',
            message: data?.message,
            type: 'success',
            messageService: this._messageService,
          });
        }
      },
    });
  }

}
