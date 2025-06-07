// Inicializar la página cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado');
    
    // Verificar si config está disponible
    if (!window.config) {
        console.error('Config no está disponible');
        return;
    }
    
    // Función para obtener token
    function getCookie(name) {
        return localStorage.getItem('token');
    }
    
    const token = getCookie('token');
    if (!token) {
        console.error('Token no encontrado');
        window.location.href = 'index.html';
        return;
    }
    // Obtener la ubicación del usuario
    getLocation();
    // Mostrar el nombre de usuario si existe en Base de datos
    fetchUser();
    
    // Función para obtener ubicación del usuario
function getLocation() {
    // Verificar si el navegador soporta geolocalización
    if (!('geolocation' in navigator)) {
        updateLocationUI('Geolocalización no soportada en tu navegador', true);
        return;
    }

    // Mostrar mensaje de carga
    updateLocationUI('Solicitando permiso para acceder a tu ubicación...', false);

    // Configurar opciones
    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };

    // Obtener la ubicación actual
    navigator.geolocation.getCurrentPosition(
        position => handleGeolocationSuccess(position),
        error => handleGeolocationError(error),
        options
    );
}

// Manejador de éxito de geolocalización
function handleGeolocationSuccess(position) {
    const { latitude, longitude } = position.coords;
    console.log('Ubicación obtenida:', { latitude, longitude });
    
    // Actualizar la UI
    updateLocationUI(`Ubicación actual: Lat: ${latitude.toFixed(6)}, Lon: ${longitude.toFixed(6)}`, false);
    
    // Obtener lugares cercanos
    fetchPlaces(latitude, longitude);
}

// Manejador de errores de geolocalización
function handleGeolocationError(error) {
    console.error('Error de geolocalización:', error);
    let message = 'Error al obtener la ubicación';
    
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message = 'Permiso de ubicación denegado. Por favor, habilita la geolocalización en la configuración de tu navegador.';
            break;
        case error.POSITION_UNAVAILABLE:
            message = 'La información de ubicación no está disponible.';
            break;
        case error.TIMEOUT:
            message = 'La solicitud de ubicación ha expirado.';
            break;
        default:
            message = 'Error desconocido de geolocalización.';
            break;
    }
    updateLocationUI(message, true);
}

// Función para actualizar la UI de la ubicación
function updateLocationUI(message, isLoading) {
    const ubicacionElement = document.getElementById('ubicacionActual');
    if (ubicacionElement) {
        ubicacionElement.textContent = message;
    }
}   

// Función para obtener mensaje de error de geolocalización
function getGeolocationErrorMessage(code) {
    switch (code) {
        case 1:
            return 'Error: Permiso denegado';
        case 2:
            return 'Error: Posición no disponible';
        case 3:
            return 'Error: Tiempo de espera agotado';
        default:
            return 'Error: Error desconocido';
    }
}

// Función para obtener lugares cercanos
async function fetchPlaces(lat, lon) {
    console.log('Buscando lugares cercanos a:', { lat, lon });
    const url = `${window.config.baseUrl}${window.config.routes.api.places}?lat=${lat}&lon=${lon}`;
    console.log('URL de la solicitud:', url);
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('Respuesta del servidor:', response);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Error en la respuesta:', errorData);
            throw new Error(errorData.detail || 'Error al obtener lugares cercanos');
        }
        
        const places = await response.json();
        console.log('Lugares encontrados:', places);
        
        if (!Array.isArray(places)) {
            throw new Error('Formato de respuesta inesperado');
        }
        
        if (places.length === 0) {
            showToast('No se encontraron lugares cercanos', 'info');
        }
        
        displayPlaces(places);
    } catch (error) {
        console.error('Error al obtener lugares cercanos:', error);
        showToast(error.message || 'Error al obtener lugares cercanos. Por favor, intenta nuevamente.', 'error');
    }
}

// Función para mostrar lugares en el DOM
function displayPlaces(places) {
    const placesContainer = document.getElementById('placesList');
    if (!placesContainer) return;

    // Limpiar el contenedor
    placesContainer.innerHTML = '';

    // Mostrar cada lugar
    places.forEach(place => {
        const placeElement = document.createElement('div');
        placeElement.className = 'place-item';
        placeElement.innerHTML = `
            <h3>${place.name}</h3>
            <p>${place.address}</p>
            <p>Categoría: ${place.category}</p>
            <p>Distancia: ${place.distance.toFixed(2)} metros</p>
        `;
        placesContainer.appendChild(placeElement);
    });
}

// Función para mostrar notificaciones
function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Iniciar la geolocalización al cargar la página
window.addEventListener('load', getLocation);
});