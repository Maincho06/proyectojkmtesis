import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IActividadCotizancionTreeNode, IActividadCotizacionModel } from '@models/cotizacionmodel';
import { Identifier } from '@models/identifiermodel';
import { ActividadProyectoModel, ActividadProyectoTreeNode, UpdateActividadByProyecto } from '@models/proyectomodel';
import { ProyectoService } from '@services/proyecto.service';
import { toast } from '@utils/toast';
import { TreeNode, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-actividad-proyecto',
  templateUrl: './actividad-proyecto.component.html',
  styleUrls: ['./actividad-proyecto.component.scss']
})
export class ActividadProyectoComponent implements OnInit {

  porcentajeTareas = 0;
  actividades: TreeNode<ActividadProyectoTreeNode>[] = [];

  mostrarModal = false;

  formActividad: FormGroup;
  prioridades = [
    { valor: 1, descripcion: 'Baja' },
    { valor: 2, descripcion: 'Media' },
    { valor: 3, descripcion: 'Alta' },
  ]

  estados: Identifier[] = [
    { id: 1, descripcion: 'Pendiente' },
    { id: 2, descripcion: 'En Proceso' },
    { id: 3, descripcion: 'Finalizado' }
  ]

  idProyecto: number;

  modificando = false;

  constructor(
    private formBuilder: FormBuilder,
    private _proyectoService: ProyectoService,
    private _confirmationService: ConfirmationService,
    private _activatedRoute: ActivatedRoute,
    private _messageService: MessageService,
  ) {
    this.inicializarForm();
  }


  ngOnInit() {

    this._activatedRoute.paramMap.subscribe(async params => {
      this.idProyecto = Number(params.get('id'));
      await this.listarActividadesPorProyectoId(this.idProyecto);
    })
  }

  inicializarForm() {
    this.formActividad = this.formBuilder.group({
      descripcion: ['', Validators.required],
      prioridad: [null, Validators.required],
      idPadre: [null],
      idActividad: [null],
      estado: [null, Validators.required],
      fechaInicio: [null],
      fechaFin: [null]
    })
  }

  modificar(actividad: ActividadProyectoModel) {

    this.formActividad.patchValue({
      prioridad: this.prioridades.find(item => item.valor == actividad.peso),
      descripcion: actividad.descripcion,
      idPadre: actividad.idPadre,
      idActividad: actividad.idActividad,
      estado: this.estados.find(item => item.id == actividad.estado.id),
      fechaInicio: actividad.fechaInicio == null ? null : new Date(actividad.fechaInicio),
      fechaFin: actividad.fechaFin == null ? null : new Date(actividad.fechaFin)
    })

    this.mostrarModal = true;
    this.modificando = true;
  }

  guardarTipoTrabajador() {
    if (this.modificando) {
      this.actualizarActividadCotizacion();
    }
  }

  async listarActividadesPorProyectoId(idProyecto: number) {
    try {
      let data = await this._proyectoService.getActividadesByIdProyectos(idProyecto);
      this.actividades = data ?? [];
      this.setPorcentajeTareas();
    } catch (error) {
      console.error(error);
      this.actividades = [];
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
    let actividad: UpdateActividadByProyecto = {
      IdProyecto: this.idProyecto,
      Descripcion: form.descripcion,
      Peso: form.prioridad.valor,
      IdPadre: form.idPadre,
      IdHermano: null,
      IdActividad: form.idActividad,
      FechaInicio: form.fechaInicio,
      FechaFin: form.fechaFin,
      IdEstado: form.estado.id
    }

    try {
      let data = await this._proyectoService.updateActividadByProyecto(actividad);
      toast({
        title: "Correcto",
        message: 'Se actualizó correctamente',
        type: 'success',
        messageService: this._messageService
      });

      await this.listarActividadesPorProyectoId(this.idProyecto);

    } catch (error) {
      console.error(error);
    }

  }

  setPorcentajeTareas() {
    let pesoTotal = 0;
    let pesoActividadesFinalizadas = 0;
    this.actividades.forEach(item => {

      let actividadActual = item.data;


      pesoTotal += actividadActual['peso'];
      pesoActividadesFinalizadas += actividadActual['estado'].id == 3 ? actividadActual['peso'] : 0;

      item['children'].forEach(itemChild => {
        pesoTotal += itemChild.data['peso'];
        if (itemChild.data['estado'].id == 3) {
          pesoActividadesFinalizadas += itemChild.data['peso'];
        }
      })
    })


    this.porcentajeTareas = Math.round((pesoActividadesFinalizadas / pesoTotal) * 100)
  }
}
