import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-datos-cotizacion',
  templateUrl: './datos-cotizacion.component.html',
  styleUrls: ['./datos-cotizacion.component.scss']
})
export class DatosCotizacionComponent implements OnInit {

  formDatos: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.inicializarForm();
  }

  ngOnInit(): void {
  }

  inicializarForm(){
    this.formDatos = this.formBuilder.group({
      solicitante: ['', Validators.required],
      empresa: ['', Validators.required],
      fechaSolicitud: ['', Validators.required],
      estado: ['', Validators.required],
      correo: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
  }
}
