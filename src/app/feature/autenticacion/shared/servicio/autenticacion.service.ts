import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { SesionService } from '@shared/servicios/sesion.service';
import { Usuario } from '../modelo/usuario';
import { RespuestaDTO } from '@shared/modelo/respuesta-dto';

@Injectable()
export class AutenticacionService {
  constructor(protected http: HttpService, protected sessionService: SesionService) {}

  public guardar(usuario: Usuario) {
    return this.http.doPost<Omit<Usuario, 'id_usuario'>, RespuestaDTO>(`${environment.endpoint}usuario`, usuario);
  }

  public iniciarSesion(usuario: Usuario) {
    return this.http.doPost<Omit<Usuario, 'id_usuario'|'nombre'|'peso'|'fechaNacimiento'>, RespuestaDTO>(`${environment.endpoint}usuario/iniciar-sesion`, usuario);
  }

  public obtenerUsuario(idUsuario: number){
    return this.http.doGet(`${environment.endpoint}usuario/${idUsuario}`);
  }
  
}
