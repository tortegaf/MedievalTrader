import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JugadoresService } from '../../../services/jugadores.service';
import { Jugador } from '../../../model/jugador.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-formulario-jugador',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './formulario.component.html'
})
export class FormularioComponent {
  jugador: Jugador = {
    id: null,
    nombre: '',
    nivel: 0,
    oro: 0,
    rol: 'COMERCIANTE' 
  };

  constructor(
    private jugadorService: JugadoresService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.cargarJugador(+id);
    }
  }

  guardarJugador() {
    this.jugadorService.guardarJugador(this.jugador).subscribe(() => {
      this.router.navigate(['/jugadores/lista']);
    });
  }

  cargarJugador(id: number) {
    this.jugadorService.obtenerJugadorPorId(id).subscribe((data) => {
      this.jugador = data;
    });
  }
}
