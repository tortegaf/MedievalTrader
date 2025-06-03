import { Ciudad } from './ciudad.model';
import { Producto } from './producto.model';

export interface Jugador {
  id: number | null;
  nombre: string;
  nivel: number;
  oro: number;
  ciudad?: Ciudad;
  inventario?: Producto[];
  rol: 'CARAVANERO' | 'COMERCIANTE'; 
}
