package co.edu.javeriana.jpa_medievaltrader.rest;

import co.edu.javeriana.jpa_medievaltrader.model.Jugador;
import co.edu.javeriana.jpa_medievaltrader.model.Rol;
import co.edu.javeriana.jpa_medievaltrader.service.JugadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/jugadores")
@CrossOrigin(origins = "*")
public class JugadorRestController {

    @Autowired
    private JugadorService jugadorService;

    @GetMapping
    public List<Jugador> listarJugadores() {
        return jugadorService.listarJugadores();
    }

    @GetMapping("/{id}")
    public Optional<Jugador> obtenerPorId(@PathVariable Long id) {
        return jugadorService.obtenerJugadorPorId(id);
    }

    @PostMapping
    public Jugador guardarJugador(@RequestBody Jugador jugador) {
        if (jugador.getRol() == null) {
            jugador.setRol(Rol.COMERCIANTE); // Rol por defecto si no viene en la solicitud
        }
        return jugadorService.guardarJugador(jugador);
    }

    @DeleteMapping("/{id}")
    public void eliminarJugador(@PathVariable Long id) {
        jugadorService.eliminarJugador(id);
    }

    @PutMapping("/{id}/viajar")
    public Jugador viajar(@PathVariable Long id, @RequestBody Map<String, Long> body) {
        Jugador jugador = jugadorService.obtenerJugadorPorId(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Jugador no encontrado"));

        if (jugador.getRol() != Rol.CARAVANERO) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo un caravanero puede viajar");
        }

        Long ciudadId = body.get("ciudadId");
        return jugadorService.viajar(id, ciudadId);
    }

    @PostMapping("/{id}/comprar")
    public Jugador comprarProducto(@PathVariable Long id, @RequestBody Map<String, Long> body) {
        Long productoId = body.get("productoId");
        return jugadorService.comprarProducto(id, productoId);
    }

    @PostMapping("/{id}/vender")
    public Jugador venderProducto(@PathVariable Long id, @RequestBody Map<String, Long> body) {
        Long productoId = body.get("productoId");
        return jugadorService.venderProducto(id, productoId);
    }
}
