import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AutenticacionService } from '@auth/shared/servicio/autenticacion.service';
import { HttpService } from '@core/services/http.service';
import { RutinaService } from '@rutina/shared/servicio/rutina.service';
import { EditarRutinaComponent } from './editar-rutina.component';
import { PlanService } from '@plan/shared/service/plan.service';
import { RespuestaDTO } from '@shared/modelo/respuesta-dto';
import { of } from 'rxjs';
import { Rutina } from '@rutina/shared/modelo/rutina';
import { EjercicioService } from '@shared/servicios/ejercicio.service';
import { Ejercicio } from 'src/app/feature/ejercicio/shared/modelo/ejercicio';
import { ManejadorError } from '@core/interceptor/manejador-error';

describe('EditarRutinaComponent', () => {
  let component: EditarRutinaComponent;
  let fixture: ComponentFixture<EditarRutinaComponent>;
  const resultadoEditar: RespuestaDTO = {valor:'1'};
  const resultadoGuardar: RespuestaDTO = {valor:'1'};
  const listaEjercicio: Ejercicio[] = [
    {
      'nombre': 'martillo',
      'seccionCuerpo': 'bicpes'
    },
    {
      'nombre': 'copa',
      'seccionCuerpo': 'triceps'
    }
  ];

  const detalleRutina: Rutina = {
    id: 2,
    descripcion: 'chevere',
    objetivo: 'salud',
    planes: [
      {
        id:2799,
        rutina: 2,
        ejercicio: {
          id: 1,
          nombre: 'martillo',
          seccionCuerpo: 'bicpes'
        },
        peso: 11,
        series: 11,
        repeticiones: 11
      }
    ]
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarRutinaComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [AutenticacionService, HttpService, RutinaService, PlanService, ManejadorError],
    }).compileComponents();
  }));

  beforeEach(() => {
    const rutinaService = TestBed.inject(RutinaService);
    const ejercicioService = TestBed.inject(EjercicioService);

    fixture = TestBed.createComponent(EditarRutinaComponent);
    spyOn(rutinaService, 'editar').and.returnValue(of(resultadoEditar));
    spyOn(ejercicioService, 'consultar').and.returnValue(of(listaEjercicio));
    const planService = TestBed.inject(PlanService);
    spyOn(rutinaService, 'consultarDetalle').and.returnValue(of(detalleRutina));
    spyOn(planService, 'guardar').and.returnValue(of(resultadoGuardar));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.construirFormularioPlan();
    component.construirFormularioRutina();
  });
  it('Formulario correcto', () => {
    expect(component.rutinaForm.valid).toBeTruthy();
    component.crear();
  });

  it('No permite editar rutina sin descripcion', () => {
    expect(component.rutinaForm.valid).toBeTruthy();
    component.rutinaForm.controls.descripcion.setValue('');
    component.rutinaForm.controls.objetivo.setValue('Objetivo');
    component.construirFormularioPlan();
    component.crear();
    expect(component.rutinaForm.valid).toBeFalsy();
  });
  it('No permite editar rutina sin Objetivo', () => {
    expect(component.rutinaForm.valid).toBeTruthy();
    component.rutinaForm.controls.objetivo.setValue('');
    component.rutinaForm.controls.descripcion.setValue('Descripcion');
    component.crear();
    expect(component.rutinaForm.valid).toBeFalsy();
  });
  
});
