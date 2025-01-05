import { Component } from '@angular/core';
import { ActivityService } from '../../../services/activity.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
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
  

  constructor(private activityService: ActivityService, private userService: UserService, private activatedRoute: ActivatedRoute, private processService: ProcessService) { }

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
    
}
