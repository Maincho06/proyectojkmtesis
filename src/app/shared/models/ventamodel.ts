export interface IVentaModel {
  idVenta: number;
  precio: number;
  FechaRegistro: Date | string | null;
  idTipo: number;
  tipoDescripcion: string;
  idEstado: number;
  estadoDescripcion: string;
  razonSocial: string;
  ruc: string;

}