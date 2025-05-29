import { Component } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { Router } from '@angular/router';
import { Activity } from '../../interfaces/activity';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Process } from '../../interfaces/process';
import { UserService } from '../../services/user.service';
import { ProcessService } from '../../services/process.service';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from '../../services/subject.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-activity-alumno',
  standalone: false,

  templateUrl: './activity-alumno.component.html',
  styleUrl: './activity-alumno.component.css'
})
export class ActivityAlumnoComponent {

  users: any[] = [];
  activities: any[] = [];
  processes: any[] = [];
  subjects: any[] = [];

  name: string = '';
  description: string = '';

  activityId: any = {};
  actualRoute: string | null = null;

  id_activity: number = 0;
  id_user: number = 0;
  //result: string = '';
  result: string[] = [];

  youtubeLink!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private subjectService: SubjectService, private _activityService: ActivityService, private toastr: ToastrService, private router: Router, private _userService: UserService, private _processService: ProcessService, private activatedRoute: ActivatedRoute) {}

  
  ngOnInit(): void {

    //const rawUrl = 'https://www.youtube.com/embed/DasATN8Zr3I?si=ONR2ZjgYsHahDzNv';
    //this.youtubeLink = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);

    const userIdString = localStorage.getItem('user_id');
    if (userIdString) {
      this.id_user = parseInt(userIdString, 10); // Asigna el id del usuario actual
    }

    this._userService.getUsers().subscribe((data) => {
      this.users = data;
    });

    this._activityService.getActivities().subscribe((data) => {
      this.activities = data;
      const activityActual = this.activities.find(act => act.id == this.activityId);
      const rawUrl = activityActual.photo;
      this.youtubeLink = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);


    });

    this._processService.getProcesses().subscribe((data) => {
      this.processes = data;
    });

    this.subjectService.getSubjects().subscribe((data) => {
      this.subjects = data;
    });

    this.actualRoute = this.activatedRoute.snapshot.url.map(segment => segment.path).join('/');
    this.activityId = this.actualRoute.split('/').pop(); // para obtener el id de la actividad (extraido de la ruta)

  }

  saveString(): void {
    if (!this.result || this.result.length === 0 || this.result.some(r => r.trim() === '')) {
      this.toastr.error('Todos los resultados deben estar completos', 'Error');
      return;
    }

    const formattedResults = this.result.map((res, index) => {
      const letter = this.getLetterFromIndex(index);
      return `${letter}=${res}`;
    }).join(', ');

    const process: Process = {
      id_activity: this.activityId,
      id_user: this.id_user,
      result: formattedResults,
      feedback: 0,
      additionalComment: '',
    };

    this._processService.saveProcess(process).subscribe({
      next: (v) => {
        this.toastr.success(`Actividad completada, esperando corrección...`, '');
        this.router.navigate(['/dashboard']);
      },
      error: (e: HttpErrorResponse) => {
        if (e.error.message) {
          this.toastr.error(e.error.message, '');
        } else {
          this.toastr.error('Ya respondiste a esta actividad', '');
        }
      }
    });
  }


  getTimeRemaining(deadline: string, activity_id: number): { text: string, warning: boolean, expired: boolean } {
    const now = new Date().getTime();
    const end = new Date(deadline).getTime();
    const timeDiff = end - now;

    if (timeDiff <= 0) {
      return { text: 'Tiempo expirado', expired: true, warning: true };
    }

    if (this.processes.some(p => p.id_activity === activity_id && p.id_user === this.id_user)) {
      return { text: 'Actividad ya respondida', expired: true, warning: true };
    }


    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const warning = timeDiff <= (1000 * 60 * 60 * 24); // Menos de un día
    return { text: `${days} días y ${hours} horas restantes`, expired: false, warning: false };
  }

  getSubjectColor(id: number): string {
    const subject = this.subjects.find(sub => sub.id === id);
    if (!subject) {
      return 'black'; // Color por defecto si no se encuentra el subject
    }

    switch (subject.name) {
      case 'Matemáticas':
        return 'blue';
      case 'Lengua':
        return 'red';
      case 'Historia':
        return 'purple';
      case 'Inglés':
        return 'turquoise';
      case 'Sueño':
        return 'darkred';
      case 'Salud mental':
        return 'cyan';
      case 'Nutrición':
        return 'yellow';
      case 'Ejercicio':
        return 'darkgreen';
      case 'Lectura':
        return 'lightgreen';
      default:
        return 'black'; // Color por defecto
    }
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

  getLetterFromIndex(index: number): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    // Si tienes más de 26 campos, puedes añadir lógica para seguir con AA, AB, etc.
    if (index < 26) {
      return alphabet.charAt(index);  // A, B, C, D, ...
    } else {
      const firstLetter = alphabet.charAt(Math.floor(index / 26) - 1); // Para letras dobles
      const secondLetter = alphabet.charAt(index % 26);
      return firstLetter + secondLetter;
    }
  }
  

  goBack(): void {
    window.history.back(); // Navega a la página anterior
  }
}
