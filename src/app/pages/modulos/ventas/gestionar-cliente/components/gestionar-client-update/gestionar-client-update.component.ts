import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClienteModel, IUpdateCliente } from '@models/clientemodel';
import { ClienteService } from '@services/cliente.service';
import { toast } from '@utils/toast';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-gestionar-client-update',
  templateUrl: './gestionar-client-update.component.html',
  styleUrls: ['./gestionar-client-update.component.scss']
})
export class GestionarClientUpdateComponent implements OnInit {
  formCliente: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _clienteService: ClienteService,
    private _messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.inicializarForm(this.config.data);
  }

  inicializarForm(cliente: IClienteModel) {
    this.formCliente = this._formBuilder.group({
      idCliente: [cliente.idCliente],
      ruc: [cliente.ruc, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(11), Validators.maxLength(11)]],
      razonSocial: [cliente.razonSocial, Validators.required],
      telefono: [cliente.telefono, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(9), Validators.maxLength(9)]],
    })
  }

  async updateCliente() {
    if (this.formCliente.invalid) {
      toast({
        title: "Advertencia",
        message: 'Revise los campos ingresados',
        type: 'warn',
        messageService: this._messageService
      });
      return;
    }

    let form = this.formCliente.value;
    let cliente: IUpdateCliente = {
      RUC: form.ruc,
      RazonSocial: form.razonSocial.trim(),
      Telefono: form.telefono,
      IdCliente: form.idCliente
    }

    try {
      let data = await this._clienteService.updateCliente(cliente);
      toast({
        title: "Correcto",
        message: 'Se actualizó correctamente',
        type: 'success',
        messageService: this._messageService
      });
      this.ref.close(data);

    } catch (error) {
      console.error(error);
    }

  }
}
