import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManejadorError } from '@core/interceptor/manejador-error';
import { Plan } from '@plan/shared/model/plan';
import { RutinaService } from '@rutina/shared/servicio/rutina.service';
import { EjercicioService } from '@shared/servicios/ejercicio.service';
import { SesionService } from '@shared/servicios/sesion.service';
import { Observable } from 'rxjs';
import { Ejercicio } from 'src/app/feature/ejercicio/shared/modelo/ejercicio';
import { PlanService } from '../../../shared/service/plan.service';

const MAXIMO_PLAN=6;

@Component({
  selector: 'app-crear-plan',
  templateUrl: './crear-plan.component.html',
  styleUrls: ['./crear-plan.component.css']
})
export class CrearPlanComponent implements OnInit {

  public listaEjercicio: Observable<Ejercicio[]>;
  planForm: FormGroup[]=[];
  idRutina: number;
  idUsuario: number;
  planes: Plan[] = [];
  totalPlanesActuales: number;
  esInformacionCorrecta=-1;

  constructor(protected ejServ: EjercicioService,
              protected session: SesionService, protected aRoute: ActivatedRoute,
              protected plaServ: PlanService, protected rutServ: RutinaService, 
              protected router: Router, protected manError: ManejadorError) {}

  ngOnInit(): void {
    this.listaEjercicio = this.ejServ.consultar();
    this.idRutina = Number(this.aRoute.snapshot.paramMap.get('idRutina'));
    this.idUsuario = this.session.consultarInformacionUsuario();
    this.construirFormularioPlan();
    this.consultarPlanes();
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
  
  crear() {
    if(this.validarEstado()){
      this.planForm.forEach(f => {
        this.plaServ.guardar(f.value, this.idUsuario).subscribe(
          {
            next: ()=>{
              this.esInformacionCorrecta=1;
              this.router.navigate(['/rutina/detalle/',this.idRutina]);
            },
            error:(error)=>{
              this.esInformacionCorrecta=0;
              this.manError.handleError(error.error.mensaje);
            }
          });
      });
    }else{
      this.esInformacionCorrecta=0;
      this.manError.handleError('Datos incorrectos');
    }
  }

  eliminarPlan(){
    if(this.planForm.length >1){
      this.planForm.pop();
    }
  }

  consultarPlanes(){
    this.rutServ.consultarDetalle(this.idRutina,this.idUsuario).subscribe(result=>{
      this.totalPlanesActuales=result.planes.length;
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
