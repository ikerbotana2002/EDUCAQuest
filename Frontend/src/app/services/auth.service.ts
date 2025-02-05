import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  private isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  isAuthenticated(): boolean {
    if (this.isLocalStorageAvailable()) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  getUserRole(): number {
    if (this.isLocalStorageAvailable()) {
      return parseInt(localStorage.getItem('rol_id') || '0', 10);
    }
    return 0;
  }

  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('token');
      localStorage.removeItem('rol_id');
      localStorage.removeItem('user_id');
    }
  }
}