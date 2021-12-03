import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ObvsService } from '@services/obvs.service';

import { CatalogoService } from '@services/catalogo.service';
import { ICatalogoModel } from '@models/catalogomodel';
import { CatalogoRegisterComponent } from '../catalogo-register/catalogo-register.component';
import { CatalogoUpdateComponent } from '../catalogo-update/catalogo-update.component';

@Component({
    selector: 'app-catalogo-list',
    templateUrl: './catalogo-list.component.html',
    // styleUrls: ['./gestionar-catalogo.component.scss'],
    providers: [DialogService, ConfirmationService, MessageService],
})

export class CatalogoListComponent implements OnInit {

    listaCatalogo: ICatalogoModel[];
    formVentas: FormGroup;

    constructor(
        private _dialogService: DialogService,
        private _catalogoService: CatalogoService,
        private _obvsService: ObvsService,
        private _messageService: MessageService,

    ) { }

    ngOnInit() {
        this.listarCatalogos();
    }

    async listarCatalogos() {

        try {
            this._obvsService.toogleSpinner();

            const data: any = await this._catalogoService.getCatalogoPaginado({ pages: 1, rows: 10 }).toPromise();
            this.listaCatalogo = data.data;
            console.log('Catalogo', this.listaCatalogo);
        }

        catch (error) {
            console.log('Error: ', error);
        }

        finally {
            this._obvsService.toogleSpinner();
        }
    }

    registerCatalogo() {
        const ref = this._dialogService.open(CatalogoRegisterComponent, {
            header: 'Registrar Catálogo',
            width: '30rem'
        })

        ref.onClose.subscribe(async (data) => {
            await this.listarCatalogos()
        })
    }

    verCatalogo(idCatalogo: number) {
        const ref = this._dialogService.open(CatalogoUpdateComponent, {
            header: 'Ver Catálogo',
            width: '30rem',
            data: idCatalogo
        })

    }

    editarCatalogo(idCatalogo: number) {
        const ref = this._dialogService.open(CatalogoUpdateComponent, {
            header: 'Editar Catálogo',
            width: '30rem',
            data: idCatalogo
        })

        ref.onClose.subscribe(async (data) => {
            await this.listarCatalogos()
        })
    }

    async actualizarEstadoCatalogo(idCatalogo: number) {
        try {

            this._obvsService.toogleSpinner();
            const data: any = await this._catalogoService.updateEstadoCatalogo(idCatalogo)
            
            this._messageService.add({ severity: 'success', summary: 'Actualización exitosa', detail: 'Se Actualizó el estado correctamente' })

            this.listarCatalogos()
        }

        catch (error) {
            console.log("Error: ", error);
        }

        finally {
            this._obvsService.toogleSpinner();
        }
    }
}
