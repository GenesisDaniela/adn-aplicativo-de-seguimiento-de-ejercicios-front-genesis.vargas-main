import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario.component';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { AutenticacionService } from './shared/servicio/autenticacion.service';



@NgModule({
  declarations: [
    InicioSesionComponent,
    RegistroUsuarioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AutenticacionRoutingModule,
  ],
  providers: [AutenticacionService]
})
export class AutenticacionModule { }
