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
    return this.http.get<Jugador[]>(this.apiUrl);
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
}
