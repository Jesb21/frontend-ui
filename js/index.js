window.config = {
    baseUrl: 'http://localhost:8000',
    routes: {
        login: '/login',
        buscador: '/buscador',
        inicio: '/',
        api: {
            auth: '/api/v1/auth',
            places: '/api/v1/places'
        }
    }
};

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

function deleteCookie(name) {
    localStorage.removeItem('token');
}
function saveToken(token) {
    localStorage.setItem('token', token);
}

function hasValidToken() {
    const token = getCookie('token');
    return !!token;
}

document.addEventListener('DOMContentLoaded', () => {
    if (hasValidToken()) {
        window.location.href = `${window.config.baseUrl}${window.config.routes.buscador}`;
    }
});
async function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch(`${window.config.baseUrl}${window.config.routes.api.auth}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            showToast(error.detail || 'Error al registrar usuario', 'error');
            return;
        }

        if (response.status === 400) {
            const error = await response.json();
            showToast(error.detail || 'Usuario ya existe', 'error');
            return;
        }

        const data = await response.json();
        alert(JSON.stringify(data));
        showToast('Registro exitoso. Ahora puedes iniciar sesión.', 'success');
        
        window.location.href = window.config.routes.login;
    } catch (error) {
        console.error('Error:', error);
        showToast(error.message || 'Error al registrar usuario. Por favor, intenta nuevamente.', 'error');
    }
}
async function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${window.config.baseUrl}${window.config.routes.api.auth}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const error = await response.json();
            showToast(error.detail || 'Error al iniciar sesión', 'error');
            return;
        }

        if (response.status === 401) {
            const error = await response.json();
            showToast(error.detail || 'Credenciales inválidas', 'error');
            return;
        }

        const data = await response.json();
        const token = data.access_token;

        if (!token) {
            showToast('Token no recibido', 'error');
            return;
        }

        saveToken(token);
        showToast('Inicio de sesión exitoso', 'success');
        window.location.href = 'buscador.html';
    } catch (error) {
        console.error('Error:', error);
        showToast(error.message || 'Error al iniciar sesión. Por favor, intenta nuevamente.', 'error');
    }
}

function cerrarSesion() {
    deleteCookie('token');
    showToast('Sesión cerrada exitosamente', 'success');
    window.location.href = 'index.html';
}

function showToast(message, type) {
    alert(message);
}