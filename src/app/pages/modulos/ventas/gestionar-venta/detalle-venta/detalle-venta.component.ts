import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IRegisterVentaCuotas, ITipoVenta, IVentaCuotasModel, IVentaModel } from '@models/ventamodel';
import { VentasService } from '@services/ventas.service';
import { toast } from '@utils/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.scss'],
  providers: [ConfirmationService]
})

export class DetalleVentaComponent implements OnInit {

  formVentas: FormGroup
  formCuotas: FormGroup

  listaCuotas: IVentaCuotasModel[]
  cuotaDialog: boolean
  idVenta: number

  constructor(
    private formBuilder: FormBuilder,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService,
    private _ventasService: VentasService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.idVenta = + params.id
    })
  }

  ngOnInit(): void {

    this.crearFormVentas()
    this.crearFormCuotas()

    this.listarDetalleVentaxID(this.idVenta)
    this.listarCuotas(this.idVenta)
  }

  crearFormVentas() {
    this.formVentas = this.formBuilder.group({
      ruc: [null, [Validators.required]],
      razonSocial: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      precio: [null, [Validators.required]],
      tipoVenta: [null, [Validators.required]],
    })
  }

  crearFormCuotas() {
    this.formCuotas = this.formBuilder.group({
      precioCuota: [null, [Validators.required]],
      fechaCuota: [null, [Validators.required]]
    })
  }

  async listarDetalleVentaxID(idVenta: number) {

    try {
      const data: any = await this._ventasService.getVentaxID(idVenta).toPromise();

      this.formVentas.patchValue(data)
      this.formVentas.controls['tipoVenta'].setValue(data.tipo.descripcion)
    }
    catch (error) {
      console.log("Error: ", error);
    }
  }

  async listarCuotas(idVenta: number) {

    try {
      const data: any = await this._ventasService.getCuotasxVenta(idVenta).toPromise()
      this.listaCuotas = data.data

    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async registrarCuota() {

    // Validacion Formulario
    if (this.formCuotas.invalid) {
      toast({
        title: 'Advertencia',
        message: 'Revise los campos ingresados',
        type: 'warn',
        messageService: this._messageService
      })
      return
    }

    let form = this.formCuotas.value

    let venta: IRegisterVentaCuotas = {
      idVenta: this.idVenta,
      numeroCuota: null,
      pagoParcial: form.precioCuota,
      fechaCuota: form.fechaCuota
    }

    try {

      let data = await this._ventasService.registerCuotasxVenta(venta)
      console.log(data)

      toast({
        title: 'Correcto',
        message: 'Se registró correctamente',
        type: 'success',
        messageService: this._messageService
      })

    } catch (error) {
      console.error(error)
    }
  }

  // Detalle Cuota
  abrirDialog() {
    this.cuotaDialog = true;
  }

  cerrarDialog() {
    this.cuotaDialog = false;
  }

}
