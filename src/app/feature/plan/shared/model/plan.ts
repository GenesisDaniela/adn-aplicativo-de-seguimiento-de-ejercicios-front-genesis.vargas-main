import { EjercicioDTO } from 'src/app/feature/ejercicio/shared/modelo/ejercicioDTO';

export interface Plan{
  id: number;
  rutina: number;
  ejercicio: EjercicioDTO;
  peso: number;
  series: number;
  repeticiones: number;
}

