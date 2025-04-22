# ⚔️ Medieval Trader ⚔️

Juego RPG que permite a los jugadores seleccionar un personaje, asignarle una ciudad, comerciar productos, viajar entre ciudades, vender objetos y consultar su inventario.

---

## 📌 Características Principales 

✔ Frontend completo desarrollado con **Angular 18** y **Standalone Components**  
✔ Backend REST completo en **Spring Boot** con controladores `@RestController`  
✔ CRUD funcional de **Jugadores, Ciudades, Productos y Rutas**  
✔ Navegación dinámica entre componentes del juego: seleccionar jugador → ciudad actual → viajar / comprar / vender / inventario  
✔ Integración de almacenamiento de sesión (sessionStorage) para conservar estado del jugador  
✔ Peticiones HTTP reales usando `HttpClient` con servicios Angular  
✔ Endpoints conectados a una base de datos en memoria (**H2**) y controladores REST  
✔ Simulación completa del flujo de un juego de comercio medieval

---

## 🧪 Endpoints Backend Disponibles

- `GET /api/jugadores`
- `POST /api/jugadores`
- `PUT /api/jugadores/{id}/viajar`
- `POST /api/jugadores/{id}/comprar`
- `POST /api/jugadores/{id}/vender`
- `GET /api/ciudades`
- `GET /api/productos`
- `GET /api/rutas`

---

## 🛠 Tecnologías Utilizadas

### Backend:
- **Java 17**
- **Spring Boot 3.4.3**
- **Spring Data JPA**
- **H2 Database**
- **Maven**

### Frontend:
- **Angular 18**
- **TypeScript**
- **Angular Router**
- **Bootstrap + CSS**

---

## 🚀 Instalación y Ejecución

### 1. Clonar el Repositorio
```bash
git clone https://github.com/TU_USUARIO/MedievalTrader.git
cd MedievalTrader
```

### 2. Backend - Ejecutar con Maven
```bash
mvn clean install
mvn spring-boot:run
```

📍 Acceso backend: [http://localhost:8080](http://localhost:8080)  
📍 H2 Console: [http://localhost:8080/h2](http://localhost:8080/h2)

### 3. Frontend - Angular
```bash
cd entrega2-angular
npm install
ng serve
```

📍 Acceso frontend: [http://localhost:4200](http://localhost:4200)


