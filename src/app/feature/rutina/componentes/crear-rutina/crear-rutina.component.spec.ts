import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearRutinaComponent } from './crear-rutina.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { RutinaService } from '@rutina/shared/servicio/rutina.service';
import { SesionService } from '@shared/servicios/sesion.service';
import { PlanService } from '@plan/shared/service/plan.service';
import { RespuestaDTO } from '@shared/modelo/respuesta-dto';
import { of } from 'rxjs';
import { ManejadorError } from '@core/interceptor/manejador-error';

describe('CrearRutinaComponent', () => {
  let component: CrearRutinaComponent;
  let fixture: ComponentFixture<CrearRutinaComponent>;
  const resultadoIniciarSesion: RespuestaDTO = {valor:'1'};
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearRutinaComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(
          [{path: 'rutina/crear', component: CrearRutinaComponent}]
        ),
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [SesionService,RutinaService, HttpService, PlanService, ManejadorError],
    }).compileComponents();
  }));

  beforeEach(() => {
    const manejadorError =new ManejadorError();
    try {
      const sesionService = TestBed.inject(SesionService);
      spyOn(sesionService, 'consultarInformacionUsuario').and.returnValue(1);
      const rutinaService = TestBed.inject(RutinaService);
      spyOn(rutinaService, 'guardar').and.returnValue(of(resultadoIniciarSesion));
      fixture = TestBed.createComponent(CrearRutinaComponent);
      fixture.detectChanges();
      component = fixture.componentInstance;
      fixture.detectChanges();
    } catch (error) {
      manejadorError.handleError(error);
    }
  },
  
  );
  afterAll(()=>{
    const manejadorError =new ManejadorError();
    manejadorError.handleError('Error crear rutina');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('No permite crear rutina', () => {
    expect(component.rutinaForm.valid).toBeFalsy();
  });

  it('Crear rutina', () => {
    expect(component.rutinaForm.valid).toBeFalsy();
    component.rutinaForm.controls.descripcion.setValue('Descripcion');
    component.rutinaForm.controls.objetivo.setValue('Objetivo');
    expect(component.rutinaForm.valid).toBeTruthy();
    component.crear();
  });

  it('No permite Crear rutina sin descripcion', () => {
    expect(component.rutinaForm.valid).toBeFalsy();
    component.rutinaForm.controls.objetivo.setValue('Objetivo');
    expect(component.rutinaForm.valid).toBeFalsy();
  });
  it('No permite Crear rutina sin Objetivo', () => {
    expect(component.rutinaForm.valid).toBeFalsy();
    component.rutinaForm.controls.descripcion.setValue('Descripcion');
    expect(component.rutinaForm.valid).toBeFalsy();
  });
});
