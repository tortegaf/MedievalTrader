import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JugadoresService } from '../../../services/jugadores.service';
import { Jugador } from '../../../model/jugador.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  jugadores: Jugador[] = [];
  jugadorSeleccionado: Jugador | null = null;

  constructor(
    private jugadorService: JugadoresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jugadorService.getJugadores().subscribe(jugadores => {
      this.jugadores = jugadores;
    });
  }

  login(): void {
    if (this.jugadorSeleccionado) {
      localStorage.setItem('jugadorLogueado', JSON.stringify(this.jugadorSeleccionado));
      this.router.navigate(['/']); // O cambia esta ruta al home del juego
    }
  }
}
