import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-trabajadores-cotizacion',
  templateUrl: './trabajadores-cotizacion.component.html',
  styleUrls: ['./trabajadores-cotizacion.component.scss']
})
export class TrabajadoresCotizacionComponent implements OnInit {

  roles: any[] = [];

  formRol: FormGroup;

  mostrarModal = false;

  trabajadores: any[] = [];

  cols: any[];

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.inicializarForm();
   }

  ngOnInit() {

    this.cols = [
      { field: 'rol', header: 'Rol' },
      { field: 'cantidad', header: 'Cantidad' },
      { field: 'precio', header: 'Precio' },
      { field: 'Total', header: 'Total' },
      { field: 'acciones', header: 'Acciones' }
    ];
  }

  inicializarForm() {
    this.formRol = this.formBuilder.group({
      rol: [null, Validators.required],
      cantidad: ['', Validators.required],
      precio: ['', Validators.required]
    })
  }
}
