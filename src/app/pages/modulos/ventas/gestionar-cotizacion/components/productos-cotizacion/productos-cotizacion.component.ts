import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IDetalleOrdenModel, IRegisterDetalleOrdenCotizacion, IUpdateDetalleOrdenCotizacion } from '@models/cotizacionmodel';
import { IProductoModel } from '@models/productomodel';
import { CotizacionService } from '@services/cotizacion.service';
import { ProductoService } from '@services/producto.service';
import { TrabajadorService } from '@services/trabajador.service';
import { toast } from '@utils/toast';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-productos-cotizacion',
  templateUrl: './productos-cotizacion.component.html',
  styleUrls: ['./productos-cotizacion.component.scss'],
  providers: [ConfirmationService]
})
export class ProductosCotizacionComponent implements OnInit {

  idCotizacion: number;

  detalleOrden: IDetalleOrdenModel[] = []
  formProducto: FormGroup;
  productos: IProductoModel[] = [];
  mostrarModal = false;

  modificando = false;

  constructor(
    private formBuilder: FormBuilder,
    private _productoService: ProductoService,
    private _messageService: MessageService,
    private _cotizacionService: CotizacionService,
    private _confirmationService: ConfirmationService,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.inicializarForm();
  }

  async ngOnInit() {
    await this.listarProductos();

    this._activatedRoute.paramMap.subscribe(async params => {
      this.idCotizacion = Number(params.get('id'));
      await this.listarDetallOrdenPorCotizacion(this.idCotizacion);
    })
  }

  async listarDetallOrdenPorCotizacion(idCotizacion: number) {
    try {
      let data = await this._cotizacionService.getDetalleOrdenByCotizacion(idCotizacion);
      this.detalleOrden = data ?? [];
    } catch (error) {
      console.error(error);
      this.detalleOrden = [];
    }
  }

  async listarProductos() {
    try {
      let data = await this._productoService.getProducto();
      this.productos = data;
      console.log(data);

    } catch (error) {
      console.error(error);
      this.productos = [];
    }
  }

  inicializarForm() {
    this.formProducto = this.formBuilder.group({
      producto: [null, Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      idDetalleOrden: [null]
    })
  }

  nuevo() {
    this.mostrarModal = true;
    this.modificando = false;
    this.formProducto.reset();
    this.formProducto.controls.producto.enable();
  }

  modificar(detalleOrden: IDetalleOrdenModel) {
    this.mostrarModal = true;
    this.modificando = true;

    this.formProducto.patchValue({
      producto: this.productos.find(item => item.idProducto == detalleOrden.idProducto),
      cantidad: detalleOrden.cantidad,
      precio: detalleOrden.precio,
      idDetalleOrden: detalleOrden.idDetalleOrden
    })

    this.formProducto.controls.producto.disable();
  }

  guardarDetalleOrden() {
    if (this.modificando) {
      this.actualizarDetalleOrden();
    } else {
      this.registrarDetalleOrden();
    }
  }

  async actualizarDetalleOrden() {
    if (this.formProducto.invalid) {
      // Mostrar el snackbar
      toast({
        title: "Advertencia",
        message: 'Revise los campos ingresados',
        type: 'warn',
        messageService: this._messageService
      });
      return;
    }

    let form = this.formProducto.value;
    let detalleOrden: IUpdateDetalleOrdenCotizacion = {
      IdCotizacion: this.idCotizacion,
      Cantidad: form.cantidad,
      Precio: form.precio,
      IdDetalleOrden: form.idDetalleOrden
    }

    try {
      let data = await this._cotizacionService.updateDetalleOrdenCotizacion(detalleOrden);
      toast({
        title: "Correcto",
        message: 'Se actualizó correctamente',
        type: 'success',
        messageService: this._messageService
      });

      await this.listarDetallOrdenPorCotizacion(this.idCotizacion);

    } catch (error) {
      console.error(error);
    }
  }

  async registrarDetalleOrden() {
    if (this.formProducto.invalid) {
      // Mostrar el snackbar
      toast({
        title: "Advertencia",
        message: 'Revise los campos ingresados',
        type: 'warn',
        messageService: this._messageService
      });
      return;
    }

    let form = this.formProducto.value;
    let detalleOrden: IRegisterDetalleOrdenCotizacion = {
      IdCotizacion: this.idCotizacion,
      Cantidad: form.cantidad,
      Precio: form.precio,
      IdProducto: form.producto.idProducto
    }

    try {
      let data = await this._cotizacionService.registerDetalleOrdenCotizacion(detalleOrden);
      toast({
        title: "Correcto",
        message: 'Se registró correctamente',
        type: 'success',
        messageService: this._messageService
      });

      this.formProducto.reset();
      await this.listarDetallOrdenPorCotizacion(this.idCotizacion);

    } catch (error) {
      console.error(error);
    }
  }

  deleteDetalleOrden(detalleOrden: IDetalleOrdenModel) {
    this._confirmationService.confirm({
      message: '¿Desea eliminar el producto indicado?',
      header: 'Alerta',
      acceptLabel: "Si",
      rejectLabel: "No",
      accept: async () => {
        try {
          await this._cotizacionService.deleteDetalleOrdenCotizacion(this.idCotizacion, detalleOrden.idDetalleOrden);

          toast({
            title: "Correcto",
            message: 'Se eliminó correctamente',
            type: 'success',
            messageService: this._messageService
          });

          await this.listarDetallOrdenPorCotizacion(this.idCotizacion);

        } catch (err) {
          console.error(err);
        }
      }
    });
  }

}
