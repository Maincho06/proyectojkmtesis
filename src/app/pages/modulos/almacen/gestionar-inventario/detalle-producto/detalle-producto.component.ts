import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductoModel, IRegisterProducto } from '@models/productomodel';
import { ProductoService } from '@services/producto.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit {

  formProducto: FormGroup;
  isRegistrar: boolean;
  idProducto: number;
  producto: IProductoModel;

  constructor(
    private formBuilder: FormBuilder,
    private _productoService: ProductoService,
    private route: ActivatedRoute,
    private _messageService: MessageService
  ) { }

  async ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log('PARAM: ', params.id);
      if(params.id === undefined) {
        this.isRegistrar = true;
      } else {
        this.idProducto = params.id;
        this.isRegistrar = false;
      }
      
    });
    // this.isRegistrar = this.config.data.isRegistrar;
    this.crearFormProducto();

    if (!this.isRegistrar) {
        // this.producto = this.config.data.data;
        this.inicializarFormulario(this.producto);
    }
  }

  crearFormProducto() {
    this.formProducto = this.formBuilder.group({
      nombre: [null, [Validators.required]],
      codigo: [null, [Validators.required]],
      imagen: [null, [Validators.required]]
    })
  }

  inicializarFormulario(producto: IProductoModel) {
    this.formProducto.reset({
      nombre: producto.nombre,
      codigo: producto.codigo,
      imagen: producto.imagen
    })
  }

  async registrarProducto() {
    try {
      let model: IRegisterProducto = {
        nombre: this.formProducto.get('nombre').value,
        codigo: this.formProducto.get('codigo').value,
        imagen: this.formProducto.get('imagen').value

      }
      let data: any;
      if (this.isRegistrar) {
        data = await this._productoService.registrarProducto(model);
      }
      else {
        data = await this._productoService.updateProducto(model, this.producto.idProducto);
      }
      // this.ref.close();
    }
    catch (error) {
      console.log('ERROR: ', error);
    }
  }

}
