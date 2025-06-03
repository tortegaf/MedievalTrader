import { Injectable } from '@angular/core';
import { Jugador } from '../model/jugador.model';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  private readonly claveJugador = 'jugadorSeleccionado';

  actualizarJugador(jugador: Jugador): void {
    localStorage.setItem(this.claveJugador, JSON.stringify(jugador));
  }

  obtenerJugador(): Jugador | null {
    const jugador = localStorage.getItem(this.claveJugador);
    return jugador ? JSON.parse(jugador) : null;
  }

  limpiarSesion(): void {
    localStorage.removeItem(this.claveJugador);
  }

  estaActivo(): boolean {
    return localStorage.getItem(this.claveJugador) !== null;
  }
}
