import { Component, OnInit } from '@angular/core';
import { ICotizacionModel } from '@models/cotizacionmodel';
import { CotizacionService } from '@services/cotizacion.service';

@Component({
  selector: 'app-gestionar-cotizacion',
  templateUrl: './gestionar-cotizacion.component.html',
  styleUrls: ['./gestionar-cotizacion.component.scss']
})
export class GestionarCotizacionComponent implements OnInit {

  cotizaciones: ICotizacionModel[] = [];

  cols: any[];

  constructor(
    private _cotizacionService: CotizacionService
  ) { }

  async ngOnInit() {
    await this.listarCliente();
  }

  async listarCliente() {
    try {
      let data = await this._cotizacionService.getCotizacionPaginado({ pages: 1, rows: 100 });
      this.cotizaciones = data.data;
    } catch (error) {
      console.error(error);
      this.cotizaciones = [];
    }
  }
}
