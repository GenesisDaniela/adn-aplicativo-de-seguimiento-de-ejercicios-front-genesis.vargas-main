import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from '@auth/shared/servicio/autenticacion.service';
import { ManejadorError } from '@core/interceptor/manejador-error';
import { SesionService } from '@shared/servicios/sesion.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  loginForm: FormGroup;
  idUsuario: number;
  esInformacionCorrecta=-1;

  constructor(protected autenticacionServicio: AutenticacionService, protected sessionService: SesionService, protected router: Router,protected manejadorError: ManejadorError) { }

  ngOnInit(): void {
    this.construirFormularioInicioSesion();
  }

  iniciarSesion() {
    if(this.loginForm.valid){
      this.autenticacionServicio.iniciarSesion(this.loginForm.value).subscribe({
        next: (result)=>{
          this.esInformacionCorrecta=1;
          this.sessionService.guardarSesion(result.valor);
          this.router.navigate(['/home']);
        },
        error:(error)=>{
          this.esInformacionCorrecta=0;
          this.manejadorError.handleError(error.error.mensaje);
        }
      });
    }else{
      this.esInformacionCorrecta=0;
      this.manejadorError.handleError('la informacion es incorrecta');

    }
  }

  private construirFormularioInicioSesion() {
    this.loginForm = new FormGroup({
      correo: new FormControl('', [Validators.required]),
      contrasenia: new FormControl('', [Validators.required,])
    });
  }

}
