import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { RespuestaDTO } from '@shared/modelo/respuesta-dto';
import { environment } from 'src/environments/environment';

interface Plan{
  id: number;
  rutina: number;
  ejercicio: number;
  peso: number;
  series: number;
  repeticiones: number;
}
@Injectable()
export class PlanService {
  constructor(protected http: HttpService) { }

  public guardar(plan: Plan, idUsuario: number) {
    return this.http.doPost<Plan, RespuestaDTO>(`${environment.endpoint}usuario/${idUsuario}/rutina/${plan.rutina}/plan`, plan);
  }
}
