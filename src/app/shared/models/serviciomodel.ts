
export interface IServicioModel {
    idServicio: number;
    nombre: string;
    imagen: string;
    descripcion: string;
    isActive: number;
}

export interface IRegisterServicio {
    Nombre: string;
    // Imagen: string;
    Descripcion: string;
}

export interface IUpdateServicio {
    idServicio: number;
    Nombre: string;
    // Imagen: string;
    Descripcion: string;
}