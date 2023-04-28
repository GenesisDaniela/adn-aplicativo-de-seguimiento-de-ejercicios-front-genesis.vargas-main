import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManejadorError } from '@core/interceptor/manejador-error';
import { RutinaService } from '@rutina/shared/servicio/rutina.service';
import { SesionService } from '@shared/servicios/sesion.service';

@Component({
  selector: 'app-crear-rutina',
  templateUrl: './crear-rutina.component.html',
  styleUrls: ['./crear-rutina.component.css']
})
export class CrearRutinaComponent implements OnInit {
  
  rutinaForm: FormGroup;
  idUsuario: number;
  esInformacionCorrecta=-1;

  constructor(protected rutinaServicio: RutinaService, protected sessionService: SesionService, protected router: Router, protected manejadorError: ManejadorError) { }

  ngOnInit(): void {
    this.idUsuario = this.sessionService.consultarInformacionUsuario();
    this.construirFormularioRutina();
  }

  crear() {
    if(this.rutinaForm.valid){
      this.rutinaServicio.guardar(this.rutinaForm.value, this.idUsuario).subscribe(
        {
          next: (respuesta)=>{
            this.esInformacionCorrecta=1;
            this.router.navigate([`/rutina/plan/${respuesta.valor}`]);
          },
          error:(error)=>{
            this.manejadorError.handleError(error.error.mensaje);
          }
        }
      );
    }else{
      this.esInformacionCorrecta=0;
      this.manejadorError.handleError('Los datos son inválidos');
    }

  }

  private construirFormularioRutina() {
    this.rutinaForm = new FormGroup({
      descripcion: new FormControl('', [Validators.required]),
      objetivo: new FormControl('', [Validators.required,])
    });
  }

}
