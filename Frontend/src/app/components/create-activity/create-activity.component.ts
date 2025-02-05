import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivityService } from '../../services/activity.service';
import { TypesActivityService } from '../../services/type_activity.service';

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
    degree: 0,
    subject: '',
    available: 0, //inicialmente no disponible al ser creada
    type: 0,
    deadline: ''
  };

  activityTypes: any[] = [];


  constructor(
    private activityService: ActivityService,
    private typesActivityService: TypesActivityService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.typesActivityService.getTypesActivity().subscribe((data) => {
      this.activityTypes = data;
      console.log(this.activityTypes);
    });
  }

  onSubmit(): void {
    if (this.activity.name == '' || this.activity.description == '' || this.activity.degree == 0 || this.activity.subject == '' || !this.activity.deadline || this.activity.type == 0) {
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
}
