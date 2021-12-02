import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ObvsService } from '@services/obvs.service';
import { CatalogoRegisterComponent } from '../catalogo-register/catalogo-register.component';
import { CatalogoUpdateComponent } from '../catalogo-update/catalogo-update.component';
import { ServicioService } from '@services/servicio.service';
import { IServicioModel } from '@models/serviciomodel';
import { toast } from '@utils/toast';

@Component({
    selector: 'app-gestionar-servicio',
    templateUrl: './gestionar-servicio.component.html',
    // styleUrls: ['./gestionar-catalogo.component.scss'],
    providers: [DialogService, ConfirmationService, MessageService],
})

export class GestionarServicioComponent implements OnInit {

    listaServicio: IServicioModel[];

    constructor(
        private _dialogService: DialogService,
        private _servicioService: ServicioService,
        private _obvsService: ObvsService,
        private _messageService: MessageService,

    ) { }

    ngOnInit() {
        this.listarServicios();
    }

    async listarServicios() {

        try {
            this._obvsService.toogleSpinner();

            const data: any = await this._servicioService.getServicioPaginado({ pages: 1, rows: 10 }).toPromise();
            this.listaServicio = data.data;
            console.log('Catalogo', this.listaServicio);
        }

        catch (error) {
            console.log('Error: ', error);
        }

        finally {
            this._obvsService.toogleSpinner();
        }
    }

    registerServicio() {
        const ref = this._dialogService.open(CatalogoRegisterComponent, {
            header: 'Registrar Servicio',
            width: '30rem'
        })

        ref.onClose.subscribe(async (data) => {
            await this.listarServicios()
        })
    }

    verServicio(idServicio: number) {
        const ref = this._dialogService.open(CatalogoUpdateComponent, {
            header: 'Ver Servicio',
            width: '30rem',
            data: idServicio
        })

    }

    editarServicio(idServicio: number) {
        const ref = this._dialogService.open(CatalogoUpdateComponent, {
            header: 'Editar Servicio',
            width: '30rem',
            data: idServicio
        })

        ref.onClose.subscribe(async (data) => {
            await this.listarServicios()
        })
    }

    async actualizarEstadoServicio(idServicio: number) {
        try {

            this._obvsService.toogleSpinner();
            const data: any = await this._servicioService.updateEstadoServicio(idServicio)

            // this._messageService.add({ severity: 'success', summary: 'Actualización exitosa', detail: 'Se Actualizó el estado correctamente' })

            toast({ 
                title: 'Actualización exitosa', 
                message: 'Se Actualizó el estado correctamente', 
                type: 'warn', 
                messageService: this._messageService, 
            });

            this.listarServicios()
        }

        catch (error) {
            console.log("Error: ", error);
        }

        finally {
            this._obvsService.toogleSpinner();
        }
    }
}
