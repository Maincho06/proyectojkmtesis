import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-actividades-cotizacion',
  templateUrl: './actividades-cotizacion.component.html',
  styleUrls: ['./actividades-cotizacion.component.scss']
})
export class ActividadesCotizacionComponent implements OnInit {
  files: TreeNode[] = [];
  cols: { field: string, header: string }[];

  mostrarModal = false;

  formActividad: FormGroup;
  prioridades = [
    { valor: 1, descripcion: 'Baja' },
    { valor: 2, descripcion: 'Media' },
    { valor: 3, descripcion: 'Alta' },
  ]
  
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.inicializarForm();
  }


  ngOnInit() {
    this.cols = [
      { field: 'descripcion', header: 'Descripción' },
      { field: 'fechaInicio', header: 'Fecha Inicio' },
      { field: 'fechaFin', header: 'Fecha Fin' },
      { field: 'prioridad', header: 'Prioridad' },
    ];
  }

  inicializarForm() {
    this.formActividad = this.formBuilder.group({
      descripcion: ['', Validators.required],
      prioridad: [null, Validators.required]
    })
  }
}
