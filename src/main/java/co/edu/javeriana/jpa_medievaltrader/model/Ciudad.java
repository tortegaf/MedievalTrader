package co.edu.javeriana.jpa_medievaltrader.model;

import jakarta.persistence.*;

@Entity
public class Ciudad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;
    private int impuestos;

    // 🔹 Constructor vacío requerido por JPA
    public Ciudad() {}

    // 🔹 Constructor que soluciona el error en DbInitializer
    public Ciudad(String nombre, int impuestos) {
        this.nombre = nombre;
        this.impuestos = impuestos;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public int getImpuestos() { return impuestos; }
    public void setImpuestos(int impuestos) { this.impuestos = impuestos; }
}
