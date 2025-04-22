import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Jugador } from '../../../model/jugador.model';
import { Ciudad } from '../../../model/ciudad.model';

@Component({
  selector: 'app-ciudad-actual',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ciudad-actual.component.html'
})
export class CiudadActualComponent implements OnInit {
  jugador: Jugador | null = null;
  ciudad: Ciudad = { id: 1, nombre: 'Ciudad Desconocida', impuestos: 0 };

  ngOnInit(): void {
    const jugadorGuardado = sessionStorage.getItem('jugadorSeleccionado');

    if (jugadorGuardado) {
      const jugadorParseado: Jugador = JSON.parse(jugadorGuardado);
      this.jugador = jugadorParseado;

      // Si el jugador tiene una ciudad, la usamos; si no, dejamos la default
      if (this.jugador.ciudad) {
        this.ciudad = this.jugador.ciudad;
      }
    }
  }
}
