import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Jugador } from '../../../model/jugador.model';
import { Producto } from '../../../model/producto.model';

@Component({
  selector: 'app-vender',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vender.component.html'
})
export class VenderComponent implements OnInit {
  jugador: Jugador | null = null;
  inventario: Producto[] = [];

  ngOnInit(): void {
    const jugadorGuardado = sessionStorage.getItem('jugadorSeleccionado');
    if (jugadorGuardado) {
      this.jugador = JSON.parse(jugadorGuardado);
      this.inventario = this.jugador?.inventario ?? [];
    }
  }

  vender(producto: Producto): void {
    if (!this.jugador) return;

    this.jugador.oro += producto.precio;

    const item = this.jugador.inventario?.find((p: Producto) => p.id === producto.id);

    if (item) {
    item.stock -= 1;

    if (item.stock <= 0) {
    this.jugador.inventario = this.jugador.inventario?.filter((p: Producto) => p.id !== producto.id);
    }
  }


    sessionStorage.setItem('jugadorSeleccionado', JSON.stringify(this.jugador));
    this.inventario = this.jugador.inventario ?? [];

    alert(`💰 Vendiste: ${producto.nombre}`);
  }
}
