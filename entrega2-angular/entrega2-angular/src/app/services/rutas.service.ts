import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ruta } from '../model/ruta.model';

@Injectable({
  providedIn: 'root'
})
export class RutasService {
  private apiUrl = 'http://localhost:8080/api/rutas';

  constructor(private http: HttpClient) {}

  listarRutas(): Observable<Ruta[]> {
    return this.http.get<Ruta[]>(this.apiUrl);
  }

  guardarRuta(ruta: Ruta): Observable<Ruta> {
    return this.http.post<Ruta>(this.apiUrl, ruta);
  }

  obtenerRutaPorId(id: number): Observable<Ruta> {
    return this.http.get<Ruta>(`${this.apiUrl}/${id}`);
  }

  eliminarRuta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
