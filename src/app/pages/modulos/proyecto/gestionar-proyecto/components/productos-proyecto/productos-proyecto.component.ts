import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IDetalleOrdenModel } from '@models/cotizacionmodel';
import { IProductoModel } from '@models/productomodel';
import { CotizacionService } from '@services/cotizacion.service';
import { ProductoService } from '@services/producto.service';
import { ProyectoService } from '@services/proyecto.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-productos-proyecto',
  templateUrl: './productos-proyecto.component.html',
  styleUrls: ['./productos-proyecto.component.scss']
})
export class ProductosProyectoComponent implements OnInit {
  idProyecto: number;
  idCotizacion: number;

  detalleOrden: IDetalleOrdenModel[] = []
  formProducto: FormGroup;
  productos: IProductoModel[] = [];
  mostrarModal = false;

  modificando = false;

  constructor(
    private _cotizacionService: CotizacionService,
    private _activatedRoute: ActivatedRoute,
    private _proyectoService: ProyectoService,
  ) {
  }

  async ngOnInit() {

    this._activatedRoute.paramMap.subscribe(async params => {
      this.idProyecto = Number(params.get('id'));
      await this.listarProductoPorProyectoId(this.idProyecto);
    })
  }


  async listarProductoPorProyectoId(idProyecto: number) {
    try {
      let data = await this._proyectoService.getProductoByIdProyectos(idProyecto);
      this.detalleOrden = data ?? [];
    } catch (error) {
      console.error(error);
      this.detalleOrden = [];
    }
  }


}
