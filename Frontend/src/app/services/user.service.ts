import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  AppUrl: string;
  APIUrl: string;

  constructor(private http: HttpClient) {
    this.AppUrl = environment.apiUrl;
    this.APIUrl = 'api/user';
  }

  //con el usuario que recibe del formulario hace un una solicitud http post a localhost:3017/api/user/register/    
  register(user: User): Observable<any> { 
    return this.http.post(`${this.AppUrl}${this.APIUrl}/register`, user);
  }

  login(user: User): Observable<string> {  //es string porque nos va a traer el usuario y la contraseña
    return this.http.post<string>(`${this.AppUrl}${this.APIUrl}/login`, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.AppUrl}${this.APIUrl}/getUsers`);
  }

  // Método para actualizar el rol de un usuario
  updateRol(newRol: number, email: string): Observable<any> {
    return this.http.patch(`${this.AppUrl}${this.APIUrl}/updateRol`, { newRol, email });
  }

  updateAvatar(archivo: string, id_user: Number): Observable<any> {
    return this.http.patch(`${this.AppUrl}${this.APIUrl}/updateAvatar`, { archivo, id_user });
  }
}
