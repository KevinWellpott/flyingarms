/**
 * Einfache Authentifizierung für Admin-Bereich
 * WICHTIG: Dies ist nur für Entwicklung/Demo-Zwecke!
 * Für Produktion sollte ein echtes Auth-System verwendet werden.
 */

const ADMIN_USERNAME = 'root';
const ADMIN_PASSWORD = 'root';
const AUTH_KEY = 'admin_auth_token';

export function login(username: string, password: string): boolean {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Erstelle einen einfachen Token (in Produktion sollte dies sicherer sein)
    const token = btoa(`${username}:${Date.now()}`);
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, token);
    }
    return true;
  }
  return false;
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  const token = localStorage.getItem(AUTH_KEY);
  return token !== null && token.length > 0;
}

export function checkAuth(): boolean {
  return isAuthenticated();
}

