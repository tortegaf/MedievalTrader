import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Ciudad } from '../../../model/ciudad.model';
import { CiudadesService } from '../../../services/ciudades.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-ciudades',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista.component.html',
})
export class ListaComponent implements OnInit {
  ciudades: Ciudad[] = [];

  constructor(
    private ciudadService: CiudadesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCiudades();
  }

  cargarCiudades(): void {
    this.ciudadService.listarCiudades().subscribe((data) => {
      this.ciudades = data;
    });
  }

  eliminarCiudad(id: number | null): void {
    if (id && confirm('¿Estás seguro de eliminar esta ciudad?')) {
      this.ciudadService.eliminarCiudad(id).subscribe(() => {
        this.cargarCiudades(); 
      });
    }
  }

  editarCiudad(id: number | null): void {
    if (id) {
      this.router.navigate(['/ciudades/formulario'], {
        queryParams: { id: id },
      });
    }
  }
}
