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

    updateActivity(activityName: string, activityAvailable: number): Observable<any> {
        return this.http.patch(`${this.AppUrl}api/activity/update`, { activityName, activityAvailable } );
    }

    getActivities(): Observable<Activity[]> {
        return this.http.get<Activity[]>(`${this.AppUrl}${this.APIUrl}/getActivities`);
    }

}