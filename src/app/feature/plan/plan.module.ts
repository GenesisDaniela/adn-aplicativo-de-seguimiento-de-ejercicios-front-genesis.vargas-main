import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearPlanComponent } from './componentes/crear-plan/crear-plan/crear-plan.component';
import { SharedModule } from '@shared/shared.module';
import { PlanService } from './shared/service/plan.service';

@NgModule({
  declarations: [
    CrearPlanComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [PlanService]
})
export class PlanModule { }
