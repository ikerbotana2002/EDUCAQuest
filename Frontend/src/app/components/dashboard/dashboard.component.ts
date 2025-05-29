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
  sortedActivities: Activity[] = [];
  coordinates: any[] = [
    { id: 1, x: 65, y: 40 },  // 1075px → 75% | 100px → 5%
    { id: 2, x: 62, y: 55 }, 
    { id: 3, x: 69, y: 70 }, 
    { id: 4, x: 66, y: 85 },
    { id: 5, x: 61, y: 100 },
    { id: 6, x: 68, y: 115 },
    { id: 7, x: 66, y: 130 },
    { id: 8, x: 67, y: 145 },
    { id: 9, x: 62, y: 160 },
    { id: 10, x: 61, y: 175 },
    { id: 11, x: 55, y: 190 },
    { id: 12, x: 70, y: 200 },
    { id: 13, x: 73, y: 200 },
    { id: 14, x: 55, y: 200 },
    { id: 15, x: 38, y: 200 }
  ];

  showDropdown: boolean = false;


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

  getActivityCoordinates(activityId: number) {
    const coord = this.coordinates.find(c => c.id === activityId);
    return coord ? coord : { x: 0, y: 0 }; // Si no hay coordenadas, devolver (0, 0)
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

  getFeedbackStatus(activityId: number): any {
    const process = this.processes.find(
      (process) => process.id_activity === activityId && process.id_user === this.id_user
    );

    const activity = this.activities.find(
      (activity) => activity.id === activityId
    );

    if (activity.available === 0) {
      return 'Actividad no disponible';
    }
    
    if (process) {
      if (process.feedback === 0) {
        return 'Esperando corrección';

      } else if (process.feedback === 1 || process.feedback === 2 || process.feedback === 3) {
        return process.feedback;

      } else if (!process.feedback) {
        return 'Esperando corrección';
      }
    }

    // Si no se encontró ningún proceso, pero la fecha límite aun no ha expirado, se sigue esperando a que el deadline termine para darla por mala
    else if (!process && !this.getTimeRemaining(activity.deadline).expired) {
      return 'Esperando respuesta';
    }

    // Si no se encontró ningún proceso, y la fecha límite ha expirado, se da por mala
    return 'No respondida';
  }

  getSubjectImage(subjectId: number): string {
    const subject = this.subjects.find(a => a.id === subjectId);
    if (!subject) {
      return 'assets/mapa.png'; // Imagen por defecto si no se encuentra la actividad
    }

    switch (subject.name) { // Suponiendo que `id_subject` identifica el tipo de actividad
      case "Matemáticas":
        return 'assets/mates.png';
      case "Lengua":
        return 'assets/lengua.png';
      case "Historia":
        return 'assets/historia.png';
      case "Inglés":
        return 'assets/ingles1.png';
      case "Sueño":
        return 'assets/sueño.png';
      case "Salud mental":
        return 'assets/salud-mental.png';
      case "Nutrición":
        return 'assets/nutricion.png';
      case "Ejercicio":
        return 'assets/ejercicio.png';
      case "Lectura":
        return 'assets/lectura.png';
      default:
        return 'assets/mapa.png'; // Imagen por defecto para otros casos
    }
  }

  getUniqueSubjects(): any[] {
    return this.subjects.filter((subject, index, self) =>
      index === self.findIndex((s) => s.name === subject.name)
    );
  }

  getTotalStars(): number {
    const userProcesses = this.processes.filter(process => process.id_user === this.id_user);
    return userProcesses.reduce((total, process) => total + (process.feedback || 0), 0);
  }

  logout() {
    // Aquí puedes limpiar sesión si es necesario
    this.router.navigate(['/login']);
  }
  
  goBack(): void {
    window.history.back(); // Navega a la página anterior
  }
}
