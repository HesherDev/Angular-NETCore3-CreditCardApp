Verificación del Proyecto Completo con Funcionalidad de Edición
Frontend Angular
Formulario de Tarjetas de Crédito:

Campos: El formulario tiene los campos titular, numeroTarjeta, fechaExpiracion, y cvv, y todos cuentan con sus respectivas validaciones (Validators.required, Validators.maxLength, y Validators.minLength).
Funcionalidad de Edición:
El método editarTarjeta(tarjeta: any) en AppComponent permite que, al hacer clic en una tarjeta de la lista, los datos se carguen en el formulario para ser editados.
Al seleccionar una tarjeta para editar, el botón cambia a "Editar Tarjeta" y el método guardarTarjeta() detecta si hay un id asignado para decidir entre agregar o actualizar la tarjeta.
Llamada para Refrescar la Lista:
El método obtenerTarjetas() se llama al finalizar la operación de edición, asegurando que la interfaz gráfica refleje los cambios instantáneamente.
Métodos de AppComponent:

agregarTarjeta / editarTarjeta:
El método guardarTarjeta() revisa si el id es undefined; en caso contrario, llama a updateTarjeta() en el servicio para actualizar los datos de la tarjeta.
Tras una operación exitosa (agregar o editar), el método obtenerTarjetas() actualiza la lista de tarjetas para reflejar los cambios en la interfaz gráfica.
Servicio TarjetaService (Angular)
Métodos en TarjetaService:
El servicio TarjetaService contiene los métodos getListTarjetas, deleteTarjeta, saveTarjeta, y ahora updateTarjeta, para manejar correctamente las peticiones GET, DELETE, POST, y PUT.
La URL base https://localhost:7218/ con el endpoint de API api/Tarjeta es consistente en todas las llamadas y funciona con el backend.
El método updateTarjeta envía los datos actualizados con la solicitud PUT a la API.
Backend (C#)
Modelo TarjetaCredito:

El modelo TarjetaCredito tiene los campos correctos (titular, numeroTarjeta, fechaExpiracion, y cvv), que coinciden con el formulario en Angular.
Los atributos de validación del modelo aseguran que los datos cumplen con las restricciones (como longitud del número de tarjeta y formato de fecha) antes de ser guardados en la base de datos.
Controlador TarjetaController:

El controlador TarjetaController implementa las rutas y métodos HTTP necesarios para las operaciones de API:
GET: Obtener la lista de tarjetas (getListTarjetas).
POST: Crear una tarjeta (saveTarjeta).
PUT: Editar una tarjeta (updateTarjeta) — asegura que los datos se actualicen correctamente en la base de datos.
DELETE: Eliminar una tarjeta (deleteTarjeta).
Configuración de CORS: Permite conexiones desde http://localhost:4200, lo cual es necesario para que la aplicación Angular se comunique con el backend.
DbContext y Base de Datos:

DbContext está configurado con DbSet<TarjetaCredito> para manejar las operaciones CRUD.
La base de datos SQL Server refleja correctamente los cambios (agregar, editar, y eliminar tarjetas) y asegura la persistencia de datos en cada operación.
Resumen y Confirmación
Frontend: La funcionalidad de agregar, editar, y eliminar tarjetas funciona como se espera y actualiza la interfaz automáticamente.
Backend: Todas las operaciones están soportadas y funcionan correctamente con la base de datos y el frontend.
Con esta revisión y actualización, tu aplicación debería reflejar los cambios inmediatamente después de cada operación de CRUD, proporcionando una experiencia de usuario fluida.