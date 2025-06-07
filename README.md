# Frontend UI - Recomienda App

Interfaz web moderna y responsiva para la búsqueda y gestión de lugares cercanos, desarrollada con HTML5, CSS3 y JavaScript puro.

## Características

- Interfaz de usuario intuitiva y responsiva
- Autenticación de usuarios (registro e inicio de sesión)
- Búsqueda de lugares cercanos usando geolocalización
- Gestión de lugares favoritos
- Diseño moderno con animaciones suaves
- Compatible con dispositivos móviles y escritorio
- Integración con API RESTful

## Tecnologías utilizadas

- HTML5
- CSS3 (con Flexbox y Grid)
- JavaScript (ES6+)
- [Bootstrap 5.3](https://getbootstrap.com/)
- [SweetAlert2](https://sweetalert2.github.io/) para alertas
- [AOS - Animate On Scroll](https://michalsnik.github.io/aos/)
- [Toastify](https://apvarun.github.io/toastify-js/) para notificaciones

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd frontend-ui
```

2. Abrir el archivo `index.html` en tu navegador web.

> **Nota:** Para desarrollo, se recomienda usar un servidor web local como `live-server` o `http-server`.

## Estructura del Proyecto

```
frontend-ui/
├── index.html          # Página de inicio de sesión/registro
├── buscador.html       # Página principal de búsqueda
├── styles.css          # Estilos globales
└── js/
    ├── config.js     # Configuración de la aplicación
    ├── index.js       # Lógica de autenticación
    └── search.js      # Lógica de búsqueda y mapa
```

## Configuración

El archivo `js/config.js` contiene las configuraciones de la aplicación:

```javascript
// URL base de la API
const API_BASE_URL = 'http://localhost:8000';

// Configuración del mapa (si se usa)
const MAP_CONFIG = {
    defaultZoom: 15,
    defaultCenter: [4.7109, -74.0721] // Bogotá por defecto
};
```

## Diseño

La interfaz utiliza un diseño limpio y moderno con:

- Paleta de colores profesional
- Tipografía clara y legible
- Diseño responsivo que se adapta a cualquier dispositivo
- Animaciones suaves para mejor experiencia de usuario
- Iconos de Bootstrap Icons

## Autenticación

La aplicación maneja la autenticación usando JWT (JSON Web Tokens) que se almacenan en el `localStorage` del navegador.

### Flujo de autenticación:

1. Usuario se registra o inicia sesión
2. El servidor devuelve un token JWT
3. El token se almacena en `localStorage`
4. Todas las solicitudes posteriores incluyen el token en el encabezado `Authorization`

## Búsqueda de lugares

La búsqueda de lugares utiliza la API de geolocalización del navegador para encontrar ubicaciones cercanas. El usuario debe otorgar permisos de ubicación para utilizar esta función.

## Pruebas

Para probar la aplicación:

1. Abre `index.html` en tu navegador
2. Regístrate con un correo electrónico y contraseña
3. Inicia sesión con tus credenciales
4. Otorga permisos de ubicación cuando se te solicite
5. Explora los lugares cercanos

## Solución de problemas

### No se pueden cargar los recursos
- Asegúrate de que el servidor backend esté en ejecución
- Verifica que la URL de la API en `config.js` sea correcta

### Problemas de CORS
- El servidor backend debe estar configurado para aceptar solicitudes desde tu dominio
- Verifica que los encabezados CORS estén configurados correctamente en el backend

## Contribución

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Créditos

- [Bootstrap 5](https://getbootstrap.com/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [AOS - Animate On Scroll](https://michalsnik.github.io/aos/)
- [Toastify](https://apvarun.github.io/toastify-js/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
