import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IActividadCotizacionModel, IActividadCotizancionTreeNode, IRegisterActividadCotizacion, IUpdateActividadCotizacion } from '@models/cotizacionmodel';
import { CotizacionService } from '@services/cotizacion.service';
import { toast } from '@utils/toast';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';

@Component({
  selector: 'app-actividades-cotizacion',
  templateUrl: './actividades-cotizacion.component.html',
  styleUrls: ['./actividades-cotizacion.component.scss'],
  providers: [ConfirmationService]
})
export class ActividadesCotizacionComponent implements OnInit {
  actividades: TreeNode<IActividadCotizancionTreeNode>[] = [];
  cols: { field: string, header: string }[];

  mostrarModal = false;

  formActividad: FormGroup;
  prioridades = [
    { valor: 1, descripcion: 'Baja' },
    { valor: 2, descripcion: 'Media' },
    { valor: 3, descripcion: 'Alta' },
  ]

  idCotizacion: number;

  modificando = false;

  bloqueado = false;
  constructor(
    private formBuilder: FormBuilder,
    private _cotizacionService: CotizacionService,
    private _confirmationService: ConfirmationService,
    private _activatedRoute: ActivatedRoute,
    private _messageService: MessageService,
  ) {
    this.inicializarForm();
  }

  async ngAfterViewInit() {
    this.cols = [
      { field: 'Descripcion', header: 'Descripción' },
      { field: 'prioridad', header: 'Prioridad' },
    ];

    this._activatedRoute.paramMap.subscribe(async params => {
      this.idCotizacion = Number(params.get('id'));
      await this.listarActividadesPorCotizacionId(this.idCotizacion);
    })
  }
  ngOnInit() {
  }

  inicializarForm() {
    this.formActividad = this.formBuilder.group({
      descripcion: ['', Validators.required],
      prioridad: [null, Validators.required],
      idPadre: [null],
      idActividad: [null]
    })
  }

  nuevo(actividad: IActividadCotizacionModel) {

    this.mostrarModal = true;
    this.modificando = false;
    this.formActividad.reset();

    if (actividad) {
      this.formActividad.controls.idPadre.setValue(actividad.IdActividad);
    }
  }

  modificar(actividad: IActividadCotizacionModel) {

    this.formActividad.patchValue({
      prioridad: this.prioridades.find(item => item.valor == actividad.Peso),
      descripcion: actividad.Descripcion,
      idPadre: actividad.IdPadre,
      idActividad: actividad.IdActividad
    })

    this.mostrarModal = true;
    this.modificando = true;
  }

  guardarTipoTrabajador() {
    if (this.modificando) {
      this.actualizarActividadCotizacion();
    } else {
      this.registrarActividadCotizacion();
    }
  }

  async listarActividadesPorCotizacionId(idCotizacion: number) {
    try {
      let data = await this._cotizacionService.getActividadByCotizacion(idCotizacion);
      this.actividades = data;
    } catch (error) {
      console.error(error);
      this.actividades = [];
    }
  }

  async registrarActividadCotizacion() {
    if (this.formActividad.invalid) {
      // Mostrar el snackbar
      toast({
        title: "Advertencia",
        message: 'Revise los campos ingresados',
        type: 'warn',
        messageService: this._messageService
      });
      return;
    }

    let form = this.formActividad.value;
    let actividad: IRegisterActividadCotizacion = {
      IdCotizacion: this.idCotizacion,
      Descripcion: form.descripcion,
      Peso: form.prioridad.valor,
      IdPadre: form.idPadre,
      IdHermano: null
    }
    try {
      let data = await this._cotizacionService.registerActividadByCotizacion(actividad);
      toast({
        title: "Correcto",
        message: 'Se registró correctamente',
        type: 'success',
        messageService: this._messageService
      });

      this.formActividad.reset();
      await this.listarActividadesPorCotizacionId(this.idCotizacion);

    } catch (error) {
      console.error(error);
    }
  }

  async actualizarActividadCotizacion() {
    if (this.formActividad.invalid) {
      // Mostrar el snackbar
      toast({
        title: "Advertencia",
        message: 'Revise los campos ingresados',
        type: 'warn',
        messageService: this._messageService
      });
      return;
    }

    let form = this.formActividad.value;
    let actividad: IUpdateActividadCotizacion = {
      IdCotizacion: this.idCotizacion,
      Descripcion: form.descripcion,
      Peso: form.prioridad.valor,
      IdPadre: form.idPadre,
      IdHermano: null,
      IdActividad: form.idActividad
    }
    try {
      let data = await this._cotizacionService.updateActividadByCotizacion(actividad);
      toast({
        title: "Correcto",
        message: 'Se registró correctamente',
        type: 'success',
        messageService: this._messageService
      });

      this.formActividad.reset();
      await this.listarActividadesPorCotizacionId(this.idCotizacion);

    } catch (error) {
      console.error(error);
    }

  }

  deleteActividad(actividad: IActividadCotizacionModel) {
    this._confirmationService.confirm({
      message: '¿Desea eliminar la actividad?',
      header: 'Alerta',
      acceptLabel: "Si",
      rejectLabel: "No",
      accept: async () => {
        try {
          await this._cotizacionService.deleteActividadCotizacion(this.idCotizacion, actividad.IdActividad);

          toast({
            title: "Correcto",
            message: 'Se eliminó correctamente',
            type: 'success',
            messageService: this._messageService
          });

          await this.listarActividadesPorCotizacionId(this.idCotizacion);

        } catch (err) {
          console.error(err);
        }
      }
    });
  }
}
