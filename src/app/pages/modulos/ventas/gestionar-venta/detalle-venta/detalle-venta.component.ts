import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.scss']
})

export class DetalleVentaComponent implements OnInit {

  formVentas: FormGroup

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.crearFormVentas()
  }

  crearFormVentas() {
    this.formVentas = this.formBuilder.group({
      descripcion     : [null, [Validators.required]],
      precio          : [null, [Validators.required]],
      tipoVenta       : [null, [Validators.required]],
      tipoCotizacion       : [null, [Validators.required]],

    })
  }

}
