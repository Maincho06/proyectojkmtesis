export interface ITrabajadorModel {
    idTrabajador?  : number;
    nombre         : string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    fechaNacimiento: string;
    estado         : IEstadoTrabajador;
    tipo           : ITipoTrabajador;
}

export interface ITipoTrabajador {
    id?               : number;
    nombre            : string;
    descripcion       : string;
    precioReferencial?: number;
}

export interface IEstadoTrabajador {
    id?   : number;
    precioReferencial?    : number;
}

export interface IRequestRegisterTrabajador {
    nombre         : string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    fechaNacimiento: string;
    idTipo         : number;
    idEstado?       : number;
}