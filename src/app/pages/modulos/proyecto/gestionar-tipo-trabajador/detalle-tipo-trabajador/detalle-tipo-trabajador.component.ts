import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
      nombre: new FormControl(null),
      descripcion: new FormControl(null),
      precioReferencial: new FormControl(null),
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
        response = await this._trabajadorService.registrarTipoTrabajador(tipoTrbajdor);
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
}
