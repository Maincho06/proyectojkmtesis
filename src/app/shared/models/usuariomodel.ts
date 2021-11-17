
export interface IDetalleUsuarioModel {
    idDetalleUsuario: number;
    nombre: string;
    apellido: string;
    email: string;
    fechaNacimiento: Date | string | null;

}

export interface IUsuarioModel extends IDetalleUsuarioModel {
    idUsuario: number;
    username: string;
    password: string;
    descripcionRol: string;
    descripcionEstado: string
}

export interface IRegisterUsuario {
    Nombre: string;
    Apellido: string;
    Email: string;
    FechaNacimiento: Date | string;
    Username: string;
    Password: string;
    IdRol: number;
}

export interface IUpdateUsuario{
    IdUsuario: number;
    Nombre: string;
    Apellido: string;
    Email: string;
    FechaNacimiento: Date | string;
    Username: string;
    Password: string;
    IdRol: number;
}

export interface IRol {
    idRol: number;
    descripcion: string;
}