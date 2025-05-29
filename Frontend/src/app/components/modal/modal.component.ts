import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivityService } from '../../services/activity.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  standalone: false,
  
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  activity = {
    name: '',
    description: '',
    id_subject: 0,
    available: 1, //inicialmente no disponible al ser creada
    type: 0,
    deadline: '',
    photo: '',
    num_fields: 1,
    result: ''
    
  };

  constructor(public matDialogRef: MatDialogRef<ModalComponent>, private activityService: ActivityService, private toastr: ToastrService, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  closeModal() {
    this.matDialogRef.close();
  }

  onSubmit(): void {
 
    this.activity.name = this.data.name;
    this.activity.description = this.data.description;
    this.activity.id_subject = this.data.id_subject;
    this.activity.available = this.data.available;
    this.activity.type = this.data.type;
    this.activity.deadline = this.data.deadline;
    this.activity.photo = this.data.photo;
    this.activity.num_fields = this.data.num_fields;
    this.activity.result = this.data.result; // Inicialmente no hay resultado

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

    this.closeModal();
  }

}
