import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { JugadoresService } from '../../../services/jugadores.service';
import { Jugador } from '../../../model/jugador.model';

@Component({
  selector: 'app-seleccionar-jugador',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seleccionar-jugador.component.html'
})
export class SeleccionarJugadorComponent implements OnInit {
  jugadores: Jugador[] = [];
  jugadorSeleccionado: Jugador | null = null;

  constructor(
    private jugadoresService: JugadoresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jugadoresService.listarJugadores().subscribe((data: Jugador[]) => {
      this.jugadores = data;
    });
  }

  seleccionar(jugador: Jugador): void {
    this.jugadorSeleccionado = jugador;
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('jugadorSeleccionado', JSON.stringify(jugador));
    }
  }

  continuar(): void {
    this.router.navigate(['/juego/ciudad']);
  }
}
