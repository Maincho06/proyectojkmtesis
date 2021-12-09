import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUpdateServicio } from '@models/serviciomodel';
import { ObvsService } from '@services/obvs.service';
import { ServicioService } from '@services/servicio.service';
import { base64ToFile, imageToBase64 } from '@utils/form';
import { toast } from '@utils/toast';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-servicio-update',
  templateUrl: './servicio-update.component.html',
})
export class ServicioUpdateComponent implements OnInit {
  formServicio: FormGroup;
  estado: boolean = false;
  uploadedFiles: any[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _servicioService: ServicioService,
    private _messageService: MessageService,
    private _obvsService: ObvsService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {}

  async ngOnInit() {
    if (this.config.header == 'Editar Servicio') {
      this.estado = true;
    }

    this.crearFormServicio();
    await this.listarServicioxID(this.config.data);
  }

  crearFormServicio() {
    this.formServicio = this._formBuilder.group({
      nombre: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      imagen: [null, [Validators.required]],
    });
  }

  async listarServicioxID(idServicio: number) {
    try {
      this._obvsService.toogleSpinner();
      const data: any =
        (await this._servicioService.getServicioxID(idServicio).toPromise()) ??
        [];

      this.formServicio.patchValue({
        nombre: data.nombre,
        descripcion: data.descripcion,
        imagen: data.imagen,
      });

      const promises = Promise.all(base64ToFile([data.imagen]));
      promises.then((data) => (this.uploadedFiles = data));
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      this._obvsService.toogleSpinner();
    }
  }

  async actualizarServicio() {
    // Validacion Formulario
    if (this.formServicio.invalid) {
      return Object.values(this.formServicio.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    }

    let formServicio = this.formServicio.value;

    let servicio: IUpdateServicio = {
      idServicio: this.config.data,
      Nombre: formServicio.nombre,
      Descripcion: formServicio.descripcion,
      Imagen: formServicio.imagen,
    };

    try {
      this._obvsService.toogleSpinner();

      let data = await this._servicioService.editServicio(servicio);

      toast({
        title: 'Correcto',
        message: 'Se actualizo correctamente',
        type: 'success',
        messageService: this._messageService,
      });
    } catch (error) {
      console.error(error);
    } finally {
      this._obvsService.toogleSpinner();
      this.ref.close();
    }
  }

  onUpload(event) {
    const promises = imageToBase64(event.files);
    Promise.all(promises).then((image) =>
      this.formServicio.get('imagen').setValue(image[0])
    );
  }

  cerrarModal() {
    this.ref.close();
  }
}
