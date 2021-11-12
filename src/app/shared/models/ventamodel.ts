export interface IVentaModel {
    idVenta           : number;
    precio            : number;
    FechaRegistro     : Date | string | null;
    idTipo            : number;
    tipoDescripcion   : string;
    idEstado          : number;
    estadoDescripcion : string;
    razonSocial       : string;
    ruc               : string;
}

export interface IVentaCuotasModel {
    IdVenta             : number;
    IdDetalleVenta      : number;
    NumeroCuota         : number | null;
    PagoParcial         : number;
    FechaCuota          : Date | string | null;
    FechaCuotaString    : string;
}

export interface ITipoVenta {
    id?                   : number;
    descripcion           : string;
}

export interface IRegisterVentaCuotas {
    idVenta             : number;
    numeroCuota?        : number;
    pagoParcial         : number;
    fechaCuota          : Date | string | null;

    //Tipo Proyecto
    nombreProyecto: string;
    descripcionProyecto: string;

    //Tipo Pedido
    idProyecto: number | null;
}