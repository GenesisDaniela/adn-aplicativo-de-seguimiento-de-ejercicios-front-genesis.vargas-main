import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ManejadorError } from '@core/interceptor/manejador-error';
import { HttpService } from '@core/services/http.service';
import { PlanService } from '@plan/shared/service/plan.service';
import { Rutina } from '@rutina/shared/modelo/rutina';
import { RutinaService } from '@rutina/shared/servicio/rutina.service';
import { EjercicioService } from '@shared/servicios/ejercicio.service';
import { SesionService } from '@shared/servicios/sesion.service';
import { of } from 'rxjs';
import { Ejercicio } from 'src/app/feature/ejercicio/shared/modelo/ejercicio';

import { CrearPlanComponent } from './crear-plan.component';

describe('CrearPlanComponent', () => {
  let component: CrearPlanComponent;
  let fixture: ComponentFixture<CrearPlanComponent>;
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
      declarations: [ CrearPlanComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(
          [{path: 'rutina/plan/:idRutina', component: CrearPlanComponent}]
        ),
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [SesionService,RutinaService, HttpService, PlanService, ManejadorError],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPlanComponent);
    component = fixture.componentInstance;
    const sesionService = TestBed.inject(SesionService);
    const rutinaService = TestBed.inject(RutinaService);
    const ejercicioService = TestBed.inject(EjercicioService);

    spyOn(sesionService, 'consultarInformacionUsuario').and.returnValue(1);
    spyOn(rutinaService, 'consultarDetalle').and.returnValue(of(detalleRutina));
    spyOn(ejercicioService, 'consultar').and.returnValue(of(listaEjercicio));

    fixture.detectChanges();  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('No permite crear plan', () => {
    expect(component.validarEstado()).toBeFalsy();
  });

  it('Crear plan', () => {
    component.planForm[0].controls.peso.setValue('20');
    component.planForm[0].controls.series.setValue('20');
    component.planForm[0].controls.repeticiones.setValue('20');
    component.planForm[0].controls.ejercicio.setValue('1');
    component.crear();
    expect(component.validarEstado()).toBeTruthy();
  });
  it('No permite Crear plan sin peso', () => {
    component.planForm[0].controls.series.setValue('20');
    component.planForm[0].controls.repeticiones.setValue('20');
    component.planForm[0].controls.ejercicio.setValue('1');
    expect(component.validarEstado()).toBeFalsy();
  });
  it('No permite Crear plan sin series', () => {
    component.planForm[0].controls.peso.setValue('20');
    component.planForm[0].controls.repeticiones.setValue('20');
    component.planForm[0].controls.ejercicio.setValue('1');
    expect(component.validarEstado()).toBeFalsy();
  });

  it('No permite Crear plan sin repeticiones', () => {
    component.planForm[0].controls.peso.setValue('20');
    component.planForm[0].controls.series.setValue('20');
    component.planForm[0].controls.ejercicio.setValue('1');
    expect(component.validarEstado()).toBeFalsy();
  });
  
});
