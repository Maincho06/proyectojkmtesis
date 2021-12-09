import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductoModel, IRegisterProducto } from '@models/productomodel';
import { ProductoService } from '@services/producto.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { base64ToFile, imageToBase64 } from '@utils/form';
import { toast } from '@utils/toast';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss'],
})
export class DetalleProductoComponent implements OnInit {
  formProducto: FormGroup;
  idProducto: number;
  producto: IProductoModel;
  uploadedFiles: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private _productoService: ProductoService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _messageService: MessageService
  ) {}

  async ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      if (Boolean(params.id)) this.idProducto = params.id;
    });

    this.crearFormProducto();

    if (this.idProducto) {
      const response = await this._productoService.getProductoById(
        this.idProducto
      );
      this.inicializarFormulario(response);
    }
  }

  crearFormProducto() {
    this.formProducto = this.formBuilder.group({
      nombre: [null, [Validators.required]],
      codigo: [null, [Validators.required]],
      imagen: [null, [Validators.required]],
    });
  }

  inicializarFormulario(producto: IProductoModel) {
    this.formProducto.reset({
      nombre: producto.nombre,
      codigo: producto.codigo,
      imagen: producto.imagen,
    });
    const promises = Promise.all(base64ToFile([producto.imagen]));
    promises.then((data) => (this.uploadedFiles = data));
  }

  async registrarProducto() {
    try {
      let model: IRegisterProducto = {
        nombre: this.formProducto.get('nombre').value,
        codigo: this.formProducto.get('codigo').value,
        imagen: this.formProducto.get('imagen').value,
      };

      let data: any;
      if (this.idProducto) {
        data = await this._productoService.updateProducto(
          model,
          this.idProducto
        );
      } else {
        data = await this._productoService.registrarProducto(model);
      }
      toast({
        title: 'Producto',
        message: data.message,
        type: 'success',
        messageService: this._messageService,
      });
      this._router.navigate(['almacen', 'gestionarInventario']);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }

  onUpload(event) {
    const promises = imageToBase64(event.files);
    Promise.all(promises).then((image) =>
      this.formProducto.get('imagen').setValue(image[0])
    );
  }
}
