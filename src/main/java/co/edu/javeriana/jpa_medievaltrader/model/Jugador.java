package co.edu.javeriana.jpa_medievaltrader.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Jugador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre no puede estar vacío")
    private String nombre;

    @Min(value = 0, message = "El nivel debe ser mayor o igual a 0")
    private int nivel;

    @Min(value = 0, message = "El oro debe ser mayor o igual a 0")
    private int oro;

    // Constructores
    public Jugador() {}

    public Jugador(String nombre, int nivel, int oro) {
        this.nombre = nombre;
        this.nivel = nivel;
        this.oro = oro;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public int getNivel() { return nivel; }
    public void setNivel(int nivel) { this.nivel = nivel; }

    public int getOro() { return oro; }
    public void setOro(int oro) { this.oro = oro; }
}
