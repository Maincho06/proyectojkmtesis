import { Component, OnInit } from '@angular/core';
import { ITipoTrabajador } from '@models/trabajadormodel';
import { TrabajadorService } from '@services/trabajador.service';
import { BASE_INDEX_MODAL, SIZE_MODAL } from '@utils/general_constants';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DetalleTipoTrabajadorComponent } from './detalle-tipo-trabajador/detalle-tipo-trabajador.component';

@Component({
  selector: 'gestionar-tipo-trabajador',
  templateUrl: 'gestionar-tipo-trabajador.component.html',
})
export class GestionarTipoTrabajadorComponent implements OnInit {
  listTipoTrabajador: ITipoTrabajador[] = [];
  constructor(
    private _trabajadorService: TrabajadorService,
    private _dialogService: DialogService
  ) {}

  async ngOnInit() {
    await this.listarTipoTrabajador();
  }

  async listarTipoTrabajador() {
    try {
      this.listTipoTrabajador =
        await this._trabajadorService.getTipoTrabajador();
    } catch (err) {
      console.log(err);
    }
  }

  openModalTipoTrabajador(idTipo?: number) {
    const dialogConfig = new DynamicDialogConfig();
    dialogConfig.width = SIZE_MODAL;
    dialogConfig.baseZIndex = BASE_INDEX_MODAL;
    dialogConfig.header = idTipo ? 'Actualizar Tipo' : 'Registrar Tipo';
    dialogConfig.data = idTipo;
    const ref = this._dialogService.open(
      DetalleTipoTrabajadorComponent,
      dialogConfig
    );

    ref.onClose.subscribe(async () => {
      await this.listarTipoTrabajador();
    });
  }
}
