# PROYECTO 4: Reservas Hoteleras

En este proyecto se desarrolló una API de reservas hoteleras, utilizando Node.js y Express como backend.

La plataforma permitirá a los usuarios (ya sean viajeros, recepcionista o el gerente del hotel) realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) en las reservas y aplicar filtros de búsqueda para encontrar pedidos específicos.

## ARQUITECTURA DEL PROYECTO

Crear una arquitectura de carpetas y archivos clara. Se utilizó la entregada como ejemplo, y se le realizó pequeñas modificaciones, añadir las carpetas services (para alojar la lógica de negocio), y utils (como capa intermedia) de errores http y verificación de fechas (formato fecha, fecha_inicio y fecha_fin), enteros (número de habitacion, número de huesped), y validaciones de estructura (objeto reserva).

De esta forma se separá la responsabilidad de la interacción http de la API del controller, de la lógica de negocios en el services.

proyecto_4_reservas_hoteleras
├── src/
│   ├── controllers/
|   |   └── reservas.controller.js
│   ├── routes/
|   |   └── reservas.routes.js
│   ├── services/
|   |   └── reservas.service.js
│   ├── utils/
|   |   ├── error-handler.js
|   |   ├── http-error.js
|   |   └── validator.js
│   └── main.js  <- ARCHIVO DE ENTRADA
├── .env
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json

└── README.md

### Schema.json

Se utiliza el archivo Schema.json como ejemplo y regla, y se le hace una pequeña modificación donde se agrega la condicion "nombre_huesped", de forma que sea boligatorio este dato al generar la reserva. Para esto se modifica el archivo schema.json:

- Agregar propiedad "nombre_huesped" en properties.
- Agregar "nombre_huesped" al array required.
- Incluirlo en example.

## APLICACIÓN DE SERVICIOS CRUD

Permitir la creación de reservas con los detalles necesarios (por ejemplo, hotel, tipo de habitación, número de huéspedes, fechas, etc.).
Permitir la visualización de la lista de reservas.
Permitir la obtención de la información de una reserva específica.
Permitir la actualización de la información de una reserva.
Permitir la eliminación de una reserva.
Permitir la búsqueda de reservas por hotel, rango de fechas, tipo de habitación, estado y número de huéspedes.

Almacenar los datos de las reservas en un objeto.
Para la persistencia de datos, se utilizará un archivo .json donde se almacenen

## Endpoints principales

- **POST** `/api/reservas` – Crear reserva
- **GET** `/api/reservas` – Listar reservas (admite filtros por `hotel`, `fecha_inicio`, `fecha_fin`, `tipo_habitacion`, `estado`, `num_huespedes`)
- **GET** `/api/reservas/:id` – Obtener por id
- **PUT** `/api/reservas/:id` – Actualizar
- **DELETE** `/api/reservas/:id` – Eliminar

Se utilizarán estos 5 EndPoints principales, y para el resto de endpoints correspondientes a filtros, se utilizarán "query params" implementados en el archivo "/src/controllers/reservas.controller.js". Estos utilizan directamente el metodo GET "obtenerReservas()".

- Implementación del total de 10 endpoints.

|Descripción del Endpoint|	Método|	Endpoint| Ejemplo. Caso de uso. |
|-----------------------|----------|------------|---------|
|Crear reserva	| POST| 	/api/reservas|Como viajero, quiero hacer una reserva en el hotel "Hotel Paraíso" para el 15 de mayo de 2023. Necesito una habitación doble para dos adultos y un niño.
|Obtener la lista de reservas|	GET|	/api/reservas|Como gerente del hotel, quiero ver una lista de todas las reservas para hoy para poder planificar el trabajo del personal de limpieza y recepción.|
|Obtener información de una reserva específica	|GET|	/api/reservas/:id|Como recepcionista, necesito verificar los detalles de la reserva del huésped que acaba de llegar al hotel. Su número de reserva es 12345.
|Actualizar información de una reserva|	PUT|	/api/reservas/:id|Como huésped, necesito cambiar mi reserva en el hotel "Hotel Paraíso". Originalmente reservé una habitación doble, pero ahora necesito una suite familiar. Mi número de reserva es 12345.|
|Eliminar una reserva específica	|DELETE|	/api/reservas/:id|Como viajero, tuve un cambio de planes y ya no necesito la habitación que reservé en el hotel "Hotel Paraíso". Mi número de reserva es 12345.|
|Filtrar reservas por hotel|	GET|	/api/reservas?hotel=HOTEL|Como gerente de una cadena de hoteles, quiero ver todas las reservas para el "Hotel Paraíso" para el próximo mes.|
|Filtrar reservas por rango de fechas|	GET|	/api/reservas?fecha_inicio=FECHA_INICIO&fecha_fin=FECHA_FIN|Como gerente del hotel, quiero ver todas las reservas para la semana de Navidad para poder planificar el personal y las actividades necesarias.|
|Filtrar reservas por tipo de habitación|	GET|	/api/reservas?tipo_habitacion=TIPO_HABITACION|Como gerente del hotel, quiero ver todas las reservas para nuestras suites de lujo para el próximo mes para asegurarme de que todo esté en perfectas condiciones para nuestros huéspedes VIP.|
|Filtrar reservas por estado|	GET|	/api/reservas?estado=ESTADO|Como gerente del hotel, quiero ver todas las reservas que están pendientes de pago para poder hacer un seguimiento con los clientes.|
|Filtrar reservas por número de huéspedes|	GET|	/api/reservas?num_huespedes=NUM_HUESPEDES|Como gerente del hotel, quiero ver todas las reservas para grupos de más de 5 personas para el próximo mes, para poder planificar las necesidades adicionales de estos grupos grandes.|

## DOCUMENTACIÓN DE LA API (OPCIONAL)

Queda pendiente para la semana ponte al dia, o para estudio personal ya que por temas de tiempo no fue posible implementar esta funcionalidad.

## Deploy en Render.com

Queda pendiente para la semana ponte al dia, o para estudio personal ya que por temas de tiempo no fue posible implementar esta funcionalidad.

## EJEMPLOS/TEST RÁPIDOS

Se puede correr la API de forma local con "npm run dev" o "npm run start" y luego desde algún CLI como git bash, o WSL 2 (En powershell se puede pero cambia la sintaxis)

    curl -X POST http://localhost:3000/api/reservas \
    -H "Content-Type: application/json" \
    -d '{
    "hotel": "Hotel Paraíso",
    "fecha_inicio": "2025-05-15",
    "fecha_fin": "2025-05-17",
    "tipo_habitacion": "doble",
    "estado": "pendiente",
    "num_huespedes": 3,
    "nombre_huesped": "Juan Pérez"
    }'

Para ver todas las reservas
    curl http://localhost:3000/api/reserva/
