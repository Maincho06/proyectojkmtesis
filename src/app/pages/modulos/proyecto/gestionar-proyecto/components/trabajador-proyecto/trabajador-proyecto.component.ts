import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ITipoTrabajadorModel, IRegisterTrabajadorCotizacion, IUpdateTrabajadorCotizacion } from '@models/cotizacionmodel';
import { RegisterTrabajadorByProyecto, TrabajadorProyectoModel } from '@models/proyectomodel';
import { IApiResponseModelGet } from '@models/responsemodel';
import { ITipoTrabajador, ITrabajadorModel } from '@models/trabajadormodel';
import { CotizacionService } from '@services/cotizacion.service';
import { ProyectoService } from '@services/proyecto.service';
import { TrabajadorService } from '@services/trabajador.service';
import { toast } from '@utils/toast';
import { MessageService, ConfirmationService } from 'primeng/api';

export interface ITrabajadorSelect {
  id: number;
  descripcion: string;
  idTipo: number;
}

export interface ITipoTrabajadorTable extends ITipoTrabajadorModel {
  countTrabajadores: number;
}
@Component({
  selector: 'app-trabajador-proyecto',
  templateUrl: './trabajador-proyecto.component.html',
  styleUrls: ['./trabajador-proyecto.component.scss']
})
export class TrabajadorProyectoComponent implements OnInit {

  idProyecto: number;

  formTrabajador: FormGroup;

  mostrarModal = false;
  mostrarModalRol = false;
  trabajadores: ITrabajadorSelect[] = [];
  trabajadoresFiltrado: ITrabajadorSelect[] = [];
  trabajadoresProyecto: TrabajadorProyectoModel[] = [];
  tipoTrabajadoresProyecto: ITipoTrabajadorTable[] = [];
  tipoTrabajadores: ITipoTrabajador[] = [];
  modificando = false;

  faltaTrabajador = false;

  constructor(
    private formBuilder: FormBuilder,
    private _trabajadorService: TrabajadorService,
    private _messageService: MessageService,
    private _cotizacionService: CotizacionService,
    private _confirmationService: ConfirmationService,
    private _activatedRoute: ActivatedRoute,
    private _proyectoService: ProyectoService,

  ) {
    this.inicializarForm();
  }

  async ngOnInit() {
    await this.listarTrabajadores();
    await this.listarTipoTrabajadores();

    this._activatedRoute.paramMap.subscribe(async params => {
      this.idProyecto = Number(params.get('id'));
      await this.listarTrabajadoresPorProyectoId(this.idProyecto);
      await this.listarProyectoById(this.idProyecto);
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

  async listarProyectoById(idProyecto: number) {
    try {
      let data = await this._proyectoService.getProyectoById(idProyecto);
      this.listartipoTrabajadoresProyectoPorCotizacionId(data.idCotizacion);
    } catch (error) {
      console.error(error);
    }
  }


  async listarTrabajadoresPorProyectoId(idProyecto: number) {
    try {
      let data = await this._proyectoService.getTrabajadoresByProyecto(idProyecto);
      this.trabajadoresProyecto = data ?? [];
    } catch (error) {
      console.error(error);
      this.trabajadores = [];
    }
  }

  async listarTrabajadores() {
    try {
      const data = await this._trabajadorService
        .getTrabajadorDisponible().toPromise();

      this.trabajadores = this.mapTrabajadores(data ?? []);

    } catch (error) {
      console.error(error);
    }
  }

  async listartipoTrabajadoresProyectoPorCotizacionId(idCotizacion: number) {
    try {
      let data = await this._cotizacionService.getTrabajadoresByCotizacion(idCotizacion);
      this.tipoTrabajadoresProyecto = (data ?? []).map(item => {
        return {
          ...item,
          countTrabajadores: 0
        }
      });
      this.contarTrabajadores();
    } catch (error) {
      console.error(error);
      this.trabajadores = [];
    }
  }

  inicializarForm() {
    this.formTrabajador = this.formBuilder.group({
      trabajador: [null, Validators.required],
      tipo: [null, Validators.required],
    })
  }

  nuevo() {
    this.mostrarModal = true;
    this.formTrabajador.reset();
  }

  mapTrabajadores(trabajadores: ITrabajadorModel[]) {
    return trabajadores.map(item => {
      return {
        id: item.idTrabajador,
        descripcion: item.nombre + ' ' + item.apellidoPaterno,
        idTipo: item.tipo.id
      }
    })
  }

  async guardarTrabajador() {
    if (this.formTrabajador.invalid) {
      // Mostrar el snackbar
      toast({
        title: "Advertencia",
        message: 'Revise los campos ingresados',
        type: 'warn',
        messageService: this._messageService
      });
      return;
    }

    let form = this.formTrabajador.value;
    let trabajador: RegisterTrabajadorByProyecto = {
      IdProyecto: this.idProyecto,
      IdTrabajador: form.trabajador.id
    }

    try {
      let data = await this._proyectoService.registerTrabajadorProyecto(trabajador);
      toast({
        title: "Correcto",
        message: 'Se registró correctamente',
        type: 'success',
        messageService: this._messageService
      });

      this.formTrabajador.reset();
      await this.listarTrabajadoresPorProyectoId(this.idProyecto);
      await this.listarTrabajadores();
      this.contarTrabajadores();

    } catch (error) {
      console.error(error);
    }
  }

  filtrarTrabajadores(valor: ITipoTrabajador) {

    this.formTrabajador.controls.trabajador.setValue(null);

    this.trabajadoresFiltrado = this.trabajadores.filter(item => item.idTipo == valor.id);
  }

  deleteTrabajador(trabajador: TrabajadorProyectoModel) {
    this._confirmationService.confirm({
      message: '¿Desea eliminar el trabajador?',
      header: 'Alerta',
      acceptLabel: "Si",
      rejectLabel: "No",
      accept: async () => {
        try {
          await this._proyectoService.deleteTrabajadoresByProyecto(this.idProyecto, trabajador.idTrabajador);

          toast({
            title: "Correcto",
            message: 'Se eliminó correctamente',
            type: 'success',
            messageService: this._messageService
          });

          await this.listarTrabajadoresPorProyectoId(this.idProyecto);
          await this.listarTrabajadores();
          this.contarTrabajadores();

        } catch (err) {
          console.error(err);
        }
      }
    });
  }

  contarTrabajadores() {

    this.faltaTrabajador = false;

    for (let tipoTrabajador of this.tipoTrabajadoresProyecto) {
      tipoTrabajador.countTrabajadores = 0;
    }

    for (let tipoTrabajador of this.tipoTrabajadoresProyecto) {

      for (let trabajador of this.trabajadoresProyecto) {
        if (tipoTrabajador.idTipoTrabajador == trabajador.tipo.id) {
          tipoTrabajador.countTrabajadores++;
        }
      }
    }


    for (let tipoTrabajador of this.tipoTrabajadoresProyecto) {

      if (tipoTrabajador.cantidad > tipoTrabajador.countTrabajadores && !this.faltaTrabajador) {
        this.faltaTrabajador = true;
      }
    }
  }
}
