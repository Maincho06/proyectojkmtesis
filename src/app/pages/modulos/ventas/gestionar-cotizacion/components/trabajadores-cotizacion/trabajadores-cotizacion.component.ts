import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IRegisterTrabajadorCotizacion } from '@models/cotizacionmodel';
import { ITipoTrabajador } from '@models/trabajadormodel';
import { CotizacionService } from '@services/cotizacion.service';
import { TrabajadorService } from '@services/trabajador.service';
import { toast } from '@utils/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-trabajadores-cotizacion',
  templateUrl: './trabajadores-cotizacion.component.html',
  styleUrls: ['./trabajadores-cotizacion.component.scss'],
  providers: [ConfirmationService]
})
export class TrabajadoresCotizacionComponent implements OnInit {

  idCotizacion: number;

  formRol: FormGroup;

  mostrarModal = false;

  tipoTrabajadores: ITipoTrabajador[] = [];
  trabajadores: any[] = [];

  cols: any[];

  modificando = false;

  constructor(
    private formBuilder: FormBuilder,
    private _trabajadorService: TrabajadorService,
    private _messageService: MessageService,
    private _cotizacionService: CotizacionService,
    private _confirmationService: ConfirmationService,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.inicializarForm();
  }

  async ngOnInit() {
    await this.listarTipoTrabajadores();

    this._activatedRoute.paramMap.subscribe(params => {
      this.idCotizacion = Number(params.get('id'));
    })
  }

  async listarTipoTrabajadores() {
    try {
      let data = await this._trabajadorService.getTipoTrabajador();
      this.tipoTrabajadores = data;
    } catch (error) {
      console.error(error);
      this.tipoTrabajadores = [];
    }
  }

  inicializarForm() {
    this.formRol = this.formBuilder.group({
      rol: [null, Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      precio: ['', [Validators.required, Validators.min(0)]]
    })
  }

  guardarTipoTrabajador() {
    if (this.modificando) {

    } else {
      this.registrarTipoTrabajador();
    }
  }

  async registrarTipoTrabajador() {
    if (this.formRol.invalid) {
      // Mostrar el snackbar
      toast({
        title: "Advertencia",
        message: 'Revise los campos ingresados',
        type: 'warn',
        messageService: this._messageService
      });
      return;
    }

    let form = this.formRol.value;
    let tipoTrabajador: IRegisterTrabajadorCotizacion = {
      IdCotizacion: this.idCotizacion,
      IdTipoTrabajador: form.rol.id,
      Cantidad: form.cantidad,
      Precio: form.precio
    }

    try {
      let data = await this._cotizacionService.registerTipoTrabajadorCotizacion(tipoTrabajador);
      toast({
        title: "Correcto",
        message: 'Se registró correctamente',
        type: 'success',
        messageService: this._messageService
      });

    } catch (error) {
      console.error(error);
    }
  }
}
