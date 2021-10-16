const TOKEN_KEY     = 'OAuthToken';
const PERMISO_KEY   = 'Permisos'
const USER_DATA_KEY = 'UserData'
const MODULOS_KEY   = 'Modulos'

export function removeSession() {
    window.localStorage.clear();
}

export function removeToken() {
    window.localStorage.removeItem(TOKEN_KEY);
}

export function saveToken(token: string) {
    removeToken()
    window.localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
}