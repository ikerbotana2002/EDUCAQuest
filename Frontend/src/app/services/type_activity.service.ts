import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { TypesActivity } from '../interfaces/type_activity';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TypesActivityService {

    AppUrl: string;
    APIUrl: string;

    constructor(private http: HttpClient) {
        this.AppUrl = environment.apiUrl;
        this.APIUrl = 'api/type_activity';
    }

    getTypesActivity(): Observable<TypesActivity[]> {
        return this.http.get<TypesActivity[]>(`${this.AppUrl}${this.APIUrl}/getTypesActivity`);
    }

}