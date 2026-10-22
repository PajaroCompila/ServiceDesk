# ServiceDesk · Almacén Pájaro Azul

Maqueta visual sobre el proyecto Angular 21 existente. Solo contiene dos pantallas:

- `/login`: conserva el bosque violeta y la tarjeta translúcida. **Iniciar sesión** navega a `/dashboard`, incluso con los campos vacíos.
- `/dashboard`: indicadores, gráficas SVG, tickets y actividad con datos de ejemplo locales. **Cerrar sesión** vuelve a `/login`.

Tickets, Usuarios, Reportes y Configuración son opciones visuales deshabilitadas. No hay autenticación, validación de credenciales, backend, API, guards, roles ni gestión de tickets. La aplicación no realiza solicitudes HTTP de datos; sus fuentes, imágenes e iconos se sirven como archivos locales.

El botón de luna/sol cambia el tema de ambas pantallas. El estado visual solo vive en memoria y se reinicia al recargar; no utiliza localStorage, sessionStorage, cookies ni tokens. El menú lateral se despliega en tablet y móvil y se cierra con el fondo o con Escape.

## Ejecutar

Desde esta carpeta:

```bash
npm ci
npm start
```

Abrir `http://localhost:4200/login`. También se puede entrar directamente a `/dashboard`.

```bash
npm run build
npm test -- --watch=false
```

## Organización

- `src/app/pages/login/`: login existente.
- `src/app/pages/dashboard/`: layout y datos simulados en `dashboard.data.ts`.
- `src/app/pages/dashboard/layout/`: barra lateral.
- `src/app/pages/dashboard/widgets/`: indicadores, gráficas, tabla y actividad.
- `src/app/shared/`: estado visual en memoria y botón de tema.
- `src/app/app.scss`: colores de los temas claro y oscuro.
- `public/images/brand/`: logotipo local y su procedencia.

La distribución toma como referencia visual [Poseidon](https://poseidon.primeng.dev/dashboard-ecommerce); la implementación, los textos y los datos son propios de esta maqueta. Se usa el logotipo del [sitio oficial de Almacén Pájaro Azul](https://almacenpajaroazul.com/), PrimeIcons y la fuente Poppins con su licencia incluida. No se incorpora código, contenido ni recursos de la plantilla Poseidon.
