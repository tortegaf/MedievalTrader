package co.edu.javeriana.jpa_medievaltrader.repository;

import co.edu.javeriana.jpa_medievaltrader.model.Ruta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RutaRepository extends JpaRepository<Ruta, Long> {
    List<Ruta> findByCiudadOrigenId(Long ciudadOrigenId);
    
    List<Ruta> findByCiudadDestinoId(Long ciudadDestinoId);
}
