import { Component } from '@angular/core';
import { Ciudad } from '../../../model/ciudad.model';
import { CiudadesService } from '../../../services/ciudades.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-formulario-ciudad',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './formulario.component.html'
})
export class FormularioComponent {
  ciudad: Ciudad = {
    id: null,
    nombre: '',
    impuestos: 0
  };

  constructor(
    private ciudadService: CiudadesService,
    private router: Router,
    private route: ActivatedRoute 
  ) {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.cargarCiudad(+id);
    }
  }

  guardarCiudad() {
    this.ciudadService.guardarCiudad(this.ciudad).subscribe(() => {
      this.router.navigate(['/ciudades/lista']);
    });
  }

  cargarCiudad(id: number) {
    this.ciudadService.obtenerCiudadPorId(id).subscribe((data) => {
      this.ciudad = data;
    });
  }
}
