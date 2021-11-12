import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IRegisterTrabajadorCotizacion, ITipoTrabajadorModel, IUpdateTrabajadorCotizacion } from '@models/cotizacionmodel';
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
  trabajadores: ITipoTrabajadorModel[] = [];

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

    this._activatedRoute.paramMap.subscribe(async params => {
      this.idCotizacion = Number(params.get('id'));
      await this.listarTrabajadoresPorCotizacionId(this.idCotizacion);
    })
  }


  async listarTrabajadoresPorCotizacionId(idCotizacion: number) {
    try {
      let data = await this._cotizacionService.getTrabajadoresByCotizacion(idCotizacion);
      this.trabajadores = data ?? [];
    } catch (error) {
      console.error(error);
      this.trabajadores = [];
    }
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

  nuevo() {
    this.mostrarModal = true;
    this.modificando = false;
    this.formRol.reset();
    this.formRol.controls.rol.enable();
  }

  modificar(trabajador: ITipoTrabajadorModel) {
    this.mostrarModal = true;
    this.modificando = true;

    this.formRol.patchValue({
      rol: this.tipoTrabajadores.find(item => item.id == trabajador.idTipoTrabajador),
      cantidad: trabajador.cantidad,
      precio: trabajador.precio
    })

    this.formRol.controls.rol.disable();
  }

  guardarTipoTrabajador() {
    if (this.modificando) {
      this.actualizarTipoTrabajador();
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

      this.formRol.reset();
      await this.listarTrabajadoresPorCotizacionId(this.idCotizacion);

    } catch (error) {
      console.error(error);
    }
  }

  async actualizarTipoTrabajador() {
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

    let form = this.formRol.getRawValue();
    let tipoTrabajador: IUpdateTrabajadorCotizacion = {
      IdCotizacion: this.idCotizacion,
      IdTipoTrabajador: form.rol.id,
      Cantidad: form.cantidad,
      Precio: form.precio
    }

    try {
      let data = await this._cotizacionService.updateTipoTrabajadorCotizacion(tipoTrabajador);
      toast({
        title: "Correcto",
        message: 'Se actualizó correctamente',
        type: 'success',
        messageService: this._messageService
      });

      await this.listarTrabajadoresPorCotizacionId(this.idCotizacion);

    } catch (error) {
      console.error(error);
    }
  }

  deleteTipoTrabajador(tipo: ITipoTrabajadorModel) {
    this._confirmationService.confirm({
      message: '¿Desea eliminar el tipo de trabajador?',
      accept: async () => {
        try {
          await this._cotizacionService.deleteTipoTrabajadorCotizacion(this.idCotizacion, tipo.idTipoTrabajador);

          toast({
            title: "Correcto",
            message: 'Se eliminó correctamente',
            type: 'success',
            messageService: this._messageService
          });

          await this.listarTrabajadoresPorCotizacionId(this.idCotizacion);

        } catch (err) {
          console.error(err);
        }
      }
    });
  }

  get precioReferencial() {
    return 'Precio Referencial: ' + (this.formRol?.controls?.rol?.value?.precioReferencial ?? 0)

  }
}
