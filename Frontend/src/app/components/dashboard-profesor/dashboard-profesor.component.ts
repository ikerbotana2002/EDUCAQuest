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
import { ProcessService } from '../../services/process.service';


@Component({
  selector: 'app-dashboard-profesor',
  standalone: false,

  templateUrl: './dashboard-profesor.component.html',
  styleUrl: './dashboard-profesor.component.css'
})

export class DashboardProfesorComponent {
  users: any[] = [];
  activities: any[] = [];
  sortedActivities: any[] = []; // Lista ordenada
  id_user: number = 0;
  activityTypes: any[] = [];
  subjects: any[] = [];
  processes: any[] = [];
  selectedSortOption: string = 'id'; // Opción por defecto
  selectedSubject: string = ''; // Variable para almacenar la asignatura seleccionada
  allActivities: any[] = [];

  isListView = false;


  constructor(
    private subjectService: SubjectService,
    private typesActivityService: TypesActivityService,
    private activityService: ActivityService,
    private router: Router,
    private toastr: ToastrService,
    private _userService: UserService,
    private _processService: ProcessService
  ) {}

  ngOnInit(): void {
    this.activityService.getActivities().subscribe((data) => {
      this.activities = data;
      this.allActivities = data;
      this.sortActivities(); // Aplicamos orden inicial
    });

    this._userService.getUsers().subscribe((data) => {
      this.users = data;
    });

    this._processService.getProcesses().subscribe((data) => {
      this.processes = data;
    });

    const userIdString = localStorage.getItem('user_id');
    if (userIdString) {
      this.id_user = parseInt(userIdString, 10);
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
    const subject = this.subjects.find((sub) => sub.id === id);
    return subject ? subject.name : '';
  }

  getSubjectDegreeById(id: number): number | string {
    const subject = this.subjects.find((sub) => sub.id === id);
    return subject ? subject.degree : 'Grado no encontrado';
  }

  getSubjectColor(id: number): string {
    const subjectName = this.getSubjectNameById(id);
    const colors: { [key: string]: string } = {
      'Matemáticas': 'blue',
      'Lengua': 'red',
      'Historia': 'purple',
      'Inglés': 'turquoise',
      'Sueño': 'darkred',
      'Salud mental': 'cyan',
      'Nutrición': 'yellow',
      'Ejercicio': 'darkgreen',
      'Lectura': 'lightgreen'
    };
    return colors[subjectName] || 'black';
  }

  // Ordena las actividades según la opción seleccionada
  sortActivities(): void {
    this.sortedActivities = [...this.activities]; // Copia de la lista para no modificar la original
  
    switch (this.selectedSortOption) {
      case 'id':
        this.sortedActivities.sort((a, b) => a.id - b.id);
        break;
      case 'subject':
        this.sortedActivities.sort((a, b) =>
          this.getSubjectNameById(a.id_subject).localeCompare(this.getSubjectNameById(b.id_subject))
        );
        break;
      case 'available':
        this.sortedActivities.sort((a, b) => Number(b.available) - Number(a.available));
        break;
      case 'completion':
        this.sortedActivities.sort((a, b) =>
          this.getCompletionPercentage(b.id) - this.getCompletionPercentage(a.id)
        );
        break;
    }
  }
  

  onToggle(event: Event, activityId: number): void {
    const checkbox = event.target as HTMLInputElement;
    const activity = this.activities.find((activity) => activity.id === activityId);

    if (activity) {
      activity.available = checkbox.checked ? 1 : 0;
      this.activityService.updateActivity(activity.name, activity.available).subscribe({
        next: () => {
          this.toastr.success('Disponibilidad de la actividad modificada', '');
          this.sortActivities(); // Reordenar después del cambio
        },
        error: (e: HttpErrorResponse) => {
          this.toastr.error(e.error.message || 'Error en el servidor', '');
        }
      });
    }
  }

  navigateToCreateActivity(): void {
    this.router.navigate(['/createActivity']);
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

  getCompletionPercentage(activityId: number): number {
    const completedProcesses = this.processes.filter(process => process.id_activity === activityId).length;
    const totalStudents = this.users.filter(user => user.rol_id === 0).length; // Asumiendo que rol_id = 0 es para alumnos

    return totalStudents > 0 ? Math.round((completedProcesses / totalStudents) * 100) : 0;
  }

  filterBySubject(): void {
    if (this.selectedSubject) {
      this.sortedActivities = this.activities.filter(
        (activity) => activity.id_subject === +this.selectedSubject
      );
    } else {
      this.sortedActivities = [...this.allActivities]; // Muestra todas las actividades si no hay filtro
    }
    this.activities = this.sortedActivities; //para que si quieres ordenar te salgan solo las que has filtrado y no todas de nuevo
  }

  resetActivities(): void {
    this.activities = [...this.allActivities]; // Restaura todas las actividades
    this.sortedActivities = [...this.allActivities]; // Asegura que también se actualicen las actividades ordenadas
  }
  
  goBack(): void {
    window.history.back(); // Navega a la página anterior
  }
}


