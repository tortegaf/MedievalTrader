import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Jugador } from '../../../model/jugador.model';
import { Ruta } from '../../../model/ruta.model';
import { RutasService } from '../../../services/rutas.service';
import { HttpClient } from '@angular/common/http';
import { SesionService } from '../../../services/sesion.service';

@Component({
  selector: 'app-viajar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './viajar.component.html'
})
export class ViajarComponent implements OnInit {
  ciudadActual = { nombre: 'Ciudad Desconocida' };
  rutasDisponibles: Ruta[] = [];
  jugador: Jugador | null = null;

  constructor(
    private rutasService: RutasService,
    private http: HttpClient,
    private router: Router,
    private sesionService: SesionService
  ) {}

  ngOnInit(): void {
    this.jugador = this.sesionService.obtenerJugador();

    if (this.jugador && this.jugador.ciudad) {
      this.ciudadActual = this.jugador.ciudad;

      const ciudadId = this.jugador.ciudad.id;
      if (ciudadId != null) {
        this.rutasService.listarRutas().subscribe((rutas) => {
          this.rutasDisponibles = rutas.filter(ruta =>
            ruta.ciudadOrigen?.id === ciudadId
          );
        });
      }
    }
  }

  viajar(ruta: Ruta): void {
    if (!this.jugador || !ruta.ciudadDestino?.id) return;

    const url = `http://localhost:8080/api/jugadores/${this.jugador.id}/viajar`;
    const body = { ciudadId: ruta.ciudadDestino.id };

    this.http.put<Jugador>(url, body).subscribe((jugadorActualizado) => {
      this.sesionService.actualizarJugador(jugadorActualizado);

      alert(`¡Viajaste con éxito a ${ruta.ciudadDestino?.nombre}! 🏰`);

      this.router.navigate(['/juego/ciudad']);
    });
  }
}
