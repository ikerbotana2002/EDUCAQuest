import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { ActivityService } from '../../services/activity.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { TypesActivityService } from '../../services/type_activity.service';
import { SubjectService } from '../../services/subject.service';


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
  activityTypes: any[] = [];
  subjects: any[] = [];

  constructor(private subjectService: SubjectService, private typesActivityService: TypesActivityService, private activityService: ActivityService, private router: Router, private toastr: ToastrService, private _userService: UserService) { }

  ngOnInit(): void {
    this.activityService.getActivities().subscribe((data) => {
      this.activities = data;
      this.sortActivities();
    });

    this._userService.getUsers().subscribe((data) => {
      this.users = data;
    });

    const userIdString = localStorage.getItem('user_id');
    if (userIdString) {
      this.id_user = parseInt(userIdString, 10); // Asigna el id del usuario actual
    }

    this.typesActivityService.getTypesActivity().subscribe((data) => {
      this.activityTypes = data;
    });

    this.subjectService.getSubjects().subscribe((data) => {
      this.subjects = data;
      this.sortActivities();
    });
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

  sortActivities(): void {
    const order = ['Matemáticas', 'Lengua', 'Historia', 'Inglés', 'Sueño', 'Salud mental', 'Nutrición', 'Ejercicio', 'Lectura'];
    this.activities.sort((a, b) => {
      const subjectA = this.getSubjectNameById(a.id_subject);
      const subjectB = this.getSubjectNameById(b.id_subject);
      return order.indexOf(subjectA) - order.indexOf(subjectB);
    });
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
}