import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ManejadorError } from '@core/interceptor/manejador-error';
import { PlanService } from '@plan/shared/service/plan.service';
import { Rutina } from '@rutina/shared/modelo/rutina';
import { RutinaService } from '@rutina/shared/servicio/rutina.service';
import { EjercicioService } from '@shared/servicios/ejercicio.service';
import { SesionService } from '@shared/servicios/sesion.service';
import { Observable } from 'rxjs';
import { Ejercicio } from 'src/app/feature/ejercicio/shared/modelo/ejercicio';

const MAXIMO_PLAN=6;

@Component({
  selector: 'app-editar-rutina',
  templateUrl: './editar-rutina.component.html',
  styleUrls: ['./editar-rutina.component.css']
})
export class EditarRutinaComponent implements OnInit {
  rutinaForm: FormGroup;
  idUsuario: number;
  public listaEjercicio: Observable<Ejercicio[]>;
  planForm: FormGroup[]=[];
  idRutina: number;
  totalPlanesActuales: number;
  rutina: Rutina;
  esInformacionCorrecta=-1;


  constructor(protected ejercicioService: EjercicioService,
              protected rutinaServicio: RutinaService, protected sessionService: SesionService,
              protected activatedRoute: ActivatedRoute, protected planService: PlanService,
              protected rutinaService: RutinaService, protected manejadorError: ManejadorError ) { }

  ngOnInit(): void {
    this.rutinaForm = new FormGroup({
      objetivo: new FormControl('', [Validators.required,]),
      descripcion: new FormControl('', [Validators.required,])
    });
    this.listaEjercicio = this.ejercicioService.consultar();
    this.idUsuario = this.sessionService.consultarInformacionUsuario();
    this.idRutina = Number(this.activatedRoute.snapshot.paramMap.get('idRutina'));
    this.consultarPlanes();
  }

  crear() {
    if(this.validarEstado()){
      const planesAgregar = this.planForm.slice(this.totalPlanesActuales,this.planForm.length);
      planesAgregar.forEach(plan=>{
        this.planService.guardar(plan.value,this.idUsuario).subscribe({
          next: () =>{
            this.planForm=[];
            this.consultarPlanes();
          },
          error: (error) => this.manejadorError.handleError(error.error.mensaje)
        });
      });
    }else{
      this.esInformacionCorrecta=0;
      this.manejadorError.handleError('Los datos son inválidos');
      return;
    }

    if(this.rutinaForm.valid){
      this.rutinaServicio.editar(this.rutinaForm.value, this.idUsuario, this.idRutina).subscribe(()=>{
        this.esInformacionCorrecta=1;
      });
    }else{
      this.manejadorError.handleError('Los datos son inválidos');
      this.esInformacionCorrecta=0;
    }
  }

  instanciarFormularioPlan() {
    this.rutina.planes.forEach(plan=>{
      this.planForm.push (new FormGroup({
        peso: new FormControl({value: plan.peso, disabled: true}, [Validators.required]),
        series: new FormControl({value:plan.series, disabled: true}, [Validators.required,]),
        repeticiones: new FormControl({value:plan.series, disabled: true}, [Validators.required,]),
        rutina: new FormControl({value:this.idRutina, disabled: true}, [Validators.required,]),
        ejercicio: new FormControl({value:plan.ejercicio.id, disabled: true}, [Validators.required,])
      })
      );});
  }

  construirFormularioRutina() {
    this.rutinaForm = new FormGroup({
      objetivo: new FormControl(this.rutina.objetivo, [Validators.required,]),
      descripcion: new FormControl(this.rutina.descripcion, [Validators.required,])
    });
  }

  validarEstado(){
    let totalErrors =0;
    this.planForm.forEach((f) => {
      if(f.status==='INVALID'){
        totalErrors++;
      }
    });
    return totalErrors===0;
  }

  eliminarPlan(){
    if(this.planForm.length >1 &&this.planForm.length >this.totalPlanesActuales){
      this.planForm.pop();
    }
  }

  consultarPlanes(){
    this.rutinaService.consultarDetalle(this.idRutina,this.idUsuario).subscribe({
      next: (result) => {
        this.rutina=result;
        this.totalPlanesActuales=result.planes.length;
        this.construirFormularioRutina();
        this.instanciarFormularioPlan();
      }
    });
  }

  construirFormularioPlan() {
    if(this.totalPlanesActuales===MAXIMO_PLAN || this.planForm.length===MAXIMO_PLAN){
      this.esInformacionCorrecta=3;
      return;
    }
    this.planForm.push (new FormGroup({
      peso: new FormControl('', [Validators.required]),
      series: new FormControl('', [Validators.required,]),
      repeticiones: new FormControl('', [Validators.required,]),
      rutina: new FormControl(this.idRutina, [Validators.required,]),
      ejercicio: new FormControl(null, [Validators.required,])
    }));
  }
}
