import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Jugador } from '../../../model/jugador.model';
import { Producto } from '../../../model/producto.model';
import { ProductosService } from '../../../services/productos.service';
import { JugadoresService } from '../../../services/jugadores.service';
import { SesionService } from '../../../services/sesion.service'; 

@Component({
  selector: 'app-comprar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './comprar.component.html'
})
export class ComprarComponent implements OnInit {
  jugador: Jugador | null = null;
  productosDisponibles: Producto[] = [];

  constructor(
    private productosService: ProductosService,
    private jugadoresService: JugadoresService,
    private sesionService: SesionService 
  ) {}

  ngOnInit(): void {
    this.jugador = this.sesionService.obtenerJugador(); 

    this.productosService.listarProductos().subscribe((productos) => {
      this.productosDisponibles = productos;
    });
  }

  comprar(producto: Producto): void {
    if (!this.jugador) return;

    this.jugadoresService.comprarProducto(this.jugador.id!, producto.id!).subscribe((jugadorActualizado) => {
      this.jugador = jugadorActualizado;
      this.sesionService.actualizarJugador(jugadorActualizado); 
      alert(`🛍️ Compraste: ${producto.nombre}`);
    }, error => {
      alert('💸 No tienes suficiente oro o ocurrió un error');
    });
  }
}
