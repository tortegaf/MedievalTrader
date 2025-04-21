import { Routes } from '@angular/router';

// Ciudades
import { FormularioComponent as FormularioCiudadesComponent } from './pages/ciudades/formulario/formulario.component';
import { ListaComponent as ListaCiudadesComponent } from './pages/ciudades/lista/lista.component';

// Jugadores
import { FormularioComponent as FormularioJugadoresComponent } from './pages/jugadores/formulario/formulario.component';
import { ListaComponent as ListaJugadoresComponent } from './pages/jugadores/lista/lista.component';

// Productos
import { FormularioComponent as FormularioProductosComponent } from './pages/productos/formulario/formulario.component';
import { ListaComponent as ListaProductosComponent } from './pages/productos/lista/lista.component';

// Rutas
import { FormularioComponent as FormularioRutasComponent } from './pages/rutas/formulario/formulario.component';
import { ListaComponent as ListaRutasComponent } from './pages/rutas/lista/lista.component';

// Dashboard
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  // Ciudades
  { path: 'ciudades/formulario', component: FormularioCiudadesComponent },
  { path: 'ciudades/lista', component: ListaCiudadesComponent },

  // Jugadores
  { path: 'jugadores/formulario', component: FormularioJugadoresComponent },
  { path: 'jugadores/lista', component: ListaJugadoresComponent },

  // Productos
  { path: 'productos/formulario', component: FormularioProductosComponent },
  { path: 'productos/lista', component: ListaProductosComponent },

  // Rutas
  { path: 'rutas/formulario', component: FormularioRutasComponent },
  { path: 'rutas/lista', component: ListaRutasComponent },

  // Dashboard
  { path: 'dashboard', component: DashboardComponent },

  // Redirección por defecto
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
