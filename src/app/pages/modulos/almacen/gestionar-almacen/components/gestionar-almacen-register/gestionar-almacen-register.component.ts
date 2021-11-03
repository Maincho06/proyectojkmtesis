import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegisterAlmacen } from '@models/almacenmodel';
import { AlmacenService } from '@services/almacen.service';
import { toast } from '@utils/toast';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-gestionar-almacen-register',
  templateUrl: './gestionar-almacen-register.component.html',
  styleUrls: ['./gestionar-almacen-register.component.scss']
})
export class GestionarAlmacenRegisterComponent implements OnInit {

  formAlmacen: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    private _almacenService: AlmacenService,
    private _messageService: MessageService
  ) {
    this.inicializarForm();
  }

  ngOnInit(): void {
  }

  inicializarForm() {
    this.formAlmacen= this._formBuilder.group({
      nombreDelAlmacen: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      direccion: ['', Validators.required],
      distrito: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    })
  }

  async registrarAlmacen() {
    if (this.formAlmacen.invalid) {
      // Mostrar el snackbar
      toast({
        title: "Advertencia",
        message: 'Revise los campos ingresados',
        type: 'warn',
        messageService: this._messageService
      });
      return;
    }

    let form = this.formAlmacen.value;
    let almacen: IRegisterAlmacen = {
      nombreDelAlmacen: form.nombreDelAlmacen,
      direccion: form.direccion,
      distrito: form.distrito
    }

    try {
      let data = await this._almacenService.registerAlmacen(almacen);
      toast({
        title: "Correcto",
        message: 'Se registró correctamente',
        type: 'success',
        messageService: this._messageService
      });
      // this.ref.close(data);
    } catch (error) {
      console.error(error);
    }

  }

}
