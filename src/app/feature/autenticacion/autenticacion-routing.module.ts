import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'inicio-sesion',
      component: InicioSesionComponent
    },
    {
      path: '',
      component: InicioSesionComponent
    },
    {
      path: 'registro',
      component: RegistroUsuarioComponent
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutenticacionRoutingModule { }
