import { Identifier } from "./identifiermodel";

export interface ICotizacionModel {
    idCotizacion: number;
    solicitante: string;
    descripcion: string;
    fechaSolicitudString: string;
    email: string;
    razonSocial: string;
    estado: Identifier;
    idEstado: number;
    idCliente: number;
    descripcionEstado: string;
    precioCotizacion: number;
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
}

export interface IUpdateCotizacion {
    IdCotizacion: number;
    Solicitante: string;
    Descripcion: string;
    FechaSolicitud: Date | string;
    Email: string;
    IdCliente: number;
    PrecioCotizacion: number;
}

export interface IRegisterTrabajadorCotizacion {
    IdCotizacion: number;
    IdTipoTrabajador: number;
    Cantidad: number;
    Precio: number;
}