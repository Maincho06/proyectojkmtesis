export interface IApiResponse {
    mensaje : string,
    errorMsj: string,
    error   : string,
    status  : "SUCCESS" | "ERROR",
    data    : any
}

export interface IApiResponseModelGet <T> {

    data: T[];
    totalRows: number;
}
