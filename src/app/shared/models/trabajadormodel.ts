export interface ITrabajadorModel {
    idTrabajador?           : number;
    nombre                  : string;  
    apellido_paterno        : string;
    apellido_materno        : string;
    fechaNacimiento         : string;
    idEstado                : number;
    idTipo                  : number;
}

export interface ITipoTrabajador {
    id?                   : number;
    descripcion           : string;
    precioReferencial?    : number;
}

export interface IEstadoTrabajador {
    id?   : number;
    precioReferencial?    : number;
}