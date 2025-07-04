import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jugador } from '../model/jugador.model';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {
  private apiUrl = 'http://localhost:8080/api/jugadores';

  constructor(private http: HttpClient) {}

  listarJugadores(): Observable<Jugador[]> {
    return this.getJugadores();
  }

  guardarJugador(jugador: Jugador): Observable<Jugador> {
    return this.http.post<Jugador>(this.apiUrl, jugador);
  }

  obtenerJugadorPorId(id: number): Observable<Jugador> {
    return this.http.get<Jugador>(`${this.apiUrl}/${id}`);
  }

  eliminarJugador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  viajar(jugadorId: number, ciudadId: number): Observable<Jugador> {
    return this.http.put<Jugador>(`${this.apiUrl}/${jugadorId}/viajar`, { ciudadId });
  }

  comprarProducto(jugadorId: number, productoId: number): Observable<Jugador> {
    return this.http.post<Jugador>(
      `${this.apiUrl}/${jugadorId}/comprar`,
      { productoId }
    );
  }

  venderProducto(jugadorId: number, productoId: number): Observable<Jugador> {
    return this.http.put<Jugador>(
      `${this.apiUrl}/${jugadorId}/vender`,
      { productoId }
    );
  }

  getJugadores(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(this.apiUrl);
  }
}
