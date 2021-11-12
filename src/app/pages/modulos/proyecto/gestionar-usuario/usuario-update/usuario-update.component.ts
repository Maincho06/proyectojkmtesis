import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.scss']
})

export class UsuarioUpdateComponent implements OnInit {

  formUsuarios: FormGroup

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.crearFormUsuarios()
  }

  crearFormUsuarios() {
    this.formUsuarios = this.formBuilder.group({
      nombres: [null, [Validators.required]],
      apellidos: [null, [Validators.required]],
      nombreUsuario: [null, [Validators.required]],
      contrasenia: [null, [Validators.required]],
      fechaNac: [null, [Validators.required]],
      rol: [null, [Validators.required]]
    })
  }

}
