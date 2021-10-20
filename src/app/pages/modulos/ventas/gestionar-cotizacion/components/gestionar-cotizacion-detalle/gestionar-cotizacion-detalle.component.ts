import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-gestionar-cotizacion-detalle',
  templateUrl: './gestionar-cotizacion-detalle.component.html',
  styleUrls: ['./gestionar-cotizacion-detalle.component.scss']
})
export class GestionarCotizacionDetalleComponent implements OnInit {

  idCliente: number;
  constructor(
    private _activatedRoute: ActivatedRoute
  ){}
  ngOnInit() {
    
    this._activatedRoute.paramMap.subscribe(params => {
      this.idCliente = Number(params.get('id'));
    })
  }

}
