# API de Gestión de Inventario y Almacenes

API REST desarrollada con Spring Boot para la gestión de inventario y almacenes, con soporte para métodos FIFO y LIFO de valoración de inventario.

## Características

- ✅ CRUD completo de Productos
- ✅ CRUD completo de Almacenes
- ✅ Registro de Movimientos (Entrada/Salida)
- ✅ Kardex automático con soporte para FIFO y LIFO
- ✅ Reportes de stock
- ✅ Validaciones y manejo de excepciones
- ✅ Documentación con Swagger/OpenAPI
- ✅ Arquitectura limpia con DTOs, Mappers y Services

## Tecnologías

- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- PostgreSQL
- MapStruct
- Lombok
- Swagger/OpenAPI
- Maven

## Requisitos Previos

- Java 17 o superior
- Maven 3.6+
- PostgreSQL 12+ (o usar Docker Compose)

## Configuración

### Opción 1: Ejecutar con Docker Compose (Recomendado)

```bash
docker-compose up -d
```

Esto iniciará:
- PostgreSQL en el puerto 5432
- La API en el puerto 8080

### Opción 2: Ejecutar localmente

1. **Configurar PostgreSQL:**
   - Crear base de datos: `inventario_db`
   - Usuario: `postgres`
   - Contraseña: `postgres`

2. **Configurar aplicación:**
   - Editar `src/main/resources/application.yml` si es necesario
   - Configurar el método de inventario (FIFO o LIFO):
     ```yaml
     inventario:
       metodo: FIFO  # o LIFO
     ```

3. **Compilar y ejecutar:**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

## Endpoints

### Productos

- `POST /api/productos` - Crear producto
- `GET /api/productos` - Listar todos los productos
- `GET /api/productos/{id}` - Obtener producto por ID
- `GET /api/productos/codigo/{codigo}` - Obtener producto por código
- `PUT /api/productos/{id}` - Actualizar producto
- `DELETE /api/productos/{id}` - Eliminar producto

### Almacenes

- `POST /api/almacenes` - Crear almacén
- `GET /api/almacenes` - Listar todos los almacenes
- `GET /api/almacenes/{id}` - Obtener almacén por ID
- `PUT /api/almacenes/{id}` - Actualizar almacén
- `DELETE /api/almacenes/{id}` - Eliminar almacén

### Movimientos

- `POST /api/movimientos` - Registrar movimiento
- `GET /api/movimientos` - Listar todos los movimientos
- `GET /api/movimientos/{id}` - Obtener movimiento por ID
- `POST /api/movimientos/buscar` - Buscar movimientos con filtros

### Reportes

- `GET /api/reportes/stock` - Stock total por producto
- `GET /api/reportes/stock/almacenes` - Stock por almacén
- `GET /api/reportes/stock/almacenes/{almacenId}` - Stock por almacén específico

## Documentación API

Una vez iniciada la aplicación, accede a:

- **Swagger UI:** http://localhost:8080/swagger-ui.html
- **OpenAPI JSON:** http://localhost:8080/api-docs

## Ejemplos de Uso

### Crear un Producto

```bash
curl -X POST http://localhost:8080/api/productos \
  -H "Content-Type: application/json" \
  -d '{
    "codigo": "PROD001",
    "nombre": "Laptop Dell",
    "descripcion": "Laptop Dell Inspiron 15",
    "unidad": "UNIDAD",
    "costoUnitario": 850.00,
    "categoria": "TECNOLOGIA"
  }'
```

### Registrar Entrada

```bash
curl -X POST http://localhost:8080/api/movimientos \
  -H "Content-Type: application/json" \
  -d '{
    "tipo": "ENTRADA",
    "cantidad": 10,
    "productoId": 1,
    "almacenId": 1,
    "costoUnitarioMov": 850.00
  }'
```

### Registrar Salida

```bash
curl -X POST http://localhost:8080/api/movimientos \
  -H "Content-Type: application/json" \
  -d '{
    "tipo": "SALIDA",
    "cantidad": 5,
    "productoId": 1,
    "almacenId": 1,
    "costoUnitarioMov": 0
  }'
```

## Reglas de Negocio

### Entradas
- Agregan unidades al inventario
- Actualizan el kardex automáticamente
- Calculan el costo promedio ponderado

### Salidas
- Validan stock suficiente antes de procesar
- Calculan el costo según el método configurado (FIFO/LIFO):
  - **FIFO:** Descuenta desde las entradas más antiguas
  - **LIFO:** Descuenta desde las entradas más recientes
- Actualizan el kardex con los nuevos saldos

## Estructura del Proyecto

```
src/
├── main/
│   ├── java/com/inventario/
│   │   ├── config/          # Configuraciones
│   │   ├── controller/       # Controladores REST
│   │   ├── exception/        # Excepciones personalizadas
│   │   ├── mapper/           # MapStruct mappers
│   │   ├── model/
│   │   │   ├── dto/          # DTOs
│   │   │   └── entity/       # Entidades JPA
│   │   ├── repository/       # Repositorios Spring Data
│   │   └── service/          # Servicios (interfaces e implementaciones)
│   └── resources/
│       ├── application.yml   # Configuración
│       └── data.sql          # Datos de prueba
└── test/                     # Tests unitarios
```

## Tests

Ejecutar tests:

```bash
mvn test
```

## Construcción

```bash
mvn clean package
```

El JAR se generará en `target/gestion-inventario-api-1.0.0.jar`

## Licencia

Este proyecto es de código abierto y está disponible para uso educativo y comercial.

