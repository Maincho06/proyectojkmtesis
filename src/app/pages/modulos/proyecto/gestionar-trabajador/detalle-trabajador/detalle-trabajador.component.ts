import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEstadoTrabajador, IRequestRegisterTrabajador, ITipoTrabajador, ITrabajadorModel } from '@models/trabajadormodel';
import { TrabajadorService } from '@services/trabajador.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import * as moment from 'moment';
import { toast } from '@utils/toast';
import { MessageService } from 'primeng/api';
import { validarFormularioJKM } from '@utils/form';

@Component({
  selector: 'app-detalle-trabajador',
  templateUrl: './detalle-trabajador.component.html',
  styleUrls: ['./detalle-trabajador.component.scss']
})
export class DetalleTrabajadorComponent implements OnInit {

  formTrabajador: FormGroup;
  isRegistrar: boolean;
  trabajador: ITrabajadorModel;
  listTipoTrabajador: ITipoTrabajador[];
  listaEstadoTrabajador: IEstadoTrabajador[];
  constructor(
    private formBuilder: FormBuilder,
    private _trabajadorService: TrabajadorService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _messageService:  MessageService,
  ) { }

  async ngOnInit() {
    this.isRegistrar = this.config.data.isRegistrar;
    this.crearFormTrabajador();
    this.obtenerEstadoTrabajador();
    this.obtenerTipoTrabajador();

    if(!this.isRegistrar) {
      this.trabajador = this.config.data.data;
      this.inicializarFormulario(this.trabajador);
    }
    
  }

  crearFormTrabajador() {
    this.formTrabajador = this.formBuilder.group({
      nombre         : [null, [Validators.required]],
      apellidoMaterno: [null, [Validators.required]],
      apellidoPaterno: [null, [Validators.required]],
      fechaNacimiento: [null, [Validators.required]],
      tipo           : [null, [Validators.required]],
      estado         : [null, [Validators.required]]
    })
  }

  inicializarFormulario(trabajador: ITrabajadorModel) {
    this.formTrabajador.reset({
      nombre         : trabajador.nombre,
      apellidoMaterno: trabajador.apellidoMaterno,
      apellidoPaterno: trabajador.apellidoPaterno,
      fechaNacimiento: moment(trabajador.fechaNacimiento).format('DD  /MM/yyyy'),
      tipo           : trabajador.tipo,
      estado         : trabajador.estado
    })
  }

  async obtenerTipoTrabajador() {
    try {
      this.listTipoTrabajador = await this._trabajadorService.obtenerTipoTrabajador();
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }

  async obtenerEstadoTrabajador() {
    try {
      this.listaEstadoTrabajador = await this._trabajadorService.obtenerEstadoTrabajador();
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }

  async registrarTrabajador() {
    if (this.formTrabajador.invalid) {
      return Object.values(this.formTrabajador.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }
    try {
      let model: IRequestRegisterTrabajador = {
        nombre         : this.formTrabajador.get('nombre').value,
        apellidoPaterno: this.formTrabajador.get('apellidoPaterno').value,
        apellidoMaterno: this.formTrabajador.get('apellidoMaterno').value,
        fechaNacimiento: this.formTrabajador.get('fechaNacimiento').value,
        idTipo         : Number.parseInt(this.formTrabajador.get('tipo').value.id)
      };
      let data: any;
      model.fechaNacimiento = moment(model.fechaNacimiento,'DD/MM/yyyy').format('yyyy-MM-DD');
      if(this.isRegistrar){
        data = await this._trabajadorService.registrarTrabajador(model);
      } else {
        model.idEstado = Number.parseInt(this.formTrabajador.get('estado').value.id);
        data = await this._trabajadorService.updateTrabajador(model, this.trabajador.idTrabajador);
      }
      this.ref.close();
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }


  // Get Validacioens

  get validarNombre() {
    return this.formTrabajador.get('nombre').invalid && this.formTrabajador.get('nombre').touched;
  }
  get validarApellidoMaterno() {
    return this.formTrabajador.get('apellidoMaterno').invalid && this.formTrabajador.get('apellidoMaterno').touched;
  }
  get validarApellidoPaterno() {
    return this.formTrabajador.get('apellidoPaterno').invalid && this.formTrabajador.get('apellidoPaterno').touched;
  }
  get validarFechaNacimiento() {
    return this.formTrabajador.get('fechaNacimiento').invalid && this.formTrabajador.get('fechaNacimiento').touched;
  }
  get validarTipo() {
    return this.formTrabajador.get('tipo').invalid && this.formTrabajador.get('tipo').touched;
  }
  get validarEstado() {
    return this.formTrabajador.get('estado').invalid && this.formTrabajador.get('estado').touched;
  }


}
