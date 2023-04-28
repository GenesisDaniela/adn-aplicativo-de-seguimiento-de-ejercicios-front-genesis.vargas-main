import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AutenticacionService } from '@auth/shared/servicio/autenticacion.service';
import { ManejadorError } from '@core/interceptor/manejador-error';
import { HttpService } from '@core/services/http.service';
import { PlanService } from '@plan/shared/service/plan.service';
import { Rutina } from '@rutina/shared/modelo/rutina';
import { RutinaService } from '@rutina/shared/servicio/rutina.service';
import { of } from 'rxjs';

import { DetalleRutinaComponent } from './detalle-rutina.component';

describe('DetalleRutinaComponent', () => {
  let component: DetalleRutinaComponent;
  let fixture: ComponentFixture<DetalleRutinaComponent>;
  let detalleRutina: Rutina = {
    id: 2,
    descripcion: "chevere",
    objetivo: "salud",
    planes: [
      {
        id:2799,
        rutina: 2,
        ejercicio: {
          id: 1,
          nombre: "martillo",
          seccionCuerpo: "bicpes"
        },
        peso: 11,
        series: 11,
        repeticiones: 11
      }
    ]
  }
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRutinaComponent ],
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
    fixture = TestBed.createComponent(DetalleRutinaComponent);
    let rutinaService = TestBed.inject(RutinaService);
    spyOn(rutinaService, 'consultarDetalle').and.returnValue(of(detalleRutina));

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.planes.length).toBe(1);
  });

 
});
