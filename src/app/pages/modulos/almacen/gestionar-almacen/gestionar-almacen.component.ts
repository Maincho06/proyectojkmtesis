import { Component, OnInit } from '@angular/core';
import { IAlmaceModel } from '@models/almacenmodel';
import { IClienteModel } from '@models/clientemodel';
import { AlmacenService } from '@services/almacen.service';
import { BASE_INDEX_MODAL, SIZE_MODAL } from '@utils/general_constants';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DetalleAlmacenComponent } from './detalle-almacen/detalle-almacen.component';



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
      this.almacen = await this._almacenService.getAlmacen();
    } catch (error) {
      console.error(error);
      this.almacen = [];
    }
  }

  registerOrUpdateAlmacen(isRegistrar: boolean, data: IAlmaceModel) {
    const dialogConfig = new DynamicDialogConfig();
    dialogConfig.width = SIZE_MODAL;
    dialogConfig.baseZIndex = BASE_INDEX_MODAL;
    dialogConfig.header = isRegistrar ? 'Registrar Almacen' : 'Actualizar Almacen';
    dialogConfig.data = {
      'isRegistrar': isRegistrar,
      'data': data
    };
    const ref = this._dialogService.open(DetalleAlmacenComponent, dialogConfig);

    ref.onClose.subscribe(async p => {
      await this.listarAlmacen();
    });

  }


  mostrarDialogUpdate(almacen: IAlmaceModel) {

  }

}
