import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestionar-cotizacion',
  templateUrl: './gestionar-cotizacion.component.html',
  styleUrls: ['./gestionar-cotizacion.component.scss']
})
export class GestionarCotizacionComponent implements OnInit {

  cotizaciones: any[] = [];

  cols: any[];

  constructor() { }

  ngOnInit() {

    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'empresa', header: 'Empresa/Organización' },
      { field: 'fechaSolicitud', header: 'Fecha de Solicitud' },
      { field: 'estado', header: 'Estado' },
      { field: 'acciones', header: 'Acciones' }
    ];
  }
}
