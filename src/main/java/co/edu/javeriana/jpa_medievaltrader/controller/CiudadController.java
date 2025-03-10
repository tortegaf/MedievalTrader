package co.edu.javeriana.jpa_medievaltrader.controller;

import co.edu.javeriana.jpa_medievaltrader.model.Ciudad;
import co.edu.javeriana.jpa_medievaltrader.service.CiudadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping("/ciudades")
public class CiudadController {

    @Autowired
    private CiudadService ciudadService;

    @GetMapping
    public String listarCiudades(Model model) {
        model.addAttribute("ciudades", ciudadService.listarCiudades());
        return "ciudades/lista";
    }

    @GetMapping("/nueva")
    public String nuevaCiudadForm(Model model) {
        model.addAttribute("ciudad", new Ciudad());
        return "ciudades/formulario";
    }

    @PostMapping
    public String guardarCiudad(@ModelAttribute Ciudad ciudad) {
        ciudadService.guardarCiudad(ciudad);
        return "redirect:/ciudades";
    }

    @GetMapping("/editar/{id}")
    public String editarCiudad(@PathVariable Long id, Model model) {
        Optional<Ciudad> ciudad = ciudadService.obtenerCiudadPorId(id);
        if (ciudad.isPresent()) {
            model.addAttribute("ciudad", ciudad.get());
            return "ciudades/formulario";
        } else {
            return "redirect:/ciudades";
        }
    }

    @GetMapping("/eliminar/{id}")
    public String eliminarCiudad(@PathVariable Long id) {
        ciudadService.eliminarCiudad(id);
        return "redirect:/ciudades";
    }
}
