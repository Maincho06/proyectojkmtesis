import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegisterUsuario } from '@models/usuariomodel';
import { ObvsService } from '@services/obvs.service';
import { UsuariosService } from '@services/usuarios.service';
import { toast } from '@utils/toast';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-usuario-register',
  templateUrl: './usuario-register.component.html',
  styleUrls: ['./usuario-register.component.scss']
})

export class UsuarioRegisterComponent implements OnInit {

  formUsuarios: FormGroup
  hide = true;
  
  lRol = [
    { idRol: 1, descripcion: 'MASTER' }
  ]

  constructor(
    private _formBuilder: FormBuilder,
    private _usuarioService: UsuariosService,
    private _messageService: MessageService,
    private _obvsService: ObvsService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) { }

  ngOnInit() {

    this.crearFormUsuarios()
  }

  crearFormUsuarios() {
    this.formUsuarios = this._formBuilder.group({
      nombre: [null, [Validators.required]],
      apellido: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      fechaNacimiento: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rol: [null, [Validators.required]],
    })
  }

  async registrarUsuario() {

    // Validacion Formulario
    if (this.formUsuarios.invalid) {
      return Object.values(this.formUsuarios.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }

    let formUsuarios = this.formUsuarios.value;

    let usuario: IRegisterUsuario = {
      Nombre: formUsuarios.nombre,
      Apellido: formUsuarios.apellido,
      Email: formUsuarios.email,
      FechaNacimiento: formUsuarios.fechaNacimiento,
      Username: formUsuarios.username,
      Password: formUsuarios.password,
      IdRol: formUsuarios.rol.idRol,
    }

    try {
      this._obvsService.toogleSpinner();

      let data = await this._usuarioService.registerUsuario(usuario);

      toast({
        title: 'Correcto',
        message: 'Se registró correctamente',
        type: 'success',
        messageService: this._messageService,
      });
    }

    catch (error) {
      console.error(error);
    }

    finally {
      this._obvsService.toogleSpinner();
      this.ref.close()
    }

  }

  cerrarModal() {
    this.ref.close()
  }

}
