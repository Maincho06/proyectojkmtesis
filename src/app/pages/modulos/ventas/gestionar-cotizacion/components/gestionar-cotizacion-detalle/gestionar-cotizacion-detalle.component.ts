import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICotizacionModel } from '@models/cotizacionmodel';
import { CotizacionService } from '@services/cotizacion.service';
import { ActividadesCotizacionComponent } from '../actividades-cotizacion/actividades-cotizacion.component';
import { DatosCotizacionComponent } from '../datos-cotizacion/datos-cotizacion.component';
import { ProductosCotizacionComponent } from '../productos-cotizacion/productos-cotizacion.component';
import { TrabajadoresCotizacionComponent } from '../trabajadores-cotizacion/trabajadores-cotizacion.component';

@Component({
  selector: 'app-gestionar-cotizacion-detalle',
  templateUrl: './gestionar-cotizacion-detalle.component.html',
  styleUrls: ['./gestionar-cotizacion-detalle.component.scss']
})
export class GestionarCotizacionDetalleComponent implements OnInit {

  @ViewChild('trabajadores') trabajadores: TrabajadoresCotizacionComponent;
  @ViewChild('productos') productos: ProductosCotizacionComponent;
  @ViewChild('datosCotizacion') datosCotizacion: DatosCotizacionComponent;
  @ViewChild('actividades') actividades: ActividadesCotizacionComponent;


  idCotizacion: number;
  cotizacion: ICotizacionModel;

  bloqueado = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cotizacionService: CotizacionService,
    private cdRef: ChangeDetectorRef

  ) { }

  ngOnInit() {
  }

  async ngAfterViewInit() {
    this._activatedRoute.paramMap.subscribe(params => {
      this.idCotizacion = Number(params.get('id'));
      if (this.idCotizacion) {
        this.listarCotizacionId(this.idCotizacion);
      }
    })
  }

  ngAfterContentChecked() {
    if (this.bloqueado) {
      this.productos ? this.productos.bloqueado = true : null;
      this.trabajadores ? this.trabajadores.bloqueado = true : null;
      this.actividades ? this.actividades.bloqueado = true : null;

      if (this.datosCotizacion) {
        this.datosCotizacion.bloquear();
      }
    }
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  async listarCotizacionId(idCotizacion: number) {
    try {
      let data = await this._cotizacionService.getCotizacionById(idCotizacion);
      this.cotizacion = data;
      if (this.cotizacion.estado.id == 2 || this.cotizacion.estado.id == 3) {
        this.bloqueado = true;

      }
    } catch (error) {
      console.error(error);
    }
  }

  get precioReferencial() {
    let productosSum = 0, trabajadoresSum = 0

    if (this.trabajadores == null) {
      trabajadoresSum = 0
    } else if (!this.trabajadores.trabajadores) {
      trabajadoresSum = 0
    } else {
      trabajadoresSum = this.trabajadores.trabajadores.reduce((sum, actualValue) => sum + (actualValue.cantidad * actualValue.precio), 0);
    }

    if (this.productos == null) {
      productosSum = 0
    } else if (this.productos.productos == null) {
      productosSum = 0
    }
    else {
      productosSum = this.productos.detalleOrden.reduce((sum, actualValue) => sum + (actualValue.cantidad * actualValue.precio), 0);
    }


    return productosSum + trabajadoresSum


  }
}
