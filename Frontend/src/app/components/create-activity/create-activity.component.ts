import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivityService } from '../../services/activity.service';
import { TypesActivityService } from '../../services/type_activity.service';
import { SubjectService } from '../../services/subject.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-activity',
  standalone: false,

  templateUrl: './create-activity.component.html',
  styleUrl: './create-activity.component.css'
})

export class CreateActivityComponent {
  activity = {
    name: '',
    description: '',
    id_subject: 0,
    available: 1, //inicialmente no disponible al ser creada
    type: 0,
    deadline: ''
  };

  activityTypes: any[] = [];
  subjects: any[] = [];
  id_user: number = 0;
  users: any[] = [];

  constructor(
    private activityService: ActivityService,
    private typesActivityService: TypesActivityService,
    private subjectService: SubjectService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {

    this.typesActivityService.getTypesActivity().subscribe((data) => {
      this.activityTypes = data;
    });

    this.subjectService.getSubjects().subscribe((data) => {
      this.subjects = data;
    });

    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });

    const userIdString = localStorage.getItem('user_id');
    if (userIdString) {
      this.id_user = parseInt(userIdString, 10); // Asigna el id del usuario actual
    }
  }

  onSubmit(): void {
    if (this.activity.name == '' || this.activity.description == '' || this.activity.id_subject == 0 || !this.activity.deadline || this.activity.type == 0) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    this.activityService.saveActivity(this.activity).subscribe({
      next: (response) => {
        this.toastr.success('Actividad creada exitosamente', 'Éxito');
        this.router.navigate(['/dashboardProfesor']);
      },
      error: (error) => {
        console.error('Error al crear la actividad', error);
        this.toastr.error('Error al crear la actividad', 'Error');
      }
    });
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
