package co.edu.javeriana.jpa_medievaltrader.service;

import co.edu.javeriana.jpa_medievaltrader.model.Ciudad;
import co.edu.javeriana.jpa_medievaltrader.model.Jugador;
import co.edu.javeriana.jpa_medievaltrader.model.Producto;
import co.edu.javeriana.jpa_medievaltrader.repository.CiudadRepository;
import co.edu.javeriana.jpa_medievaltrader.repository.JugadorRepository;
import co.edu.javeriana.jpa_medievaltrader.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JugadorService {

    @Autowired
    private JugadorRepository jugadorRepository;

    @Autowired
    private CiudadRepository ciudadRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public List<Jugador> listarJugadores() {
        return jugadorRepository.findAll();
    }

    public Optional<Jugador> obtenerJugadorPorId(Long id) {
        return jugadorRepository.findById(id);
    }

    public Jugador guardarJugador(Jugador jugador) {
        return jugadorRepository.save(jugador);
    }

    public void eliminarJugador(Long id) {
        jugadorRepository.deleteById(id);
    }

    public Jugador viajar(Long jugadorId, Long ciudadId) {
        Jugador jugador = jugadorRepository.findById(jugadorId).orElseThrow();
        Ciudad nuevaCiudad = ciudadRepository.findById(ciudadId).orElseThrow();
        jugador.setCiudad(nuevaCiudad);
        return jugadorRepository.save(jugador);
    }

    public Jugador comprarProducto(Long jugadorId, Long productoId) {
        Jugador jugador = jugadorRepository.findById(jugadorId).orElseThrow();
        Producto producto = productoRepository.findById(productoId).orElseThrow();

        if (jugador.getOro() >= producto.getPrecio()) {
            jugador.setOro(jugador.getOro() - producto.getPrecio().intValue());
            
            boolean encontrado = false;
            for (Producto p : jugador.getInventario()) {
                if (p.getId().equals(producto.getId())) {
                    p.setStock(p.getStock() + 1);
                    encontrado = true;
                    break;
                }
            }

            if (!encontrado) {
                Producto nuevo = new Producto();
                nuevo.setId(producto.getId());
                nuevo.setNombre(producto.getNombre());
                nuevo.setPrecio(producto.getPrecio());
                nuevo.setStock(1);
                jugador.getInventario().add(nuevo);
            }

            return jugadorRepository.save(jugador);
        } else {
            throw new IllegalStateException("El jugador no tiene suficiente oro");
        }
    }

    public Jugador venderProducto(Long jugadorId, Long productoId) {
        Jugador jugador = jugadorRepository.findById(jugadorId).orElseThrow();
        Producto producto = productoRepository.findById(productoId).orElseThrow();

        if (jugador.getInventario() != null) {
            for (Producto p : jugador.getInventario()) {
                if (p.getId().equals(productoId)) {
                    if (p.getStock() > 0) {
                        p.setStock(p.getStock() - 1);
                        jugador.setOro(jugador.getOro() + producto.getPrecio().intValue());
                    }
                    break;
                }
            }
        }

        return jugadorRepository.save(jugador);
    }
}
