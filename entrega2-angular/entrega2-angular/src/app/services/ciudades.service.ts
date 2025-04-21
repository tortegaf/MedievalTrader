import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ciudad } from '../model/ciudad.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {
  private apiUrl = 'http://localhost:8080/api/ciudades'; 

  constructor(private http: HttpClient) {}

  guardarCiudad(ciudad: Ciudad): Observable<Ciudad> {
    return this.http.post<Ciudad>(this.apiUrl, ciudad);
  }

  listarCiudades(): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(this.apiUrl);
  }
  
  eliminarCiudad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  obtenerCiudadPorId(id: number): Observable<Ciudad> {
    return this.http.get<Ciudad>(`${this.apiUrl}/${id}`);
  }
  
  
}
