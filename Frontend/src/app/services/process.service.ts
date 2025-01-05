import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Process } from '../interfaces/process';

@Injectable({
    providedIn: 'root'
})
export class ProcessService {

    AppUrl: string;
    APIUrl: string;

    constructor(private http: HttpClient) {
        this.AppUrl = environment.apiUrl;
        this.APIUrl = 'api/process';
    }

    saveProcess(process: Process): Observable<any> {
        return this.http.post(`${this.AppUrl}${this.APIUrl}/register`, process);
    }

    getProcesses(): Observable<Process[]> {
        console.log(`${this.AppUrl}${this.APIUrl}/getProcesses`);
        return this.http.get<Process[]>(`${this.AppUrl}${this.APIUrl}/getProcesses`);
        //const token = localStorage.getItem('token');
        //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        //return this.http.get<User[]>(`${this.AppUrl}${this.APIUrl}/getUsers`, {headers : headers});
    }
}