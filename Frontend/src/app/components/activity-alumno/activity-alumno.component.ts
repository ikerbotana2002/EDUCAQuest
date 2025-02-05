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

  name: string = '';
  description: string = '';

  activityId: any = {};
  actualRoute: string | null = null;

  id_activity: number = 0;
  id_user: number = 0;
  result: string = '';

  constructor(private _activityService: ActivityService, private toastr: ToastrService, private router: Router, private _userService: UserService, private _processService: ProcessService, private activatedRoute: ActivatedRoute) { }
  
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

    this.actualRoute = this.activatedRoute.snapshot.url.map(segment => segment.path).join('/');
    this.activityId = this.actualRoute.split('/').pop(); // para obtener el id de la actividad (extraido de la ruta)

    console.log(this.activities);
  }


  saveString(): void {
    if (!this.result || this.result.trim() === '') {
      this.toastr.error('El resultado no puede estar vacío', 'Error');
      return;
    }

    const process: Process = {
      id_activity: this.activityId,
      id_user: this.id_user,
      result: this.result,
      feedback: '',
      additionalComment: '',
    }

    this._processService.saveProcess(process).subscribe({
      next: (v) => {
        this.toastr.success(`Actividad completada, esperando corrección...`, '');
        this.router.navigate(['/login']);
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

  getTimeRemaining(deadline: string): { text: string, warning: boolean } {
    const now = new Date().getTime();
    const end = new Date(deadline).getTime();
    const timeDiff = end - now;

    if (timeDiff <= 0) {
      return { text: 'Tiempo expirado', warning: true };
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const warning = timeDiff <= (1000 * 60 * 60 * 24); // Menos de un día
    return { text: `${days} días y ${hours} horas restantes`, warning: false };
  }
}
