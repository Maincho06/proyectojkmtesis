import { IProductoModel } from "./productomodel";

export interface ICatalogoModel extends IProductoModel {
    idCatalogo: number;
    precio: number;
    stock: number;
}

export interface IRegisterCatalogo {
    precio: number;
    stock: number;
    idProducto: number;
}

export interface IUpdateCatalogo {
    idCatalogo: number;
    precio: number;
    stock: number;
    idProducto: number;
}