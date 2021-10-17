export interface IClienteModel {
    idCliente: number;
    ruc: string;
    razonSocial: string;
    telefono: string;
}

export interface IRegisterCliente {
    RUC: string;
    RazonSocial: string;
    Telefono: string;
}

export interface IUpdateCliente {
    IdCliente: number;
    RUC: string;
    RazonSocial: string;
    Telefono: string;
}