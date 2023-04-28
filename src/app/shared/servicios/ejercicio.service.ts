import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Ejercicio } from 'src/app/feature/ejercicio/shared/modelo/ejercicio';

@Injectable({providedIn: 'root'})
export class EjercicioService {

  constructor(protected http: HttpService) { }

  public consultar() {
    return this.http.doGet(`${environment.endpoint}ejercicio`)
      .pipe(map((response: Ejercicio[]) => response));
  }
}
