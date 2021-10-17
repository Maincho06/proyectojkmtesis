import { Component, OnInit } from '@angular/core';
import { IClienteModel } from '@models/clientemodel';
import { ClienteService } from '@services/cliente.service';
import { DialogService } from 'primeng/dynamicdialog';
import { GestionarClientRegisterComponent } from './components/gestionar-client-register/gestionar-client-register.component';
import { GestionarClientUpdateComponent } from './components/gestionar-client-update/gestionar-client-update.component';

@Component({
  selector: 'app-gestionar-cliente',
  templateUrl: './gestionar-cliente.component.html',
  styleUrls: ['./gestionar-cliente.component.scss'],
  providers: [DialogService]
})
export class GestionarClienteComponent implements OnInit {
  cliente: IClienteModel[] = [];

  constructor(
    private _clienteService: ClienteService,
    private _dialogService: DialogService
  ) { }

  async ngOnInit() {
    await this.listarCliente();
  }

  async listarCliente() {
    try {
      let data = await this._clienteService.getClientePaginado({ pages: 1, rows: 100 });
      this.cliente = data.data;
    } catch (error) {
      console.error(error);
      this.cliente = [];
    }
  }

  mostrarDialogRegister() {
    const ref = this._dialogService.open(GestionarClientRegisterComponent, {
      header: 'Registrar cliente',
      width: '50%'
    });

    ref.onClose.subscribe(async (data) => {
      await this.listarCliente()
    })
  }

  mostrarDialogUpdate(cliente: IClienteModel) {
    const ref = this._dialogService.open(GestionarClientUpdateComponent, {
      header: 'Actualizar cliente',
      width: '50%',
      data: cliente
    });

    ref.onClose.subscribe(async (data) => {
      await this.listarCliente()
    })
  }
}
