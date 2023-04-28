import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { EjercicioService } from './ejercicio.service';

describe('EjercicioService', () => {
  let service: EjercicioService;
  let httpMock: HttpTestingController;
  const apiEndpointEjercicioConsulta = `${environment.endpoint}ejercicio`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EjercicioService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(EjercicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia listar ejercicios', () => {
    const dummyEjercicios = [
      {
        'nombre': 'martillo',
        'seccionCuerpo': 'bicpes'
      },
      {
        'nombre': 'copa',
        'seccionCuerpo': 'triceps'
      }
    ];
    service.consultar().subscribe(ejercicios => {
      expect(ejercicios.length).toBe(2);
      expect(ejercicios).toEqual(dummyEjercicios);
    });

    const req = httpMock.expectOne(apiEndpointEjercicioConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyEjercicios);
  });
});
