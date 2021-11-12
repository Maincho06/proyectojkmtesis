export interface IUsuarioModel {
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

export interface IRol {
    idRol                 : number;
    descripcion           : string;
}

export interface IRegisterUsuario{
    idVenta             : number;
    numeroCuota?        : number;
    pagoParcial         : number;
    fechaCuota          : Date | string | null;
}