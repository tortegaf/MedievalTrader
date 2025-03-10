package co.edu.javeriana.jpa_medievaltrader.repository;

import co.edu.javeriana.jpa_medievaltrader.model.Ciudad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CiudadRepository extends JpaRepository<Ciudad, Long> {
}
