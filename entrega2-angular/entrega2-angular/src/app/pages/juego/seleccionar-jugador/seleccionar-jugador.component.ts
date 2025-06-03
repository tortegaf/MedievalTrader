import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { JugadoresService } from '../../../services/jugadores.service';
import { Jugador } from '../../../model/jugador.model';
import { SesionService } from '../../../services/sesion.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seleccionar-jugador',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './seleccionar-jugador.component.html'
})
export class SeleccionarJugadorComponent implements OnInit {
  jugadores: Jugador[] = [];
  jugadorSeleccionado: Jugador | null = null;

  constructor(
    private jugadoresService: JugadoresService,
    private router: Router,
    private sesionService: SesionService
  ) {}

  ngOnInit(): void {
    this.jugadoresService.listarJugadores().subscribe((data: Jugador[]) => {
      this.jugadores = data;
    });
  }

  seleccionar(jugador: Jugador): void {
    this.jugadorSeleccionado = jugador;

    // Guardar el cambio de rol en backend
    this.jugadoresService.guardarJugador(jugador).subscribe(() => {
      this.sesionService.actualizarJugador(jugador);
    });
  }

  continuar(): void {
    if (this.jugadorSeleccionado) {
      this.router.navigate(['/juego/ciudad']);
    }
  }
}
