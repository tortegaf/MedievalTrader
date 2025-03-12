package co.edu.javeriana.jpa_medievaltrader.repository;

import co.edu.javeriana.jpa_medievaltrader.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
}
