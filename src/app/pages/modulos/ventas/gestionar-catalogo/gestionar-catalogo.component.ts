import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-gestionar-catalogo',
    templateUrl: './gestionar-catalogo.component.html',
    // styleUrls: ['./gestionar-catalogo.component.scss'],
    providers: [DialogService, ConfirmationService, MessageService],
})
export class GestionarCatalogoComponent implements OnInit {


    constructor() { }

    ngOnInit() {
    }

}
