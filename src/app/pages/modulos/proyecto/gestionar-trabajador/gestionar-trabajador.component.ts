import { Component, OnInit } from '@angular/core';
import { ITrabajadorModel } from '@models/trabajadormodel';
import { TrabajadorService } from '@services/trabajador.service';
import { MessageService } from "primeng/api";
import { toast } from '@utils/toast';


@Component({
  selector: 'app-gestionar-trabajador',
  templateUrl: './gestionar-trabajador.component.html',
  styleUrls: ['./gestionar-trabajador.component.scss']
})
export class GestionarTrabajadorComponent implements OnInit {

  listTrabajadores: any[];

  constructor(
    private _trabajadorService : TrabajadorService,
    private _messageService:  MessageService
  ) { }

  ngOnInit(): void {
    this.listarTrabajadores();
    toast({title : "Registro Exitoso", 
            message: "TODO CORRECTO", 
            type: "success", 
            messageService: this._messageService });
  }

  async listarTrabajadores(pages = 1) {
    try {
      const data: any = await this._trabajadorService.getTrabajadorPaginado({pages: pages, rows: 10}).toPromise();
      this.listTrabajadores = data;
      console.info("DATA: ", data);
      
    } catch (error) {  
      console.log("Error: ",error);     
    }
  }

}
