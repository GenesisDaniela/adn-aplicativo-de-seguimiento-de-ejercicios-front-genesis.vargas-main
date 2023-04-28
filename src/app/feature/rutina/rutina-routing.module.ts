import { DetalleRutinaComponent } from './componentes/detalle-rutina/detalle-rutina/detalle-rutina.component';
import { ListarRutinaComponent } from './componentes/listar-rutina/listar-rutina/listar-rutina.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearRutinaComponent } from './componentes/crear-rutina/crear-rutina.component';
import { CrearPlanComponent } from '../plan/componentes/crear-plan/crear-plan/crear-plan.component';
import { EditarRutinaComponent } from './componentes/editar-rutina/editar-rutina.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'listar',
      component: ListarRutinaComponent
    },
    {
      path:'detalle/:idRutina',
      component:DetalleRutinaComponent
    },
    {
      path:'crear',
      component:CrearRutinaComponent
    },
    {
      path:'editar/:idRutina',
      component:EditarRutinaComponent
    },
    {
      path:'plan/:idRutina',
      loadChildren: () => import('@plan/plan.module').then(mod => mod.PlanModule),
      component:CrearPlanComponent
    }
  ]
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RutinaRoutingModule { }
