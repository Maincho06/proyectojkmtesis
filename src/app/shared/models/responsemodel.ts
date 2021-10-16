export interface IApiResponse {
    mensaje : string,
    errorMsj: string,
    error   : string,
    status  : "SUCCESS" | "ERROR",
    data    : any
}
