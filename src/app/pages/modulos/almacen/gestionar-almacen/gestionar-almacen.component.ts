import { Component, OnInit } from '@angular/core';
import { IAlmaceModel } from '@models/almacenmodel';
import { IClienteModel } from '@models/clientemodel';
import { AlmacenService } from '@services/almacen.service';
import { DialogService } from 'primeng/dynamicdialog';
import { GestionarAlmacenRegisterComponent } from './components/gestionar-almacen-register/gestionar-almacen-register.component';



@Component({
  selector: 'app-gestionar-almacen',
  templateUrl: './gestionar-almacen.component.html',
  styleUrls: ['./gestionar-almacen.component.scss']
})
export class GestionarAlmacenComponent implements OnInit {

  almacen: IAlmaceModel[] = [];

  constructor(
    private _almacenService: AlmacenService,
    private _dialogService: DialogService
  ) { }

  async ngOnInit() {
    await this.listarAlmacen();
  }

  async listarAlmacen() {
    try {
      let data = await this._almacenService.getAlmacenPaginado({ pages: 1, rows: 100 });
      this.almacen = data.data;
    } catch (error) {
      console.error(error);
      this.almacen = [];
    }
  }

  mostrarDialogRegister() {
    const ref = this._dialogService.open(GestionarAlmacenRegisterComponent, {
      header: 'Registrar almacen',
      width: '50%'
    });

    // ref.onClose.subscribe(async (data) => {
    //   await this.listarAlmacen()
    // })
  }

  mostrarDialogUpdate(almacen: IAlmaceModel) {
    // const ref = this._dialogService.open(GestionarAlmacenUpdateComponent, {
    //   header: 'Actualizar Almacen',
    //   width: '50%',
    //   data: almacen
    // });

    // ref.onClose.subscribe(async (data) => {
    //   await this.listarAlmacen()
    // })
  }

}
