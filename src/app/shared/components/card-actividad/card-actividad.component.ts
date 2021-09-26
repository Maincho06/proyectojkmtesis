import { FlatTreeControl } from '@angular/cdk/tree';
import { Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Component, EventEmitter } from '@angular/core';
// import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
// import { IActividadProyecto } from '@models/proyectomodel';
@Component({
  selector: 'app-card-actividad',
  templateUrl: './card-actividad.component.html',
  styleUrls: ['./card-actividad.component.scss']
})
export class CardActividadComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  // @Input() isCotizacion  : boolean = false;
  // @Input() actividadesArr: IActividadProyecto[]        = [];
  // @Output() emitActividad: EventEmitter<IActionDispatch> = new EventEmitter();
  
  // displayedColumns: string[] = ['descripcion', 'start', 'end','peso', 'actions'];
  
  // private transformer = (node: IActividadProyecto, level: number) => {
  //   return {
  //     ...node,
  //     expandable: !!node.hijo && node.hijo.length > 0,
  //     level     : level
  //   };
  // }

  // treeControl = new FlatTreeControl<IExpandModel>(
  //     node => node.level, node => node.expandable);

  // treeFlattener = new MatTreeFlattener(
  //     this.transformer, node => node.level, 
  //     node => node.expandable, node => node.hijo);

  // dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  // constructor() { }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if(changes.actividadesArr)
  //     this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  //     this.dataSource.data = this.actividadesArr
  // }

  // hasChild = (_: number, node: IExpandModel) => node.expandable;

  // dispatchEvent(data: IActividadProyecto, action: string, index: number = 0) {
  //   switch (action) {
  //     case 'ADD':
  //       const hijosPadre = this.actividadesArr[index].hijo;
  //       const count      = hijosPadre.length || 0;
  //       const hermano    = count > 0 ? hijosPadre[count - 1].idActividad : 0;
  //       this.emitActividad.emit({
  //         action: action,
  //         payload: {
  //           idPadre  : data.idActividad || 0,
  //           idHermano: hermano
  //         }
  //       })
  //       break;
  //     case 'DELETE':
  //       this.emitActividad.emit({
  //         action: action,
  //         payload: {
  //           idActividad: data.idActividad || 0
  //         }
  //       })
  //       break;
  //     case 'UPDATE':
  //       this.emitActividad.emit({
  //         action: action,
  //         payload: {
  //           ...data
  //         }
  //       })
  //       break;
  //     default:
  //       break;
  //   }
  // }

}

interface IExpandModel {
  expandable  : boolean;
  descripcion : string;
  fechaInicio?: Date;
  fechaFin?   : Date;
  peso        : number;
  prioridad?  : string;
  level       : number;
}

export interface IActionDispatch {
  payload: any;
  action : 'ADD' | 'DELETE' | 'UPDATE';
}
