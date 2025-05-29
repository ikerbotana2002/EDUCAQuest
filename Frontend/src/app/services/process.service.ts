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

    saveHomeActivityProcess(process: Process): Observable<any> {
        return this.http.post(`${this.AppUrl}${this.APIUrl}/registerHomeActivityProcess`, process);
    }

    getProcesses(): Observable<Process[]> {
        return this.http.get<Process[]>(`${this.AppUrl}${this.APIUrl}/getProcesses`);
    }

    updateFeedback(feedback: number, id_user: number, id_activity: number, additionalComment: string): Observable<any> {
        return this.http.patch(`${this.AppUrl}${this.APIUrl}/updateFeedback`, { feedback, id_user, id_activity, additionalComment });
    }
}