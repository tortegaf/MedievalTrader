package co.edu.javeriana.jpa_medievaltrader.controller;

import co.edu.javeriana.jpa_medievaltrader.model.Jugador;
import co.edu.javeriana.jpa_medievaltrader.service.JugadorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping("/jugadores")
public class JugadorController {

    @Autowired
    private JugadorService jugadorService;

    @GetMapping
    public String listarJugadores(Model model) {
        model.addAttribute("jugadores", jugadorService.listarJugadores());
        return "jugadores/lista";
    }

    @GetMapping("/nuevo")
    public String nuevoJugadorForm(Model model) {
        model.addAttribute("jugador", new Jugador());
        return "jugadores/formulario";
    }

    @PostMapping
    public String guardarJugador(@Valid @ModelAttribute Jugador jugador, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("jugador", jugador);
            return "jugadores/formulario";
        }
        jugadorService.guardarJugador(jugador);
        return "redirect:/jugadores";
    }

    @GetMapping("/editar/{id}")
    public String editarJugador(@PathVariable Long id, Model model) {
        Optional<Jugador> jugador = jugadorService.obtenerJugadorPorId(id);
        if (jugador.isPresent()) {
            model.addAttribute("jugador", jugador.get());
            return "jugadores/formulario";
        } else {
            return "redirect:/jugadores";
        }
    }

    @GetMapping("/eliminar/{id}")
    public String eliminarJugador(@PathVariable Long id) {
        jugadorService.eliminarJugador(id);
        return "redirect:/jugadores";
    }
}
