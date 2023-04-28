import { Component, OnInit } from '@angular/core';
import { RutinaService } from '../../../shared/servicio/rutina.service';
import { Observable } from 'rxjs';
import { SesionService } from '@shared/servicios/sesion.service';
import { Rutina } from '../../../shared/modelo/rutina';

@Component({
  selector: 'app-listar-rutina',
  templateUrl: './listar-rutina.component.html',
  styleUrls: ['./listar-rutina.component.css']
})
export class ListarRutinaComponent implements OnInit {
  public listaRutinas: Observable<Rutina[]>;
  public idUsuario: number;

  constructor(protected rutinaService: RutinaService, protected sesionService: SesionService) {}

  ngOnInit(): void {
    this.idUsuario = this.sesionService.consultarInformacionUsuario();
    this.listaRutinas = this.rutinaService.consultar(this.idUsuario);
  }

}
