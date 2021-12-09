import { Component, OnInit } from '@angular/core';
import { IProductoModel } from '@models/productomodel';
import { ProductoService } from '@services/producto.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { toast } from '@utils/toast';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gestionar-inventario',
  templateUrl: './gestionar-inventario.component.html',
  styleUrls: ['./gestionar-inventario.component.scss'],
})
export class GestionarInventarioComponent implements OnInit {
  listProductos: IProductoModel[];

  constructor(
    private _productoService: ProductoService,
    private _messageService: MessageService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    await this.listarProductos();
  }

  async listarProductos() {
    try {
      this.listProductos = await this._productoService.getProducto();
    } catch (error) {
      console.log('Error: ', error);
    } finally {
    }
  }

  editarProducto(idProducto: number) {
    this._router.navigate(['editar', idProducto], {
      relativeTo: this._activatedRoute,
    });
  }

  eliminarProducto(idProducto: number) {
    this.confirmationService.confirm({
      message: '¿Seguro que desea eliminar el producto?',
      header: 'Alerta',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: async () => {
        const data = await this._productoService.eliminarProducto(idProducto);
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
