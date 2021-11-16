import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuarioModel } from '@models/usuariomodel';
import { ObvsService } from '@services/obvs.service';
import { UsuariosService } from '@services/usuarios.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { UsuarioRegisterComponent } from './usuario-register/usuario-register.component';
import { UsuarioUpdateComponent } from './usuario-update/usuario-update.component';

@Component({
  selector: 'app-gestionar-usuario',
  templateUrl: './gestionar-usuario.component.html',
  styleUrls: ['./gestionar-usuario.component.scss']
})

export class GestionarUsuarioComponent implements OnInit {

  listaUsuarios: IUsuarioModel[]

  constructor(
    public _dialogService: DialogService,
    private router: Router,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService,
    private _usuariosService: UsuariosService,
    private _obvsService: ObvsService
  ) { }

  ngOnInit() {
    this.listarUsuarios()
  }

  async listarUsuarios() {

    try {

      this._obvsService.toogleSpinner();

      // Cambiar
      const data: any = await this._usuariosService.getUsuariosPaginado({ pages: 1, rows: 10 }).toPromise();
      console.log(data)
      this.listaUsuarios = data.data;
    }

    catch (error) {
      console.log("Error: ", error);
    }

    finally {
      this._obvsService.toogleSpinner();
    }

  }

  registerUsuario() {
    const ref = this._dialogService.open(UsuarioRegisterComponent, {
      header: 'Registrar Usuario',
      width: '30rem'
    })

    ref.onClose.subscribe(async (data) => {
      await this.listarUsuarios()
    })
  }

  verUsuario(idUsuario: number) {
    const ref = this._dialogService.open(UsuarioUpdateComponent, {
      header: 'Ver Usuario',
      width: '30rem',
      data: idUsuario
    })

  }

  editarUsuario(idUsuario: number) {
    const ref = this._dialogService.open(UsuarioUpdateComponent, {
      header: 'Editar Usuario',
      width: '30rem',
      data: idUsuario
    })

    ref.onClose.subscribe(async (data) => {
      await this.listarUsuarios()
    })
  }

  async actualizarEstadoUsuario(idUsuario: number) {
    try {

      this._obvsService.toogleSpinner();
      const data: any = await this._usuariosService.updateEstadoUsuario(idUsuario)
      console.log(data)
      this.listarUsuarios()
    }

    catch (error) {
      console.log("Error: ", error);
    }

    finally {
      this._obvsService.toogleSpinner();
    }
  }

  eliminarUsuario(idUsuario: number) {

    this._confirmationService.confirm({
      message: '¿Estas seguro de eliminar este Usuario?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',

      accept: async () => {

        try {
          let data = await this._usuariosService.deleteUsuario(idUsuario).toPromise()

          console.log(data)

          this._messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Se elimino la venta satisfactoriamente' });
        } catch (error) {
          console.log("Error: ", error);
        }
      },
      reject: () => {
        this._messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'No se elimino la venta' });
      }
    });

  }

}
