import { Identifier } from "./identifiermodel";

export interface ICotizacionModel {
    idCotizacion: number;
    solicitante: string;
    descripcion: string;
    fechaSolicitud: string;
    email: string;
    razonSocial: string;
    estado: Identifier;
    idEstado: number;
    idCliente: number;
    descripcionEstado: string;
    precioCotizacion: number;
    tipoCotizacion: Identifier;
    canCotizar: boolean;
    canDelete: boolean;
    canEdit: boolean;
}

export interface IRegisterCotizacion {
    Solicitante: string;
    Descripcion: string;
    FechaSolicitud: Date | string | null;
    Email: string;
    IdCliente: number;
    PrecioCotizacion: number;
    IdTipoCotizacion: number;
}

export interface IUpdateCotizacion {
    IdCotizacion: number;
    Solicitante: string;
    Descripcion: string;
    FechaSolicitud: Date | string;
    Email: string;
    IdCliente: number;
    PrecioCotizacion: number;
    IdTipoCotizacion: number;
}

export interface IRegisterTrabajadorCotizacion {
    IdCotizacion: number;
    IdTipoTrabajador: number;
    Cantidad: number;
    Precio: number;
}

export interface ITipoTrabajadorModel {
    idCotizacion: number;
    idTipoTrabajador: number;
    descripcion: string;
    cantidad: number;
    precio: number;
}

export interface IUpdateTrabajadorCotizacion {
    IdCotizacion: number;
    IdTipoTrabajador: number;
    Cantidad: number;
    Precio: number;
}

export interface IActividadCotizacionModel {
    IdCotizacion: number;
    IdActividad: number;
    Descripcion: string;
    Peso: number;
    Prioridad: string;
    IdPadre: number | null;
    IdHermano: number | null;
    IdEstado: number;
    DescripcionEstado: string;
    Estado: Identifier;
    children: IActividadCotizacionModel[];
}

export interface IActividadCotizancionTreeNode {
    data: IActividadCotizacionModel;
    children: IActividadCotizancionTreeNode[] | null;
}

export interface IRegisterActividadCotizacion {
    IdCotizacion: number;
    Descripcion: string;
    Peso: number;
    IdPadre: number | null;
    IdHermano: number | null;
}

export interface IUpdateActividadCotizacion {
    IdActividad: number;
    IdCotizacion: number;
    Descripcion: string;
    Peso: number;
    IdPadre: number | null;
    IdHermano: number | null;
}

export interface IAceptarCotizacion {
    IdCotizacion: number;
    Descripcion: string;
    Nombre: string;
}


export interface IRegisterDetalleOrdenCotizacion {
    IdCotizacion: number;
    IdProducto: number;
    Cantidad: number;
    Precio: number;
}

export interface IUpdateDetalleOrdenCotizacion{
    IdCotizacion: number;
    IdDetalleOrden: number;
    Cantidad: number;
    Precio: number;
}
export interface IDetalleOrdenModel {
    idDetalleOrden: number;
    idCotizacion: number;
    idProducto: number;
    codigoProducto: string;
    nombreProducto: string;
    cantidad: number;
    precio: number;
}