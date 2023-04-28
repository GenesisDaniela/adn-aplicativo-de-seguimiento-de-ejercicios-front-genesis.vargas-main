import { Plan } from '@plan/shared/model/plan';

export interface Rutina{
  planes: Plan[];
  id: number;
  descripcion: string;
  objetivo: string;
}

