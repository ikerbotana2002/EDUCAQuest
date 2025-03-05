import { Component } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { Router } from '@angular/router';
import { Activity } from '../../interfaces/activity';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Process } from '../../interfaces/process';
import { UserService } from '../../services/user.service';
import { ProcessService } from '../../services/process.service';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

  users: any[] = [];
  activities: any[] = [];
  subjects: any[] = [];
  processes: any[] = [];
  id_user: number = 0;

  constructor(private subjectService: SubjectService, private _activityService: ActivityService, private toastr: ToastrService, private router: Router, private _userService: UserService, private _processService: ProcessService) { }
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

    this.subjectService.getSubjects().subscribe((data) => {
      this.subjects = data;
    });

    this._processService.getProcesses().subscribe((data) => {
      this.processes = data;
    });
  }

  getRolName(rolId: number): string {
    switch (rolId) {
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

  formatDate(date: string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`.toUpperCase();
  }

  getSubjectNameById(id: number): string {
    const subject = this.subjects.find(sub => sub.id === id);
    return subject ? subject.name : '';
  }

  getSubjectColor(id: number): string {
    const subjectName = this.getSubjectNameById(id);
    if (subjectName === 'Matemáticas') {
      return 'blue';
    } else if (subjectName === 'Lengua') {
      return 'red';
    } else if (subjectName === 'Historia') {
      return 'purple';
    } else if (subjectName === 'Inglés') {
      return 'turquoise';
    } else if (subjectName === 'Sueño') {
      return 'darkred';
    } else if (subjectName === 'Salud mental') {
      return 'cyan';
    } else if (subjectName === 'Nutrición') {
      return 'yellow';
    } else if (subjectName === 'Ejercicio') {
      return 'darkgreen';
    } else if (subjectName === 'Lectura') {
      return 'lightgreen';
    }
  
    return 'black'; // Color por defecto
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
