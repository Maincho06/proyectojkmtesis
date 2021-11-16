export interface IAlmaceModel {
    idAlmacen?: number;
    nombre: string;
    direccion: string;
    distrito: string;
}

export interface IRegisterAlmacen {
    idAlmacen?: number;
    nombre: string;
    direccion: string;
    distrito: string;
}

export interface IUpdateAlmacen {
    nombreDelAlmacen: string;
    direccion: string;
    distrito : string;
}