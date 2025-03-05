import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Child } from '../interfaces/child';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

    AppUrl: string;
    APIUrl: string;

    constructor(private http: HttpClient) {
        this.AppUrl = environment.apiUrl;
        this.APIUrl = 'api/child';
    }

    getChildren(): Observable<Child[]> {
        return this.http.get<Child[]>(`${this.AppUrl}${this.APIUrl}/getChildren`);
    }

}
