import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ITipoTrabajadorModel, IRegisterTrabajadorCotizacion, IUpdateTrabajadorCotizacion } from '@models/cotizacionmodel';
import { RegisterTrabajadorByProyecto, TrabajadorProyectoModel } from '@models/proyectomodel';
import { IApiResponseModelGet } from '@models/responsemodel';
import { ITrabajadorModel } from '@models/trabajadormodel';
import { CotizacionService } from '@services/cotizacion.service';
import { ProyectoService } from '@services/proyecto.service';
import { TrabajadorService } from '@services/trabajador.service';
import { toast } from '@utils/toast';
import { MessageService, ConfirmationService } from 'primeng/api';

export interface ITrabajadorSelect {
  id: number;
  descripcion: string;
  tipo: string;
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

  trabajadores: ITrabajadorSelect[] = [];
  trabajadoresProyecto: TrabajadorProyectoModel[] = [];
  modificando = false;

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

    this._activatedRoute.paramMap.subscribe(async params => {
      this.idProyecto = Number(params.get('id'));
      await this.listarTrabajadoresPorProyectoId(this.idProyecto);
    })
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

  async listarTrabajadores(pages = 1) {
    try {
      const data: IApiResponseModelGet<ITrabajadorModel> =
        await this._trabajadorService
          .getTrabajadorPaginado({ pages: pages, rows: 100 })
          .toPromise();

      this.trabajadores = this.mapTrabajadores(data?.data ?? []);

    } catch (error) {
      console.error(error);
    }
  }

  inicializarForm() {
    this.formTrabajador = this.formBuilder.group({
      trabajador: [null, Validators.required],
      tipo: [''],
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
        tipo: item.tipo.descripcion
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

    } catch (error) {
      console.error(error);
    }
  }

  asignarTipo(valor:ITrabajadorSelect) {
    this.formTrabajador.controls.tipo.setValue(valor.tipo)
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

        } catch (err) {
          console.error(err);
        }
      }
    });
  }
}
