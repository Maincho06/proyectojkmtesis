import { Component, OnInit } from '@angular/core';
import { ITrabajadorModel } from '@models/trabajadormodel';
import { TrabajadorService } from '@services/trabajador.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { toast } from '@utils/toast';
import { IApiResponseModelGet } from '@models/responsemodel';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DetalleTrabajadorComponent } from './detalle-trabajador/detalle-trabajador.component';
import { BASE_INDEX_MODAL } from '@utils/general_constants';

@Component({
  selector: 'app-gestionar-trabajador',
  templateUrl: './gestionar-trabajador.component.html',
  styleUrls: ['./gestionar-trabajador.component.scss'],
})
export class GestionarTrabajadorComponent implements OnInit {
  listTrabajadores: ITrabajadorModel[];

  constructor(
    private _trabajadorService: TrabajadorService,
    private _messageService: MessageService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.listarTrabajadores();
  }

  async listarTrabajadores(pages = 1) {
    try {
      const data: IApiResponseModelGet<ITrabajadorModel> =
        await this._trabajadorService
          .getTrabajadorPaginado({ pages: pages, rows: 10 })
          .toPromise();
      this.listTrabajadores = data.data;
    } catch (error) {
      console.log('Error: ', error);
    } finally {
    }
  }

  detalleTrabajador(isRegistrar: boolean, data: any) {
    const dialogConfig = new DynamicDialogConfig();

    // dialogConfig.width = '40w';
    dialogConfig.width = '30rem'
    dialogConfig.baseZIndex = BASE_INDEX_MODAL;
    dialogConfig.header = 'Registrar Trabajador';
    dialogConfig.data = {
      isRegistrar: isRegistrar,
      data: data,
    };

    const ref = this.dialogService.open(
      DetalleTrabajadorComponent,
      dialogConfig
    );

    ref.onClose.subscribe(async () => await this.listarTrabajadores());
  }

  eliminarTrabajador(idTrabajador: number) {
    this.confirmationService.confirm({
      message: '¿Seguro que desea eliminar el trabajador?',
      header: 'Alerta',
      icon: 'pi pi-info-circle',
      acceptLabel: "Si",
      rejectLabel: "No",
      accept: async () => {
        const data = await this._trabajadorService.eliminarTrabajador(
          idTrabajador
        );
        if (!!data.message) {
          this.listTrabajadores = this.listTrabajadores.filter(
            (item) => item.idTrabajador != idTrabajador
          );
          toast({
            title: 'Eliminación exitosa',
            message: data?.message,
            type: 'success',
            messageService: this._messageService,
          });
        }
      },
    });
  }
}
