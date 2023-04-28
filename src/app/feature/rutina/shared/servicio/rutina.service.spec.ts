import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { RutinaService } from '@rutina/shared/servicio/rutina.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { RespuestaDTO } from '@shared/modelo/respuesta-dto';
import { HttpResponse } from '@angular/common/http';
import { ManejadorError } from '@core/interceptor/manejador-error';

describe('RutinaService', () => {
  let httpMock: HttpTestingController;
  let service: RutinaService;
  const apiEndpointRutina = `${environment.endpoint}usuario/1/rutina`;
  const resultadoGuardarRutina: RespuestaDTO = {valor:'1'};

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RutinaService, HttpService, ManejadorError]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(RutinaService);
  });

  afterAll(()=>{
    const manejadorError =new ManejadorError();
    manejadorError.handleError('Error genesis');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia listar rutinas', () => {
    const dummyRutina = [
      {
        'id': 1,
        'descripcion': 'Entrenamiento de fuerza',
        'objetivo': 'fuerza',
        'planes':[]
      },
      {
        'id': 2,
        'descripcion': 'Entrenamiento de agilidad',
        'objetivo': 'agilidad',
        'planes':[]
      },
    ];
    service.consultar(1).subscribe(rutinas => {
      expect(rutinas.length).toBe(2);
      expect(rutinas).toEqual(dummyRutina);
    });

    const req = httpMock.expectOne(apiEndpointRutina);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRutina);
  });

  it('deberia crear una rutina', () => {
    const dummyRutina =
      {
        'id': 1,
        'descripcion': 'Entrenamiento de fuerza',
        'objetivo': 'fuerza',
        'planes':[]
      };
    service.guardar(dummyRutina,1).subscribe((respuesta) => {
      expect(respuesta).toEqual(resultadoGuardarRutina);
    });
    const req = httpMock.expectOne(apiEndpointRutina);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<RespuestaDTO>({ body: resultadoGuardarRutina }));
  });
});
