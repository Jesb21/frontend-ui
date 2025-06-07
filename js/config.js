// window.config = {
//     apiUrl: 'http://localhost:8000',
//     endpoints: {
//         places: `${window.config.apiUrl}/api/v1/places`,
//         login: `${window.config.apiUrl}/auth/login`,
//         register: `${window.config.apiUrl}/auth/register`
//     }
// };

window.config = {
    baseUrl: 'http://localhost:8000',
    routes: {
        api: {
            places: '/api/v1/places',
            login: '/auth/login',
            register: '/auth/register'
        }
    },
    // Mantener compatibilidad con el código existente
    apiUrl: 'http://localhost:8000',
};