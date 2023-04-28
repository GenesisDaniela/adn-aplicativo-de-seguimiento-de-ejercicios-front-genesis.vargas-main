import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AutenticacionService } from '@auth/shared/servicio/autenticacion.service';
import { HttpService } from '@core/services/http.service';
import { RegistroUsuarioComponent } from './registro-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RespuestaDTO } from '@shared/modelo/respuesta-dto';
import { InicioSesionComponent } from '../inicio-sesion/inicio-sesion.component';
import { ManejadorError } from '@core/interceptor/manejador-error';

describe('RegistroSesionComponent', () => {
  let component: RegistroUsuarioComponent;
  let fixture: ComponentFixture<RegistroUsuarioComponent>;
  let autenticacionService: AutenticacionService;
  const resultadoGuardar: RespuestaDTO = {valor:'1'};

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroUsuarioComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(
          [{path: 'inicio-sesion', component: InicioSesionComponent}, {path: 'registro', component: RegistroUsuarioComponent}]
        ),
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [AutenticacionService, HttpService, ManejadorError],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    autenticacionService = TestBed.inject(AutenticacionService);
    spyOn(autenticacionService, 'guardar').and.returnValue(of(resultadoGuardar));
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.registroForm.valid).toBeFalsy();
  });

  it('Registro de usuario', () => {
    expect(component.registroForm.valid).toBeFalsy();
    component.registroForm.controls.correo.setValue('genesisdvargas4@gmail.com');
    component.registroForm.controls.contrasenia.setValue('12345678910');
    component.registroForm.controls.nombre.setValue('genesis');
    component.registroForm.controls.peso.setValue(45);
    component.registroForm.controls.fechaNacimiento.setValue('2002-05-15');
    component.registrarUsuario();
    expect(component.registroForm.valid).toBeTruthy();

  });
  it('No permite iniciar sesion', () => {
    expect(component.registroForm.valid).toBeFalsy();
    component.registroForm.controls.correo.setValue('');
    component.registroForm.controls.contrasenia.setValue('12345678910');
    component.registroForm.controls.nombre.setValue('genesis');
    component.registroForm.controls.peso.setValue(45);
    component.registroForm.controls.fechaNacimiento.setValue('2002-05-15');
    expect(component.registroForm.valid).toBeFalsy();
  });
});

