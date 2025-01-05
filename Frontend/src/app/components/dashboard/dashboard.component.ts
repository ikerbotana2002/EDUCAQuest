import { Component } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { Router } from '@angular/router';
import { Activity } from '../../interfaces/activity';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Process } from '../../interfaces/process';
import { UserService } from '../../services/user.service';
import { ProcessService } from '../../services/process.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

  users: any[] = [];

  name: string = '';
  description: string = '';

  id_activity: number = 0;
  id_user: number = 0;
  result: string = '';

  constructor(private _activityService: ActivityService, private toastr: ToastrService, private router: Router, private _userService: UserService, private _processService: ProcessService) { }
  ngOnInit(): void { }

  
  saveString(): void {

    const userIdString = localStorage.getItem('user_id');
    if (userIdString) {
      this.id_user = parseInt(userIdString, 10); // Asigna el id del usuario actual
    }

    /*
    const activity: Activity = {
      name: this.name,
      description: this.description
    }*/
    
    const process: Process = {
      id_activity: 4, //para probar
      id_user: this.id_user,
      //id_user: 5,
      result: this.result
    }

    this._userService.getUsers().subscribe((data) => {
      this.users = data;
    });

    /*
    this._activityService.saveActivity(activity).subscribe({
      next: (v) => {
        this.toastr.success(`Actividad ${this.name} completada, esperando corrección...`, '');
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        if (e.error.message) {
          this.toastr.error(e.error.message, '');
        } else {
          this.toastr.error('Error en el servidor', '');
        }
      }
    });*/
    

    this._processService.saveProcess(process).subscribe({
      next: (v) => {
        this.toastr.success(`Actividad completada, esperando corrección...`, '');
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
}
