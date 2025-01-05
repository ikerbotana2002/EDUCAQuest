import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { ActivityService } from '../../services/activity.service';


@Component({
  selector: 'app-dashboard-profesor',
  standalone: false,

  templateUrl: './dashboard-profesor.component.html',
  styleUrl: './dashboard-profesor.component.css'
})
export class DashboardProfesorComponent {

  users: any[] = [];
  activities: any[] = [];

  constructor(private activityService: ActivityService) { }
  /*
    ngOnInit(): void {
      this.userService.getUsers().subscribe((data) => {
        this.users = data;
      });
    }*/
  ngOnInit(): void {
    this.activityService.getActivities().subscribe((data) => {
      this.activities = data;
    });
  }
}  
