import { Ciudad } from './ciudad.model';

export interface Ruta {
  id: number | null;
  ciudadOrigen: Ciudad | null;
  ciudadDestino: Ciudad | null;
  tipoRuta: string;
  costo: number;
}
