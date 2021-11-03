export interface IAlmaceModel {
    codigoAlmacen: number;
    nombreDelAlmacen: string;
    direccion: string;
    distrito : string;
}

export interface IRegisterAlmacen {
    nombreDelAlmacen: string;
    direccion: string;
    distrito : string;
}

export interface IUpdateAlmacen {
    nombreDelAlmacen: string;
    direccion: string;
    distrito : string;
}