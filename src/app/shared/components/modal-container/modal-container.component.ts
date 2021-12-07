import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
    selector   : 'app-modal-container',
    templateUrl: 'modal-container.component.html',
    styleUrls  : ['./modal-container.component.scss'],
    encapsulation : ViewEncapsulation.None
})

export class ModalContainerComponent implements OnInit {
    
    imagen: string;

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) { }

    ngOnInit() {
        console.log('VEAMOS'),
        console.log('IMAGEN ', this.config.data.imagen);
        this.imagen = this.config.data.imagen;
     }
}