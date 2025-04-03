import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { ActivityService } from '../../services/activity.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProcessService } from '../../services/process.service';
import { Process } from '../../interfaces/process';
import { ChildService } from '../../services/child.service';

@Component({
  selector: 'app-dashboard-tutor',
  templateUrl: './dashboard-tutor.component.html',
  styleUrls: ['./dashboard-tutor.component.css'],
  standalone: false,
})
export class DashboardTutorComponent implements OnInit {

  users: any[] = [];
  activities: any[] = [];
  processes: any[] = [];
  children: any[] = [];

  id_user: number = 0;

  constructor(
    private _childService: ChildService,
    private _activityService: ActivityService,
    private toastr: ToastrService,
    private router: Router,
    private _userService: UserService,
    private _processService: ProcessService
  ) { }

  ngOnInit(): void {
    const userIdString = localStorage.getItem('user_id');
    if (userIdString) {
      this.id_user = parseInt(userIdString, 10); // Asigna el id del usuario actual
    }

    this._userService.getUsers().subscribe((data) => {
      this.users = data;
    });

    this._activityService.getActivities().subscribe((data) => {
      this.activities = data.map(activity => ({ ...activity, selectedOptions: {} }));
    });

    this._processService.getProcesses().subscribe((data) => {
      this.processes = data;
    });

    this._childService.getChildren().subscribe((data) => {
      this.children = data;
      console.log(this.children);
    });
  }

  getUserNameById(id: number): string {
    const user = this.users.find(user => user.id === id);
    return user ? `${user.name} ${user.lastname}` : 'Usuario no encontrado';
  }

  saveChanges(feedback: string, idActivity: number, idChild: number): void {
    const process: Process = {
      id_activity: idActivity,
      id_user: idChild,
      result: "",
      feedback: feedback,
      additionalComment: "",
    };

    this._processService.saveHomeActivityProcess(process).subscribe({
      next: (v) => {
        this.toastr.success(`Feedback actualizado para el hijo ${idChild}`, '');
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

  getRolName(): string {
    const rol_id = this.users.find(user => user.id === this.id_user)?.rol_id;
    switch (rol_id) {
      case 0:
        return 'Alumno';
      case 1:
        return 'Profesor';
      case 2:
        return 'Admin';
      case 3:
        return 'Padre';
      default:
        return 'DESCONOCIDO';
    }
  }

  getUserName(): string | undefined {
    return this.users.find(user => user.id === this.id_user)?.name + ' ' + this.users.find(user => user.id === this.id_user)?.lastname;
  }

  getAvatar(): string | undefined {
    return this.users.find(user => user.id === this.id_user)?.avatar;
  } 
}