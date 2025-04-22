package co.edu.javeriana.jpa_medievaltrader.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.util.ArrayList;
import java.util.List;

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

    @ManyToOne
    private Ciudad ciudad;

    @ManyToMany
    private List<Producto> inventario = new ArrayList<>();

    public Jugador() {}

    public Jugador(String nombre, int nivel, int oro) {
        this.nombre = nombre;
        this.nivel = nivel;
        this.oro = oro;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public int getNivel() { return nivel; }
    public void setNivel(int nivel) { this.nivel = nivel; }

    public int getOro() { return oro; }
    public void setOro(int oro) { this.oro = oro; }

    public Ciudad getCiudad() { return ciudad; }
    public void setCiudad(Ciudad ciudad) { this.ciudad = ciudad; }

    public List<Producto> getInventario() { return inventario; }
    public void setInventario(List<Producto> inventario) { this.inventario = inventario; }
}
