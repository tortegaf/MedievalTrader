package co.edu.javeriana.jpa_medievaltrader.controller;

import co.edu.javeriana.jpa_medievaltrader.model.Ruta;
import co.edu.javeriana.jpa_medievaltrader.service.CiudadService;
import co.edu.javeriana.jpa_medievaltrader.service.RutaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping("/rutas")
public class RutaController {

    @Autowired
    private RutaService rutaService;

    @Autowired
    private CiudadService ciudadService;

    @GetMapping
    public String listarRutas(Model model) {
        model.addAttribute("rutas", rutaService.listarRutas());
        return "rutas/lista";
    }

    @GetMapping("/nueva")
    public String nuevaRutaForm(Model model) {
        model.addAttribute("ruta", new Ruta());
        model.addAttribute("ciudades", ciudadService.listarCiudades()); // Lista de ciudades para seleccionar
        return "rutas/formulario";
    }

    @PostMapping
    public String guardarRuta(@ModelAttribute Ruta ruta) {
        rutaService.guardarRuta(ruta);
        return "redirect:/rutas";
    }

    @GetMapping("/editar/{id}")
    public String editarRuta(@PathVariable Long id, Model model) {
        Optional<Ruta> ruta = rutaService.obtenerRutaPorId(id);
        if (ruta.isPresent()) {
            model.addAttribute("ruta", ruta.get());
            model.addAttribute("ciudades", ciudadService.listarCiudades()); // Lista de ciudades disponibles
            return "rutas/formulario";
        } else {
            return "redirect:/rutas";
        }
    }

    @GetMapping("/eliminar/{id}")
    public String eliminarRuta(@PathVariable Long id) {
        rutaService.eliminarRuta(id);
        return "redirect:/rutas";
    }
}
