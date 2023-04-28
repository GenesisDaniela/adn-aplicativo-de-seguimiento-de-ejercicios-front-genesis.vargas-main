import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { RespuestaDTO } from '@shared/modelo/respuesta-dto';
import { environment } from 'src/environments/environment';
import { PlanService } from './plan.service';

describe('PlanService', () => {
  let service: PlanService;
  let httpMock: HttpTestingController;
  const apiEndpointPlan = `${environment.endpoint}usuario/1/rutina/9/plan`;
  const resultadoGuardarPlan: RespuestaDTO = {valor:'1'};

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlanService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(PlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia registrar plan', () => {
    const dummyPlan =
    {
      'id':1,
      'rutina':9,
      'ejercicio':1,
      'peso':30,
      'series':3,
      'repeticiones':13
    };

    service.guardar(dummyPlan,1).subscribe((respuesta) => {
      expect(respuesta).toEqual(resultadoGuardarPlan);
    });
    const req = httpMock.expectOne(apiEndpointPlan);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<RespuestaDTO>({ body: resultadoGuardarPlan }));
  });
});
