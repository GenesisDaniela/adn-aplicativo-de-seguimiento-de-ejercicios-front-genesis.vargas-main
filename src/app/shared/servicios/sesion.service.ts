import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(protected http: HttpService) { }

  public guardarSesion(id: string): void{
    sessionStorage.setItem('informacionUsuario', id);
  }

  public consultarInformacionUsuario(): number{
    return Number(sessionStorage.getItem('informacionUsuario'));
  }

  public estaLogueado(): boolean{
    return this.consultarInformacionUsuario() !== 0;
  }

  public cerrarSesion(): void{
    return sessionStorage.clear();
  }


}
