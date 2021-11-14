import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IClienteModel } from '@models/clientemodel';
import { ICotizacionModel, IRegisterCotizacion, IUpdateCotizacion } from '@models/cotizacionmodel';
import { Identifier } from '@models/identifiermodel';
import { ClienteService } from '@services/cliente.service';
import { CotizacionService } from '@services/cotizacion.service';
import { toast } from '@utils/toast';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-datos-cotizacion',
  templateUrl: './datos-cotizacion.component.html',
  styleUrls: ['./datos-cotizacion.component.scss']
})
export class DatosCotizacionComponent implements OnInit {

  formDatos: FormGroup;
  cliente: IClienteModel[] = [];

  idCotizacion: number;

  cotizacion: ICotizacionModel;
  tipos: Identifier[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private _clienteService: ClienteService,
    private _activatedRoute: ActivatedRoute,
    private _messageService: MessageService,
    private _cotizacionService: CotizacionService,
    private _route: Router,
  ) {
    this.inicializarForm();
  }

  async ngOnInit(): Promise<void> {
    await this.listarCliente();
    await this.listarTipos();

    this._activatedRoute.paramMap.subscribe(params => {
      this.idCotizacion = Number(params.get('id'));
      if (this.idCotizacion) {
        this.listarCotizacionId(this.idCotizacion);
      } else {
        this.formDatos.controls.precio.disable()
      }
    })
  }

  async listarCotizacionId(idCotizacion: number) {
    try {
      let data = await this._cotizacionService.getCotizacionById(idCotizacion);
      this.cotizacion = data;
      this.llenarForm(this.cotizacion);
    } catch (error) {
      console.error(error);
      this.cliente = [];
    }
  }

  async listarCliente() {
    try {
      let data = await this._clienteService.getClientes();
      this.cliente = data;
    } catch (error) {
      console.error(error);
      this.cliente = [];
    }
  }

  async listarTipos() {
    try {
      let data = await this._cotizacionService.getTiposCotizacion();
      this.tipos = data;
    } catch (error) {
      console.error(error);
      this.cliente = [];
    }
  }

  llenarForm(cotizacion: ICotizacionModel) {

    let fecha = moment(cotizacion.fechaSolicitudString, 'YYYY-MM-DD');
    
    this.formDatos.patchValue({
      tipoCotizacion: this.tipos.find(item => item.id == cotizacion.tipoCotizacion.id),
      solicitante: cotizacion.solicitante,
      fechaSolicitud: fecha.toDate(),
      empresa: this.cliente?.find(item => item.idCliente == cotizacion.idCliente),
      estado: cotizacion.estado.descripcion,
      correo: cotizacion.email,
      precio: cotizacion.precioCotizacion,
      descripcion: cotizacion.descripcion
    })
  }

  inicializarForm() {
    this.formDatos = this.formBuilder.group({
      tipoCotizacion: [null, Validators.required],
      solicitante: ['', Validators.required],
      empresa: ['', Validators.required],
      fechaSolicitud: ['', Validators.required],
      estado: ['Pendiente'],
      correo: ['', [Validators.required, Validators.email]],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
  }

  guardarCotizacion() {
    if (this.idCotizacion) {
      this.actualizarCotizacion()
    } else {
      this.registrarCotizacion()
    }
  }

  async registrarCotizacion() {
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
    let cotizacion: IRegisterCotizacion = {
      Solicitante: form.solicitante,
      Descripcion: form.descripcion,
      FechaSolicitud: form.fechaSolicitud,
      Email: form.correo,
      IdCliente: form.empresa.idCliente,
      PrecioCotizacion: form.precio,
      IdTipoCotizacion: form.tipoCotizacion.id
    }

    try {
      let data = await this._cotizacionService.registerCotizacion(cotizacion);
      toast({
        title: "Correcto",
        message: 'Se registró correctamente',
        type: 'success',
        messageService: this._messageService
      });

      this._route.navigate(['/ventas', 'gestionarCotizacion', data.data])

    } catch (error) {
      console.error(error);
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
    let cotizacion: IUpdateCotizacion = {
      Solicitante: form.solicitante,
      Descripcion: form.descripcion,
      FechaSolicitud: form.fechaSolicitud,
      Email: form.correo,
      IdCliente: form.empresa.idCliente,
      PrecioCotizacion: form.precio,
      IdCotizacion: this.idCotizacion,
      IdTipoCotizacion: form.tipoCotizacion.id
    }


    try {
      let data = await this._cotizacionService.updateCotizacion(cotizacion);
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
