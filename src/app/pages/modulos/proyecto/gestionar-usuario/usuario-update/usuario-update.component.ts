import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUpdateUsuario } from '@models/usuariomodel';
import { ObvsService } from '@services/obvs.service';
import { UsuariosService } from '@services/usuarios.service';
import { toast } from '@utils/toast';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.scss']
})

export class UsuarioUpdateComponent implements OnInit {

  formUsuarios: FormGroup
  estado: boolean = false

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

  async ngOnInit() {

    if (this.config.header == 'Editar Usuario') {
      this.estado = true
    }

    this.crearFormUsuarios()
    await this.listarUsuarioxID(this.config.data)
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

  async listarUsuarioxID(idUsuario: number) {

    try {
      this._obvsService.toogleSpinner();
      const data: any = (await this._usuarioService.getUsuarioxID(idUsuario).toPromise()) ?? [];
      console.log(data)

      let fecha = moment(data.fechaNacimientoString, 'DD-MM-YYYY');

      this.formUsuarios.patchValue({
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        fechaNacimiento: fecha.toDate(),
        username: data.username,
        password: data.password,
        rol: this.lRol.find(item => item.idRol == data.idRol)
      })
    }

    catch (error) {
      console.log('Error: ', error);
    }

    finally {
      this._obvsService.toogleSpinner();
    }
  }

  async actualizarUsuario() {

    // Validacion Formulario
    if (this.formUsuarios.invalid) {
      return Object.values(this.formUsuarios.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }

    let formUsuarios = this.formUsuarios.value;

    let usuario: IUpdateUsuario = {
      IdUsuario: this.config.data,
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

      let data = await this._usuarioService.editUsuario(usuario);

      toast({
        title: 'Correcto',
        message: 'Se actualizo correctamente',
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
