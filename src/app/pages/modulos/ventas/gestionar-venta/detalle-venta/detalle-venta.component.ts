import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { floatbuttonanimations } from '@components/button-float/button-float.animations';
import { ProyectoModel } from '@models/proyectomodel';
import { IRegisterVentaCuotas, IVentaCuotasModel } from '@models/ventamodel';
import { ObvsService } from '@services/obvs.service';
import { ProyectoService } from '@services/proyecto.service';
import { VentasService } from '@services/ventas.service';
import { toast } from '@utils/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.scss'],
  providers: [ConfirmationService],
  animations: [floatbuttonanimations],
})
export class DetalleVentaComponent implements OnInit {
  // Float Buttons
  tsLista = 'active'; // Inicia la lista oculta
  fbLista = [
    { icon: 'pi-user-plus', tool: 'Registrar Usuario' },
    { icon: 'pi-pencil', tool: 'Registrar Usuario' },
    { icon: 'pi-print', tool: 'Registrar Usuario' },
    { icon: 'pi-sign-out', tool: 'Registrar Usuario' },
  ];
  abLista: any[] = [];

  // Formularios
  formVentas: FormGroup;
  formCuotas: FormGroup;
  formProyectos: FormGroup;
  formPedidos: FormGroup;

  // Variables
  listaCuotas: IVentaCuotasModel[] = [];
  cuotaDialog: boolean;
  idVenta: number;
  precio: boolean = true;
  tipo: string;

  tipoVenta: string;
  segundaCuota: boolean = false;

  lProyecto: ProyectoModel[];

  constructor(
    private formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _ventasService: VentasService,
    private _proyectoService: ProyectoService,
    private route: ActivatedRoute,
    private _obvsService: ObvsService
  ) {
    this.route.params.subscribe((params) => {
      this.idVenta = +params.id;
    });

    this.route.url.subscribe((params) => {
      this.tipo = params[0].path;
    });
  }

  async ngOnInit() {
    this.crearFormVentas();

    this.onToggleFab(1, -1);
    await this.listarDetalleVentaxID(this.idVenta);
    await this.listarCuotas(this.idVenta);
    await this.listarProyectos();

    this.crearFormCuotas();
    this.crearFormProyecto();
    this.crearFormPedidos();
  }

  crearFormVentas() {
    this.formVentas = this.formBuilder.group({
      ruc: [null, [Validators.required]],
      razonSocial: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      precio: [{ value: null, disabled: true }, [Validators.required]],
      tipoVenta: [null, [Validators.required]],
    });
  }

  crearFormCuotas() {
    let precioTotal = this.formVentas.controls.precio.value;

    this.formCuotas = this.formBuilder.group({
      precioCuota: [
        null,
        [
          Validators.required,
          Validators.min(precioTotal),
          Validators.max(precioTotal),
        ],
      ],
      fechaCuota: [null, [Validators.required]],
      pagoCuota: [false],
    });

    this.formCuotas.get('pagoCuota').valueChanges.subscribe((data) => {
      this.tipoCuota(data);
    });
  }

  crearFormProyecto() {
    this.formProyectos = this.formBuilder.group({
      nombre: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
    });
  }

  crearFormPedidos() {
    this.formPedidos = this.formBuilder.group({
      proyecto: [null],
    });
  }

  async listarDetalleVentaxID(idVenta: number) {
    try {
      this._obvsService.toogleSpinner();
      const data: any =
        (await this._ventasService.getVentaxID(idVenta).toPromise()) ?? [];

      this.formVentas.patchValue(data);
      this.formVentas.controls['tipoVenta'].setValue(data.tipo.descripcion);

      this.tipoVenta = data.tipo.descripcion;
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      this._obvsService.toogleSpinner();
    }
  }

  async listarCuotas(idVenta: number) {
    try {
      this._obvsService.toogleSpinner();

      const data: any = await this._ventasService
        .getCuotasxVenta(idVenta)
        .toPromise();
      this.listaCuotas = data?.data || [];
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      this._obvsService.toogleSpinner();
    }
  }

  async listarProyectos() {
    try {
      this._obvsService.toogleSpinner();
      const data: any = await this._proyectoService
        .getProyectosPaginado()
        
      this.lProyecto = data?.data;
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      this._obvsService.toogleSpinner();
    }
  }

  async registrarCuota() {
    // Validacion Formulario Cuotas
    if (this.formCuotas.invalid) {
      toast({
        title: 'Advertencia',
        message: 'Revise los campos ingresados',
        type: 'warn',
        messageService: this._messageService,
      });
      return;
    }

    // Validacion Formulario Proyecto
    if (
      this.formProyectos.invalid &&
      this.tipoVenta == 'Proyecto' &&
      !this.segundaCuota
    ) {
      toast({
        title: 'Advertencia',
        message: 'Revise los campos del Proyecto',
        type: 'warn',
        messageService: this._messageService,
      });
      return;
    }

    // Validacion Formulario Pedido
    if (
      this.formPedidos.invalid &&
      this.tipoVenta == 'Producto' &&
      !this.segundaCuota
    ) {
      toast({
        title: 'Advertencia',
        message: 'Revise los campos del Pedido',
        type: 'warn',
        messageService: this._messageService,
      });
      return;
    }

    let form = this.formCuotas.getRawValue();
    let formProyectos = this.formProyectos.value;
    let formPedidos = this.formPedidos.value;

    let venta: IRegisterVentaCuotas = {
      idVenta: this.idVenta,
      numeroCuota: null,
      pagoParcial: form.precioCuota,
      fechaCuota: form.fechaCuota,
      nombreProyecto: formProyectos.nombre,
      descripcionProyecto: formProyectos.descripcion,
      idProyecto: formPedidos.proyecto?.idProyecto,
    };

    try {
      this._obvsService.toogleSpinner();

      await this._ventasService.registerCuotasxVenta(venta);

      toast({
        title: 'Correcto',
        message: 'Se registró correctamente',
        type: 'success',
        messageService: this._messageService,
      });

      this.formCuotas.reset();
      this.formProyectos.reset();

      this.cuotaDialog = false;

      this.listarCuotas(this.idVenta);
    } catch (error) {
      console.error(error);
    } finally {
      this._obvsService.toogleSpinner();
    }
  }

  tipoCuota(data) {
    let precioTotal = this.formVentas.controls.precio.value;

    if (Boolean(data)) {
      this.formCuotas.controls.precioCuota.setValidators([
        Validators.required,
        Validators.min(precioTotal / 2),
        Validators.max(precioTotal - 1),
      ]);
      this.formCuotas.controls.precioCuota.updateValueAndValidity();
    } else {
      this.formCuotas.controls.precioCuota.setValidators([
        Validators.required,
        Validators.min(precioTotal),
        Validators.max(precioTotal),
      ]);
      this.formCuotas.controls.precioCuota.updateValueAndValidity();
    }
  }

  // Detalle Cuota
  abrirDialog() {
    this.cuotaDialog = true;
    this.formCuotas.controls.precioCuota.enable();
    this.segundaCuota = false;

    if (this.listaCuotas.length == 1 && !this.validarCuotas) {
      let precio = this.formVentas.controls.precio.value ?? 0;
      let sumaCuotas = this.listaCuotas.reduce(
        (sum, actualValue) => sum + actualValue['pagoParcial'],
        0
      );

      this.formCuotas.controls.precioCuota.setValue(precio - sumaCuotas);
      this.formCuotas.controls.precioCuota.disable();
      this.segundaCuota = true;
    }
  }

  cerrarDialog() {
    this.cuotaDialog = false;
  }

  get validarCuotas() {
    let sumaCuotas = this.listaCuotas.reduce(
      (sum, actualValue) => sum + actualValue['pagoParcial'],
      0
    );
    let precio = this.formVentas.controls.precio.value ?? 0;

    return sumaCuotas >= precio ? true : false;
  }

  //Botones Flotantes

  onToggleFab(fab: number, stat: number) {
    stat = stat === -1 ? (this.abLista.length > 0 ? 0 : 1) : stat;
    this.tsLista = stat === 0 ? 'inactive' : 'active';
    this.abLista = stat === 0 ? [] : this.fbLista;
  }

  clickFab(index: number) {
    switch (index) {
      default:
        break;
    }
  }
}
