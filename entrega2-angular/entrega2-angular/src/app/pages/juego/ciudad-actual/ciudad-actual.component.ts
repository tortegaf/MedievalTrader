import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ciudad } from '../../../model/ciudad.model';
import { CiudadesService } from '../../../services/ciudades.service'; 
import { Jugador } from '../../../model/jugador.model';
import { JugadoresService } from '../../../services/jugadores.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { SesionService } from '../../../services/sesion.service'; 

@Component({
  selector: 'app-ciudad-actual',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ciudad-actual.component.html'
})
export class CiudadActualComponent implements OnInit {
  jugador: Jugador | null = null;
  ciudades: Ciudad[] = [];
  ciudadSeleccionadaId: number | null = null;

  constructor(
    private ciudadService: CiudadesService, 
    private jugadoresService: JugadoresService,
    private sesionService: SesionService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    const guardado = this.sesionService.obtenerJugador(); 
    if (guardado?.id) {
      this.jugadoresService.obtenerJugadorPorId(guardado.id).subscribe((jugador: Jugador) => {
        this.jugador = jugador;
        this.ciudadSeleccionadaId = jugador?.ciudad?.id ?? null;
        this.sesionService.actualizarJugador(jugador); 
      });
    }

    this.ciudadService.listarCiudades().subscribe((data: Ciudad[]) => {
      this.ciudades = data;
    });
  }

  asignarCiudad(): void {
    if (!this.jugador || !this.ciudadSeleccionadaId) return;

    this.jugadoresService
      .viajar(this.jugador.id!, this.ciudadSeleccionadaId)
      .subscribe(actualizado => {
        this.jugador = actualizado;
        this.ciudadSeleccionadaId = actualizado.ciudad?.id ?? null;
        this.sesionService.actualizarJugador(actualizado); 
        alert('Ciudad asignada correctamente');
      });
  }

  cerrarSesion(): void {
    this.sesionService.limpiarSesion();
    this.jugador = null;
    this.router.navigate(['/dashboard']); 
  }
}
