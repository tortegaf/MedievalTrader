import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Jugador } from '../../../model/jugador.model';
import { Producto } from '../../../model/producto.model';
import { SesionService } from '../../../services/sesion.service';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inventario.component.html'
})
export class InventarioComponent implements OnInit {
  jugador: Jugador | null = null;
  inventario: Producto[] = [];

  constructor(private sesionService: SesionService) {}

  ngOnInit(): void {
    this.jugador = this.sesionService.obtenerJugador();

    if (this.jugador) {
      this.inventario = this.jugador.inventario ?? [];
    }
  }
}
