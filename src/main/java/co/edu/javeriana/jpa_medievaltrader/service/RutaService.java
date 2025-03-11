package co.edu.javeriana.jpa_medievaltrader.service;

import co.edu.javeriana.jpa_medievaltrader.model.Ruta;
import co.edu.javeriana.jpa_medievaltrader.repository.RutaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RutaService {

    @Autowired
    private RutaRepository rutaRepository;

    public List<Ruta> listarRutas() {
        return rutaRepository.findAll();
    }

    public Optional<Ruta> obtenerRutaPorId(Long id) {
        return rutaRepository.findById(id);
    }

    public Ruta guardarRuta(Ruta ruta) {
        return rutaRepository.save(ruta);
    }

    public void eliminarRuta(Long id) {
        rutaRepository.deleteById(id);
    }

    public List<Ruta> listarRutasPorCiudadOrigen(Long ciudadOrigenId) {
        return rutaRepository.findByCiudadOrigenId(ciudadOrigenId);
    }

    public List<Ruta> listarRutasPorCiudadDestino(Long ciudadDestinoId) {
        return rutaRepository.findByCiudadDestinoId(ciudadDestinoId);
    }
}
