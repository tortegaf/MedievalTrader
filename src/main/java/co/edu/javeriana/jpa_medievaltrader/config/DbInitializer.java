package co.edu.javeriana.jpa_medievaltrader.config;

import co.edu.javeriana.jpa_medievaltrader.model.Ciudad;
import co.edu.javeriana.jpa_medievaltrader.model.Producto;
import co.edu.javeriana.jpa_medievaltrader.model.Jugador;
import co.edu.javeriana.jpa_medievaltrader.model.Ruta;
import co.edu.javeriana.jpa_medievaltrader.repository.CiudadRepository;
import co.edu.javeriana.jpa_medievaltrader.repository.ProductoRepository;
import co.edu.javeriana.jpa_medievaltrader.repository.JugadorRepository;
import co.edu.javeriana.jpa_medievaltrader.repository.RutaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;

@Configuration
public class DbInitializer {

    @Bean
    @Transactional
    CommandLineRunner initDatabase(
            CiudadRepository ciudadRepository,
            ProductoRepository productoRepository,
            JugadorRepository jugadorRepository,
            RutaRepository rutaRepository) {
        
        return args -> {
            Random random = new Random();

            if (ciudadRepository.count() == 0) {
                for (int i = 1; i <= 100; i++) {
                    Ciudad ciudad = new Ciudad("Ciudad " + i, random.nextInt(500)); 
                    ciudadRepository.save(ciudad);
                }
            }

            if (productoRepository.count() == 0) {
                List<String> nombresProductos = List.of("Espada", "Armadura", "Poción", "Pergamino", "Antorcha", 
                                                         "Escudo", "Arco", "Flechas", "Mapa", "Llave mágica");
                
                for (int i = 1; i <= 50; i++) {
                    String nombre = nombresProductos.get(random.nextInt(nombresProductos.size())) + " " + i;
                    double precio = 10 + random.nextInt(90); 
                    int stock = random.nextInt(50); 
                    Producto producto = new Producto(nombre, precio, stock);
                    productoRepository.save(producto);
                }
            }

            if (jugadorRepository.count() == 0) {
                List<String> nombresJugadores = List.of("Arthur", "Lancelot", "Gawain", "Percival", "Galahad",
                                                         "Tristan", "Bors", "Kay", "Mordred", "Merlin");

                for (String nombre : nombresJugadores) {
                    int nivel = random.nextInt(10) + 1; 
                    int oro = random.nextInt(1000); 
                    Jugador jugador = new Jugador(nombre, nivel, oro);
                    jugadorRepository.save(jugador);
                }
            }

            if (rutaRepository.count() == 0) {
                List<Ciudad> ciudades = ciudadRepository.findAll();
                if (ciudades.size() >= 2) {
                    for (int i = 0; i < 50; i++) {
                        Ciudad origen = ciudades.get(random.nextInt(ciudades.size()));
                        Ciudad destino;
                        do {
                            destino = ciudades.get(random.nextInt(ciudades.size()));
                        } while (origen.equals(destino)); 

                        String tipoRuta = random.nextBoolean() ? "Segura" : "Peligrosa"; 
                        double costo = 10 + random.nextInt(90); 
                        Ruta ruta = new Ruta(origen, destino, tipoRuta, costo);
                        rutaRepository.save(ruta);
                    }
                }
            }

            System.out.println("✅ Base de datos inicializada con ciudades, productos, jugadores y rutas.");
        };
    }
}
