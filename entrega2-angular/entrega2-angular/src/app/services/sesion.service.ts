import { Injectable } from '@angular/core';
import { Jugador } from '../model/jugador.model';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  private readonly claveJugador = 'jugadorSeleccionado';

  // Guarda el jugador en localStorage
  actualizarJugador(jugador: Jugador): void {
    localStorage.setItem(this.claveJugador, JSON.stringify(jugador));
  }

  // Obtiene el jugador guardado
  obtenerJugador(): Jugador | null {
    const jugador = localStorage.getItem(this.claveJugador);
    return jugador ? JSON.parse(jugador) : null;
  }

  // Limpia la sesión
  limpiarSesion(): void {
    localStorage.removeItem(this.claveJugador);
  }

  // Verifica si hay sesión activa
  estaActivo(): boolean {
    return localStorage.getItem(this.claveJugador) !== null;
  }
}
