package co.edu.javeriana.jpa_medievaltrader.rest;

import co.edu.javeriana.jpa_medievaltrader.model.Jugador;
import co.edu.javeriana.jpa_medievaltrader.service.JugadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
        return jugadorService.guardarJugador(jugador);
    }

    @DeleteMapping("/{id}")
    public void eliminarJugador(@PathVariable Long id) {
        jugadorService.eliminarJugador(id);
    }
}
