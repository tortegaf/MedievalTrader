import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Jugador } from '../../../model/jugador.model';
import { JugadoresService } from '../../../services/jugadores.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-jugadores',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  jugadores: Jugador[] = [];

  constructor(
    private jugadorService: JugadoresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarJugadores();
  }

  cargarJugadores(): void {
    this.jugadorService.listarJugadores().subscribe((data) => {
      this.jugadores = data;
    });
  }

  eliminarJugador(id: number | null): void {
    if (id && confirm('¿Eliminar este jugador?')) {
      this.jugadorService.eliminarJugador(id).subscribe(() => {
        this.cargarJugadores(); // Refresca la lista después de eliminar
      });
    }
  }

  editarJugador(id: number | null): void {
    if (id) {
      this.router.navigate(['/jugadores/formulario'], {
        queryParams: { id: id }
      });
    }
  }
}
