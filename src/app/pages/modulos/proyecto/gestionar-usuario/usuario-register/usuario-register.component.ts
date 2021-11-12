import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-register',
  templateUrl: './usuario-register.component.html',
  styleUrls: ['./usuario-register.component.scss']
})

export class UsuarioRegisterComponent implements OnInit {

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
