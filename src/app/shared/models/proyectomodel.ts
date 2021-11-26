import { Identifier } from "./identifiermodel";

export interface ProyectoModel {
    IdProyecto: number;
    IdCotizacion: number | null;
    NombreProyecto: string;
    Descripcion: string;
    RazonSocial: string;
    Ruc: string;
    IdCliente: number | null;
    Precio: number | null;
    FechaInicio: Date | string | null;
    IdEstado: number;
    DescripcionEstado: string;
}


export interface IProyectoModel {
    idProyecto: number;
    idCotizacion: number | null;
    nombreProyecto: string;
    descripcion: string;
    razonSocial: string;
    ruc: string;
    idCliente: number | null;
    precio: number | null;
    fechaInicio: Date | string | null;
    fechaFin: Date | string | null;
    estado: Identifier;
    porcentajeTareasFinalizadas: number | null;

}

export interface ActividadProyectoModel {
    idActividad: number;
    descripcion: string;
    fechaInicio: Date | string | null;
    fechaFin: Date | string | null;
    peso: number;
    prioridad: string
    idPadre: number | null;
    idHermano: number | null;
    estado: Identifier;
    profundidad: number;
}

export interface ActividadProyectoTreeNode {
    data: ActividadProyectoModel;
    children: ActividadProyectoTreeNode[] | null;
}

export interface UpdateActividadByProyecto {
    IdProyecto: number;
    IdActividad: number;
    Descripcion: string;
    FechaInicio: Date | string | null;
    FechaFin: Date | string | null;
    Peso: number;
    IdPadre: number | null;
    IdHermano: number | null;
    IdEstado: number;
}

export interface UpdateProyecto {
    IdProyecto: number;
    NombreProyecto: string;
    FechaInicio: Date | string | null;
    FechaFin: Date | string | null;
    Descripcion: string;
    IdEstado: number;
    Precio: number;
}

export interface RegisterTrabajadorByProyecto {
    IdProyecto: number;
    IdTrabajador: number;
}

export interface TrabajadorProyectoModel {
    idTrabajador: number;
    idTipoTrabajador: number;
    descripcionTipo: string;
    tipo: Identifier;
    nombre: string;
    apellido: string;
    fechaNacimiento: Date | string | null;
}