import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAlmaceModel, IRegisterAlmacen } from '@models/almacenmodel';
import { AlmacenService } from '@services/almacen.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ObvsService } from '@services/obvs.service';
import { toast } from '@utils/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-detalle-almacen',
  templateUrl: './detalle-almacen.component.html',
  styleUrls: ['./detalle-almacen.component.scss']
})
export class DetalleAlmacenComponent implements OnInit {

  formAlmacen: FormGroup;
  isRegistrar: boolean;
  almacen: IAlmaceModel;

  constructor(private _fb: FormBuilder, 
        private _almacenService: AlmacenService,
        private _ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private _obvsService: ObvsService,
        private _messageService: MessageService) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.isRegistrar = this.config.data.isRegistrar;
    console.log('DATA: ', this.config.data);

    if(!this.isRegistrar) {
      this.almacen = this.config.data.data;
      this.inicializarFormulario(this.almacen);
    }
  }

  crearFormulario() {
    this.formAlmacen = this._fb.group({
      'idAlmacen': [],
      'nombre': [, [Validators.required] ],
      'direccion': [ , [Validators.required]],
      'distrito': [, [Validators.required]]
    });
  }

  inicializarFormulario(almacen: IAlmaceModel) {
    this.formAlmacen.reset({
      idAlmacen: almacen.idAlmacen,
      nombre: almacen.nombre,
      direccion: almacen.direccion,
      distrito: almacen.distrito,
    });
  }

  async registrarOrUpdateAlmacen() {
    
    if (this.formAlmacen.invalid) {
      return Object.values(this.formAlmacen.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }
    try {
      this._obvsService.toogleSpinner();
      let model: IAlmaceModel =  {
        nombre   : this.formAlmacen.get('nombre').value,
        direccion: this.formAlmacen.get('direccion').value,
        distrito: this.formAlmacen.get('distrito').value,
      };
      let data: any;
      if(this.isRegistrar)  {// Registro
        data = await this._almacenService.registerAlmacen(model);
      } else  { // Actualizao
        model.idAlmacen = Number.parseInt(this.formAlmacen.get('idAlmacen').value);
        data = await this._almacenService.updateAlmacen(model);
      }
      toast({
        title: "data.message",
        message: '',
        type: "success",
        messageService: this._messageService
      });
    } catch (error) {
      console.log('ERROR: ', error);
    } finally {
      // this._ref.close();
      // this._obvsService.toogleSpinner();
    }
  }

  // Get

  get validarNombreAlmacen() {
    return this.formAlmacen.get('nombre').invalid && this.formAlmacen.get('nombre').dirty;
  }

  get validarDireccionAlmacen() {
    return this.formAlmacen.get('direccion').invalid && this.formAlmacen.get('direccion').dirty;
  }

  get validarDistritoAlmacen() {
    return this.formAlmacen.get('distrito').invalid && this.formAlmacen.get('distrito').dirty;
  }


}
