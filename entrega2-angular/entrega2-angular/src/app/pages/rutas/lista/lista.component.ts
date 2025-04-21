import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Ruta } from '../../../model/ruta.model';
import { RutasService } from '../../../services/rutas.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-rutas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  rutas: Ruta[] = [];

  constructor(
    private rutasService: RutasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarRutas();
  }

  cargarRutas(): void {
    this.rutasService.listarRutas().subscribe((data) => {
      this.rutas = data;
    });
  }

  eliminarRuta(id: number | null): void {
    if (id && confirm('¿Seguro que quieres eliminar esta ruta?')) {
      this.rutasService.eliminarRuta(id).subscribe(() => {
        this.cargarRutas();
      });
    }
  }

  editarRuta(id: number | null): void {
    if (id) {
      this.router.navigate(['/rutas/formulario'], {
        queryParams: { id: id }
      });
    }
  }
}
