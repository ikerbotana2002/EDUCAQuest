import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Subject } from '../interfaces/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

    AppUrl: string;
    APIUrl: string;

    constructor(private http: HttpClient) {
        this.AppUrl = environment.apiUrl;
        this.APIUrl = 'api/subject';
    }

    getSubjects(): Observable<Subject[]> {
        return this.http.get<Subject[]>(`${this.AppUrl}${this.APIUrl}/getSubjects`);
    }

}
