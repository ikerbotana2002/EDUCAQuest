import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivityService } from '../../../services/activity.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProcessService } from '../../../services/process.service';
import { SubjectService } from '../../../services/subject.service';
@Component({
  selector: 'app-activity',
  standalone: false,

  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'

})
export class ActivityComponent {

  activities: any[] = [];
  users: any[] = [];
  processes: any[] = [];
  subjects: any[] = [];

  activityId: any = {};
  actualRoute: string | null = null;

  processId: any = {};

  selectedOption: string = 'Bien';

  id_user: number = 0;
  
  constructor(private subjectService: SubjectService, private activityService: ActivityService, private userService: UserService, private activatedRoute: ActivatedRoute, private processService: ProcessService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.activityService.getActivities().subscribe((data) => {
      this.activities = data;
    });

    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.sortUsersByLastName(); // Ordena los usuarios por apellido
    });

    this.processService.getProcesses().subscribe((data) => {
      this.processes = data;
    });

    this.subjectService.getSubjects().subscribe((data) => {
      this.subjects = data;
    });

    const userIdString = localStorage.getItem('user_id');
    if (userIdString) {
      this.id_user = parseInt(userIdString, 10); // Asigna el id del usuario actual
    }

    this.actualRoute = this.activatedRoute.snapshot.url.map(segment => segment.path).join('/');
    this.activityId = this.actualRoute.split('/').pop(); // para obtener el id de la actividad (extraido de la ruta)

  }

  saveChanges(feedback: string, idUser: number, id_activity: number, additionalComment: string): void {
    this.processService.updateFeedback(feedback, idUser, id_activity, additionalComment).subscribe({
      next: (v) => {
        this.toastr.success(`Feedback actualizado`, '');
        this.router.navigate(['/dashboardProfesor']);
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
  
  sortUsersByLastName(): void {
    this.users.sort((a, b) => a.lastname.localeCompare(b.lastname));
  }

  getSubjectNameById(id: number): string {
    const subject = this.subjects.find(sub => sub.id === id);
    return subject ? subject.name : '';
  }

  getSubjectDegreeById(id: number): number {
    const subject = this.subjects.find(sub => sub.id === id);
    return subject ? subject.degree : 0;
  }

  getSubjectColor(id: number): string {
    const subjectName = this.getSubjectNameById(id);
    if (subjectName === 'Matemáticas') {
      return '#0b60ff'; //azul
    } else if (subjectName === 'Lengua') {
      return '#e63939'; //rojo
    } else if (subjectName === 'Historia') {
      return '#921ff0'; //morado
    } else if (subjectName === 'Inglés') {
      return '#45a3da'; //turquesa
    } else if (subjectName === 'Sueño') {
      return '#90eea4'; //verde claro casi gris
    } else if (subjectName === 'Salud mental') {
      return '#26e436'; //verde
    } else if (subjectName === 'Nutrición') {
      return '#ff9c1b'; //naranja
    } else if (subjectName === 'Ejercicio') {
      return '#ff5555'; //salmon
    } else if (subjectName === 'Lectura') {
      return '#f78bd6'; //rosa palo
    }

    return 'black'; // Color por defecto
  }
}
