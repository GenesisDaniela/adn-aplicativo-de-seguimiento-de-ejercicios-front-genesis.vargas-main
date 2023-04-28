import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AutenticacionService } from '@auth/shared/servicio/autenticacion.service';
import { HttpService } from '@core/services/http.service';
import { RutinaService } from '@rutina/shared/servicio/rutina.service';
import { PlanService } from '@plan/shared/service/plan.service';

import { ListarRutinaComponent } from './listar-rutina.component';
import { ManejadorError } from '@core/interceptor/manejador-error';
import { SesionService } from '@shared/servicios/sesion.service';
import { Rutina } from '@rutina/shared/modelo/rutina';
import { of } from 'rxjs';

describe('ListarRutinaComponent', () => {
  let component: ListarRutinaComponent;
  let fixture: ComponentFixture<ListarRutinaComponent>;
  const detalleRutina: Rutina[] = [{
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
  },

  {
    id: 3,
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
  }

  ];
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarRutinaComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [AutenticacionService,SesionService, HttpService, RutinaService, PlanService, ManejadorError],
    }).compileComponents();
  }));

  beforeEach(() => {
    const manejadorError =new ManejadorError();
    try {
      const sesionService = TestBed.inject(SesionService);
      const rutinaService = TestBed.inject(RutinaService);
      spyOn(sesionService, 'consultarInformacionUsuario').and.returnValue(1);
      spyOn(rutinaService, 'consultar').and.returnValue(of(detalleRutina));
      fixture = TestBed.createComponent(ListarRutinaComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }catch (error) {
      manejadorError.handleError(error);
    }
  });



  afterAll(()=>{
    const manejadorError =new ManejadorError();
    manejadorError.handleError('Error listar rutina');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.listaRutinas.subscribe(resultado => {
      expect(2).toBe(resultado.length);
    });
  });
});
