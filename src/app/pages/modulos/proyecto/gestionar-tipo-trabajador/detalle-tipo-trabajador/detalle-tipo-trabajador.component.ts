import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrabajadorService } from '@services/trabajador.service';
import { toast } from '@utils/toast';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'detalle-tipo-trabajador',
  templateUrl: 'detalle-tipo-trabajador.component.html',
})
export class DetalleTipoTrabajadorComponent implements OnInit {
  formTipoTrabajador: FormGroup;
  idTipo: number = 0;

  constructor(
    private _trabajadorService: TrabajadorService,
    public _config: DynamicDialogConfig,
    private _messageService: MessageService
  ) {
    this.idTipo = _config.data || 0;
  }

  async ngOnInit() {
    await this._initForm();
  }

  async _initForm() {
    this.formTipoTrabajador = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required]),
      precioReferencial: new FormControl(null, [
        Validators.required,
        Validators.min(0),
      ]),
    });
    if (this.idTipo > 0) {
      const tipoTrbajdor =
        await this._trabajadorService.obtenerTipoTrabajadorById(this.idTipo);
      this.formTipoTrabajador.patchValue(tipoTrbajdor);
    }
  }

  async registerTipo() {
    try {
      const tipoTrbajdor = this.formTipoTrabajador.value;
      let response;
      if (this.idTipo > 0) {
        const data = { ...tipoTrbajdor, id: this.idTipo };
        response = await this._trabajadorService.updateTipoTrabajador(data);
      } else {
        response = await this._trabajadorService.registrarTipoTrabajador(
          tipoTrbajdor
        );
      }
      if (response) {
        toast({
          title: response.message,
          message: '',
          type: 'success',
          messageService: this._messageService,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  get validarNombre() {
    return this.formTipoTrabajador.get('nombre').invalid && this.formTipoTrabajador.get('nombre').dirty;
  }
  get validarDescripcion() {
    return this.formTipoTrabajador.get('descripcion').invalid && this.formTipoTrabajador.get('descripcion').dirty;
  }
  get validarPrecio() {
    return this.formTipoTrabajador.get('precioReferencial').invalid && this.formTipoTrabajador.get('precioReferencial').dirty;
  }
}
