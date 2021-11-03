import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAceptarCotizacion, ICotizacionModel } from '@models/cotizacionmodel';
import { CotizacionService } from '@services/cotizacion.service';
import { toast } from '@utils/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-gestionar-cotizacion',
  templateUrl: './gestionar-cotizacion.component.html',
  styleUrls: ['./gestionar-cotizacion.component.scss'],
  providers: [ConfirmationService]
})
export class GestionarCotizacionComponent implements OnInit {

  cotizaciones: ICotizacionModel[] = [];
  formAceptarCotizacion: FormGroup;
  mostrarModal = false;

  constructor(
    private _cotizacionService: CotizacionService,
    private formBuilder: FormBuilder,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService,
  ) {
    this.inicializarForm();
  }

  async ngOnInit() {
    await this.listarCotizacion();
  }

  inicializarForm() {
    this.formAceptarCotizacion = this.formBuilder.group({
      idCotizacion: [null],
      nombreProyecto: ['', Validators.required],
      descripcionProyecto: ['', Validators.required]
    })
  }

  async listarCotizacion() {
    try {
      let data = await this._cotizacionService.getCotizacionPaginado();
      this.cotizaciones = data;
    } catch (error) {
      console.error(error);
      this.cotizaciones = [];
    }
  }

  rechazarCotizacion(cotizacion: ICotizacionModel) {
    this._confirmationService.confirm({
      message: '¿Desea rechazar la cotización?',
      accept: async () => {
        try {
          await this._cotizacionService.rechazarCotizacion(cotizacion.idCotizacion);

          toast({
            title: "Correcto",
            message: 'Se rechazó correctamente',
            type: 'success',
            messageService: this._messageService
          });

          await this.listarCotizacion();

        } catch (err) {
          console.error(err);
        }
      }
    });
  }

  modalAceptarCotizacion(cotizacion: ICotizacionModel) {
    this.formAceptarCotizacion.reset()
    this.mostrarModal = true;
    this.formAceptarCotizacion.patchValue({
      idCotizacion: cotizacion.idCotizacion
    })
  }

  async aceptarCotizacion() {
    if (this.formAceptarCotizacion.invalid) {
      // Mostrar el snackbar
      toast({
        title: "Advertencia",
        message: 'Revise los campos ingresados',
        type: 'warn',
        messageService: this._messageService
      });
      return;
    }

    let form = this.formAceptarCotizacion.value;
    let cotizacion: IAceptarCotizacion = {
      IdCotizacion: form.idCotizacion,
      Descripcion: form.descripcionProyecto,
      Nombre: form.nombreProyecto
    }
    try {
      let data = await this._cotizacionService.aceptarCotizacion(cotizacion);
      toast({
        title: "Correcto",
        message: 'Se aceptó correctamente',
        type: 'success',
        messageService: this._messageService
      });

      this.mostrarModal = false;
      await this.listarCotizacion();

    } catch (error) {
      console.error(error);
    }
  }

}
