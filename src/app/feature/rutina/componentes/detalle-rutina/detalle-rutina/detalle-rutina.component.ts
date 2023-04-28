import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SesionService } from '@shared/servicios/sesion.service';
import { RutinaService } from '../../../shared/servicio/rutina.service';
import { PlanService } from 'src/app/feature/plan/shared/service/plan.service';
import { Rutina } from '../../../shared/modelo/rutina';
import { Plan } from '@plan/shared/model/plan';

@Component({
  selector: 'app-detalle-rutina',
  templateUrl: './detalle-rutina.component.html',
  styleUrls: ['./detalle-rutina.component.css']
})
export class DetalleRutinaComponent implements OnInit {

  idRutina !: number;
  idUsuario: number;
  rutina!: Rutina;
  planes!: Plan[];

  constructor(protected activatedRoute: ActivatedRoute, protected rutinaService: RutinaService, protected sesionService: SesionService, protected planService: PlanService) { }

  ngOnInit(): void {
    this.idRutina = Number(this.activatedRoute.snapshot.paramMap.get('idRutina'));
    this.idUsuario = this.sesionService.consultarInformacionUsuario();
    this.rutinaService.consultarDetalle(this.idRutina, this.idUsuario).subscribe(result=>{
      this.rutina = result;
      this.planes = result.planes;
    });
  }


}
