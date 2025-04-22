package co.edu.javeriana.jpa_medievaltrader.rest;

import co.edu.javeriana.jpa_medievaltrader.model.Ruta;
import co.edu.javeriana.jpa_medievaltrader.service.RutaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rutas")
@CrossOrigin(origins = "*")
public class RutaRestController {

    @Autowired
    private RutaService rutaService;

    @GetMapping
    public List<Ruta> listarRutas() {
        return rutaService.listarRutas();
    }

    @GetMapping("/{id}")
    public Optional<Ruta> obtenerRuta(@PathVariable Long id) {
        return rutaService.obtenerRutaPorId(id);
    }

    @PostMapping
    public Ruta guardarRuta(@RequestBody Ruta ruta) {
        return rutaService.guardarRuta(ruta);
    }

    @DeleteMapping("/{id}")
    public void eliminarRuta(@PathVariable Long id) {
        rutaService.eliminarRuta(id);
    }
}
