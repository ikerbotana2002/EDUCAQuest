import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivityService } from '../../../services/activity.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProcessService } from '../../../services/process.service';

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

  activityId: any = {};
  actualRoute: string | null = null;

  processId: any = {};

  selectedOption: string = 'Bien';

  constructor(private activityService: ActivityService, private userService: UserService, private activatedRoute: ActivatedRoute, private processService: ProcessService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.activityService.getActivities().subscribe((data) => {
      this.activities = data;
    });

    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });

    this.processService.getProcesses().subscribe((data) => {
      this.processes = data;
    });



    this.actualRoute = this.activatedRoute.snapshot.url.map(segment => segment.path).join('/');
    this.activityId = this.actualRoute.split('/').pop(); // para obtener el id de la actividad (extraido de la ruta)

  }

  saveChanges(feedback: string, idUser: number, id_activity: number, additionalComment: string): void {
    this.processService.updateFeedback(feedback, idUser, id_activity, additionalComment).subscribe({
      next: (v) => {
        this.toastr.success(`Feedback actualizado`, '');
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
