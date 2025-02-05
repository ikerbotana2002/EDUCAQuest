import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { ActivityService } from '../../services/activity.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProcessService } from '../../services/process.service';
import { Process } from '../../interfaces/process';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-dashboard-tutor',
  standalone: false,

  templateUrl: './dashboard-tutor.component.html',
  styleUrl: './dashboard-tutor.component.css'
})


export class DashboardTutorComponent {

  users: any[] = [];
  activities: any[] = [];
  processes: any[] = [];

  name: string = '';
  description: string = '';

  id_activity: number = 0;
  id_user: number = 0;
  result: string = '';
  id_children: number = 0;

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

    this._processService.getProcesses().subscribe((data) => {
      this.processes = data;
    });
  }

  saveChanges(feedback: string, idActivity: number): void {
    const user = this.users.find(user => user.id === this.id_user);
    if (!user) {
      this.toastr.error('Usuario no encontrado', 'Error');
      return;
    }

    const id_child = user.children_id;
    if (!id_child) {
      this.toastr.error('No se encontró el hijo', 'Error');
      return;
    }
    const process: Process = {
      id_activity: idActivity,
      id_user: id_child,
      result: "",
      feedback: feedback,
      additionalComment: "",
    }

    this._processService.saveHomeActivityProcess(process).subscribe({
      next: (v) => {
        this.toastr.success(`Feedback actualizado`, '');
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        if (e.error.message) {
          this.toastr.error(e.error.message, '');
        } else {
          this.toastr.error('Ya corregiste esta actividad', '');
        }
      }
    });
  }
}