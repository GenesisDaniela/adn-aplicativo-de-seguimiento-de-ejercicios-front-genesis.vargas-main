import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { RespuestaDTO } from '@shared/modelo/respuesta-dto';
import { environment } from 'src/environments/environment';

import { AutenticacionService } from './autenticacion.service';

describe('AutenticacionService', () => {
  let service: AutenticacionService;
  let httpMock: HttpTestingController;
  const resultadoGuardarUsuario: RespuestaDTO = {valor:'1'};
  const apiEndpointRegistro = `${environment.endpoint}usuario`;
  const apiEndpointInicioSesion = `${environment.endpoint}usuario/iniciar-sesion`;


  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService, AutenticacionService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(AutenticacionService);
  });

  it('deberia registrar usuario', () => {
    const dummyUsuario =
      {
        'id_usuario':5,
        'nombre': 'genesis',
        'peso': 64,
        'correo': 'genesis@gmail.com',
        'contrasenia': '12345678910',
        'fechaNacimiento': new Date('2002-05-15')
      };
    service.guardar(dummyUsuario).subscribe((respuesta) => {
      expect(respuesta).toEqual(resultadoGuardarUsuario);
    });
    const req = httpMock.expectOne(apiEndpointRegistro);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<RespuestaDTO>({ body: resultadoGuardarUsuario }));
  });

  it('deberia iniciar sesion usuario', () => {
    const dummyUsuario =
      {
        'id_usuario':5,
        'nombre': 'genesis',
        'peso': 64,
        'correo': 'genesisdvargas4@gmail.com',
        'contrasenia': '12345678910',
        'fechaNacimiento': new Date('2002-05-15')
      };
    service.iniciarSesion(dummyUsuario).subscribe((respuesta) => {
      expect(respuesta).toEqual(resultadoGuardarUsuario);
    });
    const req = httpMock.expectOne(apiEndpointInicioSesion);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<RespuestaDTO>({ body: resultadoGuardarUsuario }));
  });

  
});
