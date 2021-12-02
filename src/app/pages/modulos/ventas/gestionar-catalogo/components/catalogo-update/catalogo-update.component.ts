import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUpdateCatalogo } from '@models/catalogomodel';
import { IProductoModel } from '@models/productomodel';
import { IRegisterUsuario } from '@models/usuariomodel';
import { CatalogoService } from '@services/catalogo.service';
import { ObvsService } from '@services/obvs.service';
import { ProductoService } from '@services/producto.service';
import { UsuariosService } from '@services/usuarios.service';
import { toast } from '@utils/toast';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-catalogo-update',
    templateUrl: './catalogo-update.component.html',
    // styleUrls: ['./catalogo-register.component.scss']
})

export class CatalogoUpdateComponent implements OnInit {

    formCatalogo: FormGroup
    lProducto: IProductoModel[]
    estado: boolean = false

    constructor(
        private _formBuilder: FormBuilder,
        private _catalogoService: CatalogoService,
        private _productoService: ProductoService,
        private _messageService: MessageService,
        private _obvsService: ObvsService,
        public config: DynamicDialogConfig,
        public ref: DynamicDialogRef,
    ) { }

    async ngOnInit() {

        if (this.config.header == 'Editar Catálogo') {
            this.estado = true
        }

        this.crearFormCatalogo()
        await this.listarProducto()
        await this.listarCatalogoxID(this.config.data)
    }

    crearFormCatalogo() {
        this.formCatalogo = this._formBuilder.group({
            producto: [null, [Validators.required]],
            precio: [null, [Validators.required]],
            stock: [null, [Validators.required]],
        })
    }

    async listarProducto() {

        try {
            this._obvsService.toogleSpinner();
            const data: any = (await this._productoService.getProducto()) ?? [];
            console.log(data)

            this.lProducto = data
        }

        catch (error) {
            console.log('Error: ', error);
        }

        finally {
            this._obvsService.toogleSpinner();
        }
    }

    async listarCatalogoxID(idCatalogo: number) {

        try {
            this._obvsService.toogleSpinner();
            const data: any = (await this._catalogoService.getCatalogoxID(idCatalogo).toPromise()) ?? [];
            console.log(data)

            this.formCatalogo.patchValue({
                producto: this.lProducto.find(item => item.idProducto == data.idProducto),
                precio: data.precio,
                stock: data.stock,
            })
        }

        catch (error) {
            console.log('Error: ', error);
        }

        finally {
            this._obvsService.toogleSpinner();
        }
    }

    async actualizarCatalogo() {

        // Validacion Formulario
        if (this.formCatalogo.invalid) {
            toast({
                title: 'Advertencia',
                message: 'Revise los campos ingresados',
                type: 'warn',
                messageService: this._messageService,
            });
            return
        }

        let formCatalogo = this.formCatalogo.value;

        let catalogo: IUpdateCatalogo = {
            idCatalogo: this.config.data,
            precio: formCatalogo.precio,
            stock: formCatalogo.stock,
            idProducto: formCatalogo.producto.idProducto,
        }

        try {
            this._obvsService.toogleSpinner();

            let data = await this._catalogoService.editCatalogo(catalogo);

            toast({
                title: 'Correcto',
                message: 'Se actualizo correctamente',
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
