import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from '../../../model/producto.model';
import { ProductosService } from '../../../services/productos.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-formulario-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './formulario.component.html'
})
export class FormularioComponent {
  producto: Producto = {
    id: null,
    nombre: '',
    precio: 0,
    stock: 0
  };

  constructor(
    private productoService: ProductosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.cargarProducto(+id);
    }
  }

  guardarProducto() {
    this.productoService.guardarProducto(this.producto).subscribe(() => {
      this.router.navigate(['/productos/lista']);
    });
  }

  cargarProducto(id: number) {
    this.productoService.obtenerProductoPorId(id).subscribe((data) => {
      this.producto = data;
    });
  }
}
