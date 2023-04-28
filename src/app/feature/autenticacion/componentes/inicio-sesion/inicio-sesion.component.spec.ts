import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AutenticacionService } from '@auth/shared/servicio/autenticacion.service';
import { ManejadorError } from '@core/interceptor/manejador-error';
import { HttpService } from '@core/services/http.service';
import { HomeComponent } from '@home/home.component';
import { RespuestaDTO } from '@shared/modelo/respuesta-dto';
import { of } from 'rxjs';

import { InicioSesionComponent } from './inicio-sesion.component';

describe('InicioSesionComponent', () => {
  let component: InicioSesionComponent;
  let fixture: ComponentFixture<InicioSesionComponent>;
  let autenticacionService: AutenticacionService;
  const resultadoIniciarSesion: RespuestaDTO = {valor:'1'};

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioSesionComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(
          [{path: 'home', component: HomeComponent}, {path: '', component: InicioSesionComponent}]
        ),
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [AutenticacionService, HttpService, ManejadorError],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    autenticacionService = TestBed.inject(AutenticacionService);
    spyOn(autenticacionService, 'iniciarSesion').and.returnValue(of(resultadoIniciarSesion));
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('Iniciando sesion', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls.correo.setValue('genesisdvargas4@gmail.com');
    component.loginForm.controls.contrasenia.setValue('12345678910');
    expect(component.loginForm.valid).toBeTruthy();
    component.iniciarSesion();
  });
  it('No permite iniciar sesion contrasenia obligatoria', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls.correo.setValue('genesisdvargas4@gmail.com');
    expect(component.loginForm.valid).toBeFalsy();
    component.iniciarSesion();
  
  });
  it('No permite iniciar sesion correo obligatoria', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls.contrasenia.setValue('12345678910');
    expect(component.loginForm.valid).toBeFalsy();
    component.iniciarSesion();
  });
});

