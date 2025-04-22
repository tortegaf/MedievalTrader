import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Jugador } from '../../../model/jugador.model';
import { Producto } from '../../../model/producto.model';

@Component({
  selector: 'app-comprar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './comprar.component.html'
})
export class ComprarComponent implements OnInit {
  jugador: Jugador | null = null;
  productosDisponibles: Producto[] = [];

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      const jugadorGuardado = sessionStorage.getItem('jugadorSeleccionado');
      if (jugadorGuardado) {
        this.jugador = JSON.parse(jugadorGuardado);
      }
    }

    // Productos simulados (mock)
    this.productosDisponibles = [
      { id: 1, nombre: 'Espada', precio: 100, stock: 10 },
      { id: 2, nombre: 'Poción', precio: 50, stock: 20 },
      { id: 3, nombre: 'Mapa antiguo', precio: 75, stock: 5 }
    ];
  }

  comprar(producto: Producto): void {
    if (!this.jugador) return;

    if (this.jugador.oro >= producto.precio) {
      this.jugador.oro -= producto.precio;

      if (!this.jugador.inventario) {
        this.jugador.inventario = [];
      }

      const existente = this.jugador.inventario.find((p: Producto) => p.id === producto.id);
      if (existente) {
        existente.stock += 1;
      } else {
        this.jugador.inventario.push({ ...producto, stock: 1 });
      }

      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('jugadorSeleccionado', JSON.stringify(this.jugador));
      }

      alert(`🛍️ Compraste: ${producto.nombre}`);
    } else {
      alert('💸 No tienes suficiente oro');
    }
  }
}
