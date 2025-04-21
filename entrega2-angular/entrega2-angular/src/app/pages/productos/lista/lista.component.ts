import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Producto } from '../../../model/producto.model';
import { ProductosService } from '../../../services/productos.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  productos: Producto[] = [];

  constructor(
    private productoService: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.listarProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  eliminarProducto(id: number | null): void {
    if (id && confirm('¿Seguro que quieres eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe(() => {
        this.cargarProductos();
      });
    }
  }

  editarProducto(id: number | null): void {
    if (id) {
      this.router.navigate(['/productos/formulario'], {
        queryParams: { id: id }
      });
    }
  }
}
