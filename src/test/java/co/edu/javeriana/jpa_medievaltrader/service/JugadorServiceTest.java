package co.edu.javeriana.jpa_medievaltrader.service;

import co.edu.javeriana.jpa_medievaltrader.model.Ciudad;
import co.edu.javeriana.jpa_medievaltrader.model.Jugador;
import co.edu.javeriana.jpa_medievaltrader.model.Producto;
import co.edu.javeriana.jpa_medievaltrader.repository.CiudadRepository;
import co.edu.javeriana.jpa_medievaltrader.repository.JugadorRepository;
import co.edu.javeriana.jpa_medievaltrader.repository.ProductoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class JugadorServiceTest {

    private JugadorService jugadorService;
    private JugadorRepository jugadorRepository;
    private CiudadRepository ciudadRepository;
    private ProductoRepository productoRepository;

    @BeforeEach
    public void setUp() {
        jugadorRepository = mock(JugadorRepository.class);
        ciudadRepository = mock(CiudadRepository.class);
        productoRepository = mock(ProductoRepository.class);

        jugadorService = new JugadorService(jugadorRepository, ciudadRepository, productoRepository);
    }

    // AL NO HABER JUGADORES EL LISTADO ES VACIO
    @Test
    public void testListarJugadoresVacio() {
        when(jugadorRepository.findAll()).thenReturn(Collections.emptyList());

        List<Jugador> resultado = jugadorService.listarJugadores();

        assertNotNull(resultado);
        assertTrue(resultado.isEmpty());
    }

    // SE OBTIENE EL JUGADOR POR ID EXISTENTE
    @Test
    public void testObtenerJugadorPorIdExistente() {
        Jugador jugador = new Jugador();
        jugador.setId(1L);

        when(jugadorRepository.findById(1L)).thenReturn(Optional.of(jugador));

        Optional<Jugador> resultado = jugadorService.obtenerJugadorPorId(1L);

        assertTrue(resultado.isPresent());
        assertEquals(1L, resultado.get().getId());
    }

    // RETORNA VACIO SI EL JUGADOR NO EXISTE
    @Test
    public void testObtenerJugadorPorIdInexistente() {
        when(jugadorRepository.findById(99L)).thenReturn(Optional.empty());

        Optional<Jugador> resultado = jugadorService.obtenerJugadorPorId(99L);

        assertFalse(resultado.isPresent());
    }

    // guardarJugador RETORNA EL JUGADOR GUARDADO
    @Test
    public void testGuardarJugador() {
        Jugador jugador = new Jugador();
        jugador.setNombre("Arthur");

        when(jugadorRepository.save(jugador)).thenReturn(jugador);

        Jugador resultado = jugadorService.guardarJugador(jugador);

        assertNotNull(resultado);
        assertEquals("Arthur", resultado.getNombre());
    }

    // eliminarJugador LLAMA AL REPOSITORIO CORRECTAMENTE
    @Test
    public void testEliminarJugador() {
        Long id = 1L;

        jugadorService.eliminarJugador(id);

        verify(jugadorRepository, times(1)).deleteById(id);
    }

    // EL USURAIO PUEDE VIAJAR A OTRA CIUDAD EXISTENTE
    @Test
    public void testViajarJugadorExistente() {
        Long jugadorId = 1L;
        Long ciudadId = 2L;

        Jugador jugador = new Jugador();
        jugador.setId(jugadorId);
        Ciudad nuevaCiudad = new Ciudad();
        nuevaCiudad.setId(ciudadId);

        when(jugadorRepository.findById(jugadorId)).thenReturn(Optional.of(jugador));
        when(ciudadRepository.findById(ciudadId)).thenReturn(Optional.of(nuevaCiudad));
        when(jugadorRepository.save(any(Jugador.class))).thenReturn(jugador);

        Jugador actualizado = jugadorService.viajar(jugadorId, ciudadId);

        assertEquals(nuevaCiudad, actualizado.getCiudad());
    }

    // EL JUGADOR PUEDE COMPRAR SI TIENE EL ORO
    @Test
    public void testComprarProductoConOroSuficiente() {
        Long jugadorId = 1L;
        Long productoId = 2L;

        Jugador jugador = new Jugador();
        jugador.setId(jugadorId);
        jugador.setOro(100);
        jugador.setInventario(new ArrayList<>());

        Producto producto = new Producto();
        producto.setId(productoId);
        producto.setNombre("Espada");
        producto.setPrecio((double) 50);
        producto.setStock(1);

        when(jugadorRepository.findById(jugadorId)).thenReturn(Optional.of(jugador));
        when(productoRepository.findById(productoId)).thenReturn(Optional.of(producto));
        when(jugadorRepository.save(any(Jugador.class))).thenReturn(jugador);

        Jugador actualizado = jugadorService.comprarProducto(jugadorId, productoId);

        assertEquals(50, actualizado.getOro());
        assertEquals(1, actualizado.getInventario().size());
    }

    // EXCEPCION SI EL USUARIO NO TIENE SUFICIENTE ORO
    @Test
    public void testComprarProductoSinOroSuficiente() {
        Long jugadorId = 1L;
        Long productoId = 2L;

        Jugador jugador = new Jugador();
        jugador.setId(jugadorId);
        jugador.setOro(20);

        Producto producto = new Producto();
        producto.setId(productoId);
        producto.setPrecio((double) 100);

        when(jugadorRepository.findById(jugadorId)).thenReturn(Optional.of(jugador));
        when(productoRepository.findById(productoId)).thenReturn(Optional.of(producto));

        assertThrows(IllegalStateException.class, () -> {
            jugadorService.comprarProducto(jugadorId, productoId);
        });
    }

    // VERIFICA SI UN PRODUCTO SE VENDE CORRECTAMENTE CUANDO ESTA EN EL INVENTARIO
    @Test
    public void testVenderProductoExistenteEnInventario() {
        Long jugadorId = 1L;
        Long productoId = 2L;

        Producto producto = new Producto();
        producto.setId(productoId);
        producto.setNombre("Escudo");
        producto.setPrecio((double) 30);
        producto.setStock(1);

        Jugador jugador = new Jugador();
        jugador.setId(jugadorId);
        jugador.setOro(0);
        jugador.setInventario(new ArrayList<>(List.of(producto)));

        when(jugadorRepository.findById(jugadorId)).thenReturn(Optional.of(jugador));
        when(productoRepository.findById(productoId)).thenReturn(Optional.of(producto));
        when(jugadorRepository.save(any(Jugador.class))).thenReturn(jugador);

        Jugador actualizado = jugadorService.venderProducto(jugadorId, productoId);

        assertEquals(30, actualizado.getOro());
        assertEquals(0, actualizado.getInventario().get(0).getStock());
    }
}
