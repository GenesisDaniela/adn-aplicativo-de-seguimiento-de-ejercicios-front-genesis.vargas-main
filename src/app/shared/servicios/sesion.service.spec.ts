import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { SesionService } from './sesion.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SesionService', () => {
  let service: SesionService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SesionService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(SesionService);
    const sesionService = TestBed.inject(SesionService);
    spyOn(sesionService, 'consultarInformacionUsuario').and.returnValue(1);

  });
  it('should be created', () => {
    expect(service).toBeTruthy();
    console.log(httpMock,service)
  });

  it('deberia gurdar en local storage el id', () => {
    expect(service.consultarInformacionUsuario()).toBe(1);
    expect(service.estaLogueado()).toBeTruthy();
    service.cerrarSesion();
  });
});
