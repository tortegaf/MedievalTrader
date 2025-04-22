import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Jugador } from '../../../model/jugador.model';
import { Producto } from '../../../model/producto.model';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inventario.component.html'
})
export class InventarioComponent implements OnInit {
  jugador: Jugador | null = null;
  inventario: Producto[] = [];

  ngOnInit(): void {
    const jugadorGuardado = sessionStorage.getItem('jugadorSeleccionado');
    if (jugadorGuardado) {
      this.jugador = JSON.parse(jugadorGuardado);
      this.inventario = this.jugador?.inventario ?? [];
    }
  }
}  
