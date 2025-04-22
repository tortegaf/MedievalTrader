package co.edu.javeriana.jpa_medievaltrader.rest;

import co.edu.javeriana.jpa_medievaltrader.model.Ciudad;
import co.edu.javeriana.jpa_medievaltrader.service.CiudadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ciudades")
public class CiudadRestController {

    @Autowired
    private CiudadService ciudadService;

    @GetMapping
    public List<Ciudad> listarCiudades() {
        return ciudadService.listarCiudades();
    }

    @GetMapping("/{id}")
    public Optional<Ciudad> obtenerCiudad(@PathVariable Long id) {
        return ciudadService.obtenerCiudadPorId(id);
    }

    @PostMapping
    public Ciudad crearCiudad(@RequestBody Ciudad ciudad) {
        return ciudadService.guardarCiudad(ciudad);
    }

    @DeleteMapping("/{id}")
    public void eliminarCiudad(@PathVariable Long id) {
        ciudadService.eliminarCiudad(id);
    }
}
