import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { ActivityService } from '../../services/activity.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-dashboard-profesor',
  standalone: false,

  templateUrl: './dashboard-profesor.component.html',
  styleUrl: './dashboard-profesor.component.css'
})
export class DashboardProfesorComponent {

  users: any[] = [];
  activities: any[] = [];
  id_user: number = 0;

  constructor(private activityService: ActivityService, private router: Router, private toastr: ToastrService, private _userService: UserService) { }

  ngOnInit(): void {
    this.activityService.getActivities().subscribe((data) => {
      this.activities = data;
    });

    this._userService.getUsers().subscribe((data) => {
      this.users = data;
    });

    const userIdString = localStorage.getItem('user_id');
    if (userIdString) {
      this.id_user = parseInt(userIdString, 10); // Asigna el id del usuario actual
    }
  }

  onToggle(event: Event, activityId: Number): void {
    const checkbox = event.target as HTMLInputElement;
    const activity = this.activities.find(activity => activity.id === activityId);

    if (checkbox.checked) {
      // Acción para estado ON
      activity.available = 1;
    } else {
      // Acción para estado OFF
      activity.available = 0;
    }

    this.activityService.updateActivity(activity.name, activity.available).subscribe({
      next: (v) => {
        this.toastr.success('Disponibilidad de la actividad modificada', '');
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        if (e.error.message) {
          this.toastr.error(e.error.message, '');
        } else {
          this.toastr.error('Error en el servidor', '');
        }
      }
    });
  }

  navigateToCreateActivity(): void {
    this.router.navigate(['/createActivity']);
  }
}