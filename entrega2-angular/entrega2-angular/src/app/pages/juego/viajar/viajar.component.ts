import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Jugador } from '../../../model/jugador.model';
import { Ruta } from '../../../model/ruta.model';

@Component({
  selector: 'app-viajar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './viajar.component.html'
})
export class ViajarComponent implements OnInit {
  ciudadActual = { nombre: 'Ciudad Desconocida' };
  rutasDisponibles: Ruta[] = [];

  ngOnInit(): void {
    const jugadorGuardado = sessionStorage.getItem('jugadorSeleccionado');
    if (jugadorGuardado) {
      const jugador: Jugador = JSON.parse(jugadorGuardado);
      this.ciudadActual = jugador['ciudad'] ?? { nombre: 'Ciudad Desconocida' };

      this.rutasDisponibles = [
        { id: 1, ciudadOrigen: 1, ciudadDestino: 2, tipoRuta: 'Segura', costo: 10 },
        { id: 2, ciudadOrigen: 1, ciudadDestino: 3, tipoRuta: 'Insegura', costo: 15 }
      ];
    }
  }

  viajar(ruta: Ruta): void {
    alert(`Viajando a ciudad ID ${ruta.ciudadDestino} por una ruta ${ruta.tipoRuta} con costo ${ruta.costo}`);
  }
}
