import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from '@auth/shared/servicio/autenticacion.service';
import { ManejadorError } from '@core/interceptor/manejador-error';
import { SesionService } from '@shared/servicios/sesion.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  registroForm: FormGroup;
  idUsuario: number;
  esInformacionCorrecta=-1;

  constructor(protected autenticacionServicio: AutenticacionService, protected sessionService: SesionService, protected router: Router,protected manejadorError: ManejadorError) { }


  ngOnInit(): void {
    this.construirFormularioInicioSesion();
  }

  registrarUsuario(){
    if(this.registroForm.valid){
      this.autenticacionServicio.guardar(this.registroForm.value).subscribe(
        {
          next: ()=>{
            this.esInformacionCorrecta=1;
            this.router.navigate(['/inicio-sesion']);
          },
          error:(error)=>{
            this.esInformacionCorrecta=0;
            this.manejadorError.handleError(error.error.mensaje);
          }
        });
    
    }else{
      this.esInformacionCorrecta=0;
      this.manejadorError.handleError('Los datos son inválidos');
    }
  }

  private construirFormularioInicioSesion() {
    this.registroForm = new FormGroup({
      correo: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      peso: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      contrasenia: new FormControl('', [Validators.required,])
    });
  } 
}

