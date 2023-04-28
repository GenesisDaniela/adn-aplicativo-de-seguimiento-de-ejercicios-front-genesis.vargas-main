import { RutinaRoutingModule } from './rutina-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { CrearRutinaComponent } from './componentes/crear-rutina/crear-rutina.component';
import { NgModule } from '@angular/core';
import { ListarRutinaComponent } from './componentes/listar-rutina/listar-rutina/listar-rutina.component';
import { DetalleRutinaComponent } from './componentes/detalle-rutina/detalle-rutina/detalle-rutina.component';
import { RutinaService } from './shared/servicio/rutina.service';
import { PlanService } from '@plan/shared/service/plan.service';
import { EditarRutinaComponent } from './componentes/editar-rutina/editar-rutina.component';


@NgModule({
  declarations: [
    ListarRutinaComponent,
    DetalleRutinaComponent,
    CrearRutinaComponent,
    EditarRutinaComponent
  ],
  imports: [
    RutinaRoutingModule,
    SharedModule,
  ],
  providers: [RutinaService, PlanService]

})
export class RutinaModule {}