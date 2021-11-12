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
