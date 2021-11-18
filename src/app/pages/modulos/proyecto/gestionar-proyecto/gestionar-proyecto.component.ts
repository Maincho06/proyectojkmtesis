import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IProductoModel } from '@models/productomodel';
import { NotificationService } from '@services/notification.service';
import { ProyectoService } from '@services/proyecto.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-gestionar-proyecto',
  templateUrl: './gestionar-proyecto.component.html',
  styleUrls: ['./gestionar-proyecto.component.scss']
})
export class GestionarProyectoComponent implements OnInit {

  proyectos: IProductoModel[] = [];
  
  constructor(
    private _proyectoService: ProyectoService,
    private formBuilder: FormBuilder,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService,
    private _notificationService: NotificationService
  ) {
    this.inicializarForm();
  }

  async ngOnInit() {
    await this.listarProyectos();
  }

  inicializarForm() {
  }

  async listarProyectos() {
    try {
      let data = await this._proyectoService.getProyectosPaginado();
      this.proyectos = data.data;
    } catch (error) {
      console.error(error);
      this.proyectos = [];
    }
  }


}
