import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegisterServicio } from '@models/serviciomodel';
import { ObvsService } from '@services/obvs.service';
import { ServicioService } from '@services/servicio.service';
import { toast } from '@utils/toast';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-servicio-register',
    templateUrl: './servicio-register.component.html'
})

export class ServicioRegisterComponent implements OnInit {

    formServicio: FormGroup

    constructor(
        private _formBuilder: FormBuilder,
        private _servicioService: ServicioService,
        private _messageService: MessageService,
        private _obvsService: ObvsService,
        public config: DynamicDialogConfig,
        public ref: DynamicDialogRef,
    ) { }

    ngOnInit() {

        this.crearFormServicio()
    }

    crearFormServicio() {
        this.formServicio = this._formBuilder.group({
            nombre: [null, [Validators.required]],
            descripcion: [null, [Validators.required]]
        })
    }

    async registrarServicio() {

        // Validacion Formulario
        if (this.formServicio.invalid) {
            return Object.values(this.formServicio.controls).forEach(control => {
                control.markAllAsTouched();
            })
        }

        let formServicio = this.formServicio.value;

        let servicio: IRegisterServicio = {
            Nombre: formServicio.nombre,
            Descripcion: formServicio.descripcion,
        }

        try {
            this._obvsService.toogleSpinner();

            let data = await this._servicioService.registerServicio(servicio);

            toast({
                title: 'Correcto',
                message: 'Se registró correctamente',
                type: 'success',
                messageService: this._messageService,
            });
        }

        catch (error) {
            console.error(error);
        }

        finally {
            this._obvsService.toogleSpinner();
            this.ref.close()
        }

    }

    cerrarModal() {
        this.ref.close()
    }

}
