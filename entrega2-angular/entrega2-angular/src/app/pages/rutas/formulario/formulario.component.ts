import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Ruta } from '../../../model/ruta.model';
import { RutasService } from '../../../services/rutas.service';
import { Ciudad } from '../../../model/ciudad.model';
import { CiudadesService } from '../../../services/ciudades.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-formulario-ruta',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './formulario.component.html'
})
export class FormularioComponent {
  ruta: Ruta = {
    id: null,
    ciudadOrigen: null,
    ciudadDestino: null,
    tipoRuta: '',
    costo: 0
  };

  ciudades: Ciudad[] = [];

  constructor(
    private rutaService: RutasService,
    private ciudadService: CiudadesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cargarCiudades();

    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.cargarRuta(+id);
    }
  }

  cargarCiudades() {
    this.ciudadService.listarCiudades().subscribe((data) => {
      this.ciudades = data;
    });
  }

  guardarRuta() {
    this.ruta.ciudadOrigen = this.ciudades.find(c => c.id === this.ruta.ciudadOrigen?.id) ?? null;
    this.ruta.ciudadDestino = this.ciudades.find(c => c.id === this.ruta.ciudadDestino?.id) ?? null;
  
    this.rutaService.guardarRuta(this.ruta).subscribe(() => {
      this.router.navigate(['/rutas/lista']);
    });
  }
  
  
  cargarRuta(id: number) {
    this.rutaService.obtenerRutaPorId(id).subscribe((data) => {
      this.ruta = data;
    });
  }
}
