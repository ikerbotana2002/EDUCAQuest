import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Activity } from '../interfaces/activity';
import { Observable } from 'rxjs';
import { Process } from '../interfaces/process';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    AppUrl: string;
    APIUrl: string;

    constructor(private http: HttpClient) {
        this.AppUrl = environment.apiUrl;
        this.APIUrl = 'api/activity';
    }

    saveActivity(activity: Activity): Observable<any> {
        return this.http.post(`${this.AppUrl}api/activity/register`, activity);
    }

    getActivities(): Observable<Activity[]> {
        console.log(`${this.AppUrl}${this.APIUrl}/getActivities`);
        return this.http.get<Activity[]>(`${this.AppUrl}${this.APIUrl}/getActivities`);
        //const token = localStorage.getItem('token');
        //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        //return this.http.get<User[]>(`${this.AppUrl}${this.APIUrl}/getUsers`, {headers : headers});
    }


}