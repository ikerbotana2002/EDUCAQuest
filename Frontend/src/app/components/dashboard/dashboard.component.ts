import { Component } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { Router } from '@angular/router';
import { Activity } from '../../interfaces/activity';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Process } from '../../interfaces/process';
import { UserService } from '../../services/user.service';
import { ProcessService } from '../../services/process.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

  users: any[] = [];
  activities: any[] = [];

  id_user: number = 0;

  constructor(private _activityService: ActivityService, private toastr: ToastrService, private router: Router, private _userService: UserService, private _processService: ProcessService) { }
  ngOnInit(): void {

    const userIdString = localStorage.getItem('user_id');
    if (userIdString) {
      this.id_user = parseInt(userIdString, 10); // Asigna el id del usuario actual
    }

    this._userService.getUsers().subscribe((data) => {
      this.users = data;
    });

    this._activityService.getActivities().subscribe((data) => {
      this.activities = data;
    });
  }

  getTimeRemaining(deadline: string): { text: string, expired: boolean } {
    const now = new Date().getTime();
    const end = new Date(deadline).getTime();
    const timeDiff = end - now;

    if (timeDiff <= 0) {
      return { text: 'Tiempo expirado', expired: true };
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return { text: `${days} días y ${hours} horas restantes`, expired: false };
  }
}
