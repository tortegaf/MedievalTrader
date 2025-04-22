import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ciudad } from '../../../model/ciudad.model';
import { CiudadesService } from '../../../services/ciudades.service'; 
import { Jugador } from '../../../model/jugador.model';
import { JugadoresService } from '../../../services/jugadores.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
    private jugadoresService: JugadoresService
  ) {}

  ngOnInit(): void {
    const guardado = sessionStorage.getItem('jugadorSeleccionado');
    if (guardado) {
      this.jugador = JSON.parse(guardado);
      this.ciudadSeleccionadaId = this.jugador?.ciudad?.id ?? null;
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
        sessionStorage.setItem('jugadorSeleccionado', JSON.stringify(actualizado));
        this.jugador = actualizado;
        alert('Ciudad asignada correctamente');
      });
  }
}
