import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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


  idCotizacion: number;
  constructor(
    private _activatedRoute: ActivatedRoute
  ) { }
  ngOnInit() {

    this._activatedRoute.paramMap.subscribe(params => {
      this.idCotizacion = Number(params.get('id'));
    })
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
