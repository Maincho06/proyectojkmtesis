import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Identifier } from '@models/identifiermodel';
import { IProyectoModel, UpdateProyecto } from '@models/proyectomodel';
import { ProyectoService } from '@services/proyecto.service';
import { toast } from '@utils/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-datos-proyecto',
  templateUrl: './datos-proyecto.component.html',
  styleUrls: ['./datos-proyecto.component.scss']
})
export class DatosProyectoComponent implements OnInit {


  formDatos: FormGroup;

  idProyecto: number;

  proyecto: IProyectoModel;
  estados: Identifier[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _messageService: MessageService,
    private _proyectoService: ProyectoService,
    private _route: Router,
  ) {
    this.inicializarForm();
  }

  async ngOnInit(): Promise<void> {
    await this.listarEstados();

    this._activatedRoute.paramMap.subscribe(params => {
      this.idProyecto = Number(params.get('id'));
      if (this.idProyecto) {
        this.listarProyectoById(this.idProyecto);
      } else {
        this.formDatos.controls.precio.disable()
      }
    })
  }

  async listarProyectoById(idProyecto: number) {
    try {
      let data = await this._proyectoService.getProyectoById(idProyecto);
      this.proyecto = data;
      this.llenarForm(this.proyecto);
    } catch (error) {
      console.error(error);
    }
  }


  async listarEstados() {
    try {
      let data = await this._proyectoService.getEstadosProyectos();
      this.estados = data;
    } catch (error) {
      console.error(error);
      this.estados = [];
    }
  }

  llenarForm(proyecto: IProyectoModel) {


    this.formDatos.patchValue({
      estado: this.estados.find(item => item.id == proyecto.estado.id),
      nombreProyecto: proyecto.nombreProyecto,
      cliente: proyecto.razonSocial,
      fechaInicio: proyecto.fechaInicio,
      fechaFin: proyecto.fechaFin,
      precio: proyecto.precio,
      descripcion: proyecto.descripcion
    })
  }

  inicializarForm() {
    this.formDatos = this.formBuilder.group({
      estado: [null, Validators.required],
      nombreProyecto: ['', Validators.required],
      cliente: [''],
      fechaInicio: [''],
      fechaFin: [''],
      precio: [0, Validators.required],
      descripcion: ['', Validators.required]
    })
  }

  guardarProyecto() {
    if (this.idProyecto) {
      this.actualizarCotizacion()
    }
  }

  async actualizarCotizacion() {
    if (this.formDatos.invalid) {
      // Mostrar el snackbar
      toast({
        title: "Advertencia",
        message: 'Revise los campos ingresados',
        type: 'warn',
        messageService: this._messageService
      });
      return;
    }

    let form = this.formDatos.value;
    let proyecto: UpdateProyecto = {
      IdProyecto: this.idProyecto,
      NombreProyecto: form.nombreProyecto,
      FechaInicio: null,
      FechaFin: null,
      Descripcion: form.descripcion,
      IdEstado: form.estado.id,
      Precio: 1
    }


    try {
      let data = await this._proyectoService.updateProyecto(proyecto);
      toast({
        title: "Correcto",
        message: 'Se actualizó correctamente',
        type: 'success',
        messageService: this._messageService
      });

    } catch (error) {
      console.error(error);
    }
  }
}
