import { HomeComponent } from '@home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';

const routes: Routes = [
  { path: 'rutina', loadChildren: () => import('@rutina/rutina.module').then(mod => mod.RutinaModule),canActivate: [SecurityGuard] },
  {path:'',loadChildren: () => import('@auth/autenticacion.module').then(mod => mod.AutenticacionModule)},
  { path: 'home', component: HomeComponent, canActivate: [SecurityGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
