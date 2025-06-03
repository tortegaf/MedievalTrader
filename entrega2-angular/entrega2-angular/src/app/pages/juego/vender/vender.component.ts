import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Jugador } from '../../../model/jugador.model';
import { Producto } from '../../../model/producto.model';
import { JugadoresService } from '../../../services/jugadores.service';
import { SesionService } from '../../../services/sesion.service';

@Component({
  selector: 'app-vender',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vender.component.html'
})
export class VenderComponent implements OnInit {
  jugador: Jugador | null = null;
  inventario: Producto[] = [];

  constructor(
    private jugadoresService: JugadoresService,
    private sesionService: SesionService
  ) {}

  ngOnInit(): void {
    this.jugador = this.sesionService.obtenerJugador();

    if (this.jugador) {
      this.inventario = this.jugador.inventario ?? [];
    }
  }

  vender(producto: Producto): void {
    if (!this.jugador) return;

    this.jugadoresService.venderProducto(this.jugador.id!, producto.id!).subscribe({
      next: (jugadorActualizado: Jugador) => {
        this.jugador = jugadorActualizado;
        this.inventario = jugadorActualizado.inventario ?? [];
        this.sesionService.actualizarJugador(jugadorActualizado);
        alert(`💰 Vendiste: ${producto.nombre}`);
      },
      error: () => {
        alert('❌ No se pudo vender el producto');
      }
    });
  }
}
