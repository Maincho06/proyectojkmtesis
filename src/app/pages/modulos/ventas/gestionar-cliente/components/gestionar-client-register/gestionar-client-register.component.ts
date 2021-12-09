import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegisterCliente } from '@models/clientemodel';
import { ClienteService } from '@services/cliente.service';
import { toast } from '@utils/toast';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-gestionar-client-register',
  templateUrl: './gestionar-client-register.component.html',
  styleUrls: ['./gestionar-client-register.component.scss']
})
export class GestionarClientRegisterComponent implements OnInit {

  formCliente: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _clienteService: ClienteService,
    private _messageService: MessageService
  ) {
    this.inicializarForm();
  }

  ngOnInit(): void {
  }

  inicializarForm() {
    this.formCliente = this._formBuilder.group({
      ruc: ['', [Validators.required,Validators.pattern(/^(20|10)\d{0,9}/), Validators.minLength(11), , Validators.maxLength(11)]],
      razonSocial: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^9\d{8}/), Validators.minLength(9), , Validators.maxLength(9)]],
    })
  }

  async registrarCliente() {
    if (this.formCliente.invalid) {
      // Mostrar el snackbar
      toast({
        title: "Advertencia",
        message: 'Revise los campos ingresados',
        type: 'warn',
        messageService: this._messageService
      });
      return;
    }

    let form = this.formCliente.value;
    let cliente: IRegisterCliente = {
      RUC: form.ruc,
      RazonSocial: form.razonSocial,
      Telefono: form.telefono
    }

    try {
      let data = await this._clienteService.registerCliente(cliente);
      toast({
        title: "Correcto",
        message: 'Se registró correctamente',
        type: 'success',
        messageService: this._messageService
      });
      this.ref.close(data);
    } catch (error) {
      console.error(error);
    }

  }

}
