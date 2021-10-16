import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { toast } from '@utils/toast';
import { MessageService } from "primeng/api";
import { getState, TOKEN_KEY } from '@utils/storage';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private _messageService: MessageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = getState(TOKEN_KEY);

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        this.validacionCodigos(err);
        return throwError(err);

      })
    );
  }

  validacionCodigos(err: HttpErrorResponse): void {
    let error = err.error;
    let respuesta: string;
    switch (err.status) {
      case 400:
        error = error.errors;
        respuesta = Object.values(error)[0][0];
        break;
      case 401: 
        respuesta = "Token Invalido";
        break;
      case 500:
        error = error.Message;
        respuesta = "Ocurrio un Error";
        break;
      case 502:
        error = error.Message;
        respuesta = error;
        break;
      default:
        respuesta = "Ocurrio un Error";
        break;
    }
    // Mostrar el snackbar
    toast({
      title: "Error",
      message: respuesta,
      type: "error",
      messageService: this._messageService
    });
  }



}