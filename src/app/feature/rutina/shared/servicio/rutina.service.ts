import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Rutina } from '../modelo/rutina';
import { RespuestaDTO } from '@shared/modelo/respuesta-dto';

@Injectable()
export class RutinaService {

  constructor(protected http: HttpService) { }

  public consultar(idUsuario: number) {
    return this.http.doGet(`${environment.endpoint}usuario/${idUsuario}/rutina`)
      .pipe(map((response: Rutina[]) => response));
  }

  public guardar(rutina: Rutina, idUsuario: number) {
    return this.http.doPost<Omit<Rutina, 'id' | 'planes'>, RespuestaDTO>(`${environment.endpoint}usuario/${idUsuario}/rutina`, rutina);
  }

  public editar(rutina: Rutina, idUsuario: number, idRutina: number) {
    return this.http.doPut<Omit<Rutina, 'id' | 'planes'>, RespuestaDTO>(`${environment.endpoint}usuario/${idUsuario}/rutina/${idRutina}`, rutina);
  }

  public consultarDetalle(idRutina: number, idUsuario: number) {
    return this.http.doGet(`${environment.endpoint}usuario/${idUsuario}/rutina/${idRutina}`).pipe(map((response: Rutina) => response));
  }
}
